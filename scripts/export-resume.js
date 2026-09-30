#!/usr/bin/env node
/*
 * Export résumé projections from the canonical career record.
 *
 *   node scripts/export-resume.js --profile <id> [--profile <id> ...]
 *   node scripts/export-resume.js --all        (default when no --profile)
 *
 * Writes resume/exports/<profile-id>/ resume.json, resume.md, resume.txt,
 * resume.ats.html, resume.html, resume.docx. Exits non-zero when a profile
 * references unknown ids or a required role is missing.
 *
 * When every profile resolves, also writes resume/exports/data/career.json (the
 * full canonical record) and resume/exports/data/resume-profiles.json (every
 * profile definition with its resolved résumé). These must never be copied to
 * dist/ as standalone files: career.json holds private contact details and
 * unverified claims.
 */
const fs = require('fs');
const path = require('path');
const { ROOT, loadCareer, loadProfile, listProfileIds } = require('./load-career');

const EXPORTS_DIR = path.join(ROOT, 'resume', 'exports');
const DATA_DIR = path.join(EXPORTS_DIR, 'data');
const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
const SKILL_GROUPS = [
  { kind: 'focus', label: 'Focus' },
  { kind: 'capability', label: 'Capabilities' },
  { kind: 'practice', label: 'Practices' },
  { kind: 'tool', label: 'Tools' },
];

class ExportError extends Error {}

function parseArgs(argv) {
  const profiles = [];
  let all = false;
  for (let i = 0; i < argv.length; i += 1) {
    const arg = argv[i];
    if (arg === '--all') {
      all = true;
    } else if (arg === '--profile') {
      const value = argv[i + 1];
      if (!value || value.startsWith('--')) throw new ExportError('--profile requires an id');
      profiles.push(value);
      i += 1;
    } else if (arg.startsWith('--profile=')) {
      profiles.push(arg.slice('--profile='.length));
    } else {
      throw new ExportError(`Unknown argument: ${arg}`);
    }
  }
  return all || profiles.length === 0 ? listProfileIds() : profiles;
}

// ---------------------------------------------------------------------------
// Resolution: canonical record + profile -> render model
// ---------------------------------------------------------------------------

function formatMonth(value) {
  const [year, month] = value.split('-');
  return month ? `${MONTHS[Number(month) - 1]} ${year}` : year;
}

function formatDates(role) {
  if (!role.start) return '';
  const end = role.end ? formatMonth(role.end) : role.current || role.end === null ? 'Present' : '';
  return end ? `${formatMonth(role.start)} – ${end}` : formatMonth(role.start);
}

function isEligible(record, profile) {
  if (record.status === 'rejected') return false;
  if (record.confidential) return false;
  return profile.allow_unverified || record.status === 'verified';
}

function emphasisScore(claim, emphasis) {
  return (claim.emphasis || []).filter((tag) => emphasis.includes(tag)).length;
}

function resolveIdentity(identity, profile) {
  const pick = (field, list = []) => {
    const id = profile[field];
    if (!id) return null;
    const entry = list.find((item) => item.id === id);
    if (!entry) throw new ExportError(`Profile "${profile.id}": ${field} "${id}" does not exist in identity`);
    return entry;
  };
  const headline = pick('headline_id', identity.headline_variants);
  const summary = pick('summary_id', identity.summary_variants);
  const email = pick('email_id', identity.emails);
  const phone = pick('phone_id', identity.phones);
  const location = pick('location_id', identity.locations);
  return {
    name: identity.name,
    headline: headline ? { id: headline.id, text: headline.text } : null,
    summary: summary ? { id: summary.id, text: summary.text } : null,
    emails: email ? [{ id: email.id, address: email.address }] : [],
    phones: phone ? [{ id: phone.id, number: phone.number }] : [],
    locations: location ? [{ id: location.id, text: location.text }] : [],
    website: identity.website || null,
    linkedin: identity.linkedin || null,
  };
}

function resolveSkills(skills = [], profile) {
  const priority = profile.skill_priority || [];
  if (priority.length === 0) return skills;
  return priority.map((ref) => {
    const skill = skills.find((s) => s.id === ref || s.name === ref);
    if (!skill) throw new ExportError(`Profile "${profile.id}": skill_priority entry "${ref}" does not exist in skills`);
    return skill;
  });
}

function resolveRoleClaims(role, selection, profile, warnings) {
  const emphasis = profile.emphasis || [];
  const byId = new Map((role.claims || []).map((c) => [c.id, c]));
  let picks;
  if (selection.claims) {
    picks = selection.claims.map((sel) => {
      const claim = byId.get(sel.claim_id);
      if (!claim) throw new ExportError(`Profile "${profile.id}": claim "${sel.claim_id}" does not exist on role "${role.id}"`);
      let variant = null;
      if (sel.variant_id) {
        variant = (claim.variants || []).find((v) => v.id === sel.variant_id);
        if (!variant) throw new ExportError(`Profile "${profile.id}": variant "${sel.variant_id}" does not exist on claim "${claim.id}"`);
      }
      return { claim, variant };
    });
  } else {
    picks = (role.claims || [])
      .map((claim, index) => ({ claim, variant: null, index }))
      .sort((a, b) => emphasisScore(b.claim, emphasis) - emphasisScore(a.claim, emphasis) || a.index - b.index);
  }
  return picks.filter(({ claim }) => {
    if (isEligible(claim, profile)) return true;
    if (selection.claims) warnings.push(`claim "${claim.id}" excluded (status ${claim.status})`);
    return false;
  });
}

function resolveResume(career, profile) {
  const warnings = [];
  const rolesById = new Map(career.experience.map((r) => [r.id, r]));
  const selections = profile.roles || career.experience.map((r) => ({ role_id: r.id }));
  const selectedRoleIds = new Set(selections.map((s) => s.role_id));

  for (const id of profile.required_role_ids || []) {
    if (!rolesById.has(id)) throw new ExportError(`Profile "${profile.id}": required role "${id}" is missing from the canonical record`);
    if (!selectedRoleIds.has(id)) throw new ExportError(`Profile "${profile.id}": required role "${id}" is missing from profile roles[]`);
  }

  let remaining = Number.isInteger(profile.length_budget) ? profile.length_budget : Infinity;
  let truncated = 0;
  let excludedByStatus = 0;

  const experience = selections.map((selection) => {
    const role = rolesById.get(selection.role_id);
    if (!role) throw new ExportError(`Profile "${profile.id}": role "${selection.role_id}" does not exist in the canonical record`);

    let title = role.title;
    if (selection.title_variant_id) {
      const tv = (role.title_variants || []).find((v) => v.id === selection.title_variant_id);
      if (!tv) throw new ExportError(`Profile "${profile.id}": title variant "${selection.title_variant_id}" does not exist on role "${role.id}"`);
      title = tv.title;
    }

    const eligible = resolveRoleClaims(role, selection, profile, warnings);
    excludedByStatus += (selection.claims ? selection.claims.length : (role.claims || []).length) - eligible.length;
    const kept = eligible.slice(0, Math.max(0, remaining));
    truncated += eligible.length - kept.length;
    remaining -= kept.length;

    let summary = null;
    if (selection.summary_level) {
      const claim = role.summaries && role.summaries[selection.summary_level];
      if (claim && isEligible(claim, profile)) summary = { claim_id: claim.id, text: claim.text, status: claim.status };
    }

    return {
      role_id: role.id,
      company: role.company,
      title,
      title_variant_id: selection.title_variant_id || null,
      location: role.location || null,
      start: role.start || null,
      end: role.end === undefined ? null : role.end,
      current: Boolean(role.current),
      dates: formatDates(role),
      summary,
      bullets: kept.map(({ claim, variant }) => ({
        claim_id: claim.id,
        variant_id: variant ? variant.id : null,
        text: variant ? variant.text : claim.text,
        status: claim.status,
        ...(claim.metric ? { metric: claim.metric } : {}),
      })),
    };
  });

  if (truncated > 0) warnings.push(`${truncated} eligible claim(s) dropped by length_budget ${profile.length_budget}`);

  const education = (career.education || [])
    .filter((item) => isEligible(item, profile))
    .map((item) => ({
      id: item.id || null,
      institution: item.institution,
      credential: item.credential || null,
      location: item.location || null,
      year: item.year || null,
      honors: item.honors || [],
      status: item.status || null,
    }));

  const orderedSkills = resolveSkills(career.skills, profile);
  const skills = SKILL_GROUPS.map(({ kind, label }) => ({
    kind,
    label,
    items: orderedSkills.filter((s) => s.kind === kind).map((s) => s.name),
  })).filter((group) => group.items.length > 0);

  const bullets = experience.reduce((n, r) => n + r.bullets.length, 0);
  return {
    model: {
      profile: {
        id: profile.id,
        label: profile.label,
        reader: profile.reader,
        allow_unverified: profile.allow_unverified,
        length_budget: profile.length_budget ?? null,
      },
      identity: resolveIdentity(career.identity, profile),
      experience,
      education,
      skills,
      stats: {
        roles: experience.length,
        bullets,
        unverified_bullets: experience.reduce((n, r) => n + r.bullets.filter((b) => b.status !== 'verified').length, 0),
        excluded_by_status: excludedByStatus,
        truncated_by_budget: truncated,
      },
    },
    warnings,
  };
}

// ---------------------------------------------------------------------------
// Renderers
// ---------------------------------------------------------------------------

function contactItems(identity) {
  return [
    ...identity.emails.map((e) => e.address),
    ...identity.phones.map((p) => p.number),
    ...identity.locations.map((l) => l.text),
    identity.website,
    identity.linkedin,
  ].filter(Boolean);
}

function educationLine(item) {
  const head = [item.credential, item.institution].filter(Boolean).join(', ');
  const tail = [item.location, item.year].filter(Boolean).join(' · ');
  const honors = item.honors.length ? ` (${item.honors.join(', ')})` : '';
  return `${head}${honors}${tail ? ` — ${tail}` : ''}`;
}

function roleMeta(role) {
  return [role.dates, role.location].filter(Boolean).join(' · ');
}

function renderMarkdown(m) {
  const out = [`# ${m.identity.name}`];
  if (m.identity.headline) out.push('', `**${m.identity.headline.text}**`);
  const contact = contactItems(m.identity);
  if (contact.length) out.push('', contact.join(' · '));
  if (m.identity.summary) out.push('', '## Summary', '', m.identity.summary.text);
  out.push('', '## Experience');
  for (const role of m.experience) {
    out.push('', `### ${role.title} — ${role.company}`);
    const meta = roleMeta(role);
    if (meta) out.push('', `*${meta}*`);
    if (role.summary) out.push('', role.summary.text);
    if (role.bullets.length) out.push('', ...role.bullets.map((b) => `- ${b.text}`));
  }
  if (m.education.length) out.push('', '## Education', '', ...m.education.map((e) => `- ${educationLine(e)}`));
  if (m.skills.length) out.push('', '## Skills', '', ...m.skills.map((g) => `- **${g.label}:** ${g.items.join(', ')}`));
  return `${out.join('\n')}\n`;
}

function renderText(m) {
  const out = [m.identity.name.toUpperCase()];
  if (m.identity.headline) out.push(m.identity.headline.text);
  const contact = contactItems(m.identity);
  if (contact.length) out.push(contact.join(' | '));
  if (m.identity.summary) out.push('', 'SUMMARY', m.identity.summary.text);
  out.push('', 'EXPERIENCE');
  for (const role of m.experience) {
    out.push('', `${role.title}, ${role.company}`);
    const meta = roleMeta(role);
    if (meta) out.push(meta);
    if (role.summary) out.push(role.summary.text);
    out.push(...role.bullets.map((b) => `- ${b.text}`));
  }
  if (m.education.length) out.push('', 'EDUCATION', ...m.education.map(educationLine));
  if (m.skills.length) out.push('', 'SKILLS', ...m.skills.map((g) => `${g.label}: ${g.items.join(', ')}`));
  return `${out.join('\n')}\n`;
}

function escapeHtml(value) {
  return String(value).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

function htmlDocument(title, css, body) {
  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${escapeHtml(title)}</title>
<style>${css}</style>
</head>
<body>
${body}
</body>
</html>
`;
}

// ATS: single column, only Contact/Summary/Experience/Education/Skills headings, no tables or images.
function renderAtsHtml(m) {
  const e = escapeHtml;
  const parts = [`<p><strong>${e(m.identity.name)}</strong></p>`];
  if (m.identity.headline) parts.push(`<p>${e(m.identity.headline.text)}</p>`);
  const contact = contactItems(m.identity);
  if (contact.length) parts.push('<h2>Contact</h2>', ...contact.map((c) => `<p>${e(c)}</p>`));
  if (m.identity.summary) parts.push('<h2>Summary</h2>', `<p>${e(m.identity.summary.text)}</p>`);
  parts.push('<h2>Experience</h2>');
  for (const role of m.experience) {
    const meta = roleMeta(role);
    parts.push(`<p><strong>${e(role.title)}</strong>, ${e(role.company)}${meta ? `<br>${e(meta)}` : ''}</p>`);
    if (role.summary) parts.push(`<p>${e(role.summary.text)}</p>`);
    if (role.bullets.length) parts.push('<ul>', ...role.bullets.map((b) => `<li>${e(b.text)}</li>`), '</ul>');
  }
  if (m.education.length) parts.push('<h2>Education</h2>', ...m.education.map((item) => `<p>${e(educationLine(item))}</p>`));
  if (m.skills.length) parts.push('<h2>Skills</h2>', ...m.skills.map((g) => `<p>${e(g.label)}: ${e(g.items.join(', '))}</p>`));
  const css = 'body{font-family:Arial,Helvetica,sans-serif;font-size:11pt;line-height:1.4;max-width:7.5in;margin:0.5in auto;color:#000}h2{font-size:12pt;margin:1.2em 0 0.4em}p,ul{margin:0 0 0.6em}';
  return htmlDocument(`${m.identity.name} — Résumé`, css, parts.join('\n'));
}

function renderHtml(m) {
  const e = escapeHtml;
  const id = m.identity;
  const contactLinks = [
    ...id.emails.map((x) => `<a href="mailto:${e(x.address)}">${e(x.address)}</a>`),
    ...id.phones.map((x) => `<a href="tel:${e(x.number.replace(/[^0-9+]/g, ''))}">${e(x.number)}</a>`),
    ...id.locations.map((x) => `<span>${e(x.text)}</span>`),
    id.website ? `<a href="https://${e(id.website.replace(/^https?:\/\//, ''))}">${e(id.website)}</a>` : '',
    id.linkedin ? `<a href="${e(id.linkedin)}">LinkedIn</a>` : '',
  ].filter(Boolean);
  const parts = ['<header>', `<h1>${e(id.name)}</h1>`];
  if (id.headline) parts.push(`<p class="headline">${e(id.headline.text)}</p>`);
  if (contactLinks.length) parts.push(`<p class="contact">${contactLinks.join('<span aria-hidden="true"> · </span>')}</p>`);
  parts.push('</header>', '<main>');
  if (id.summary) parts.push('<section><h2>Summary</h2>', `<p>${e(id.summary.text)}</p>`, '</section>');
  parts.push('<section><h2>Experience</h2>');
  for (const role of m.experience) {
    const meta = roleMeta(role);
    parts.push('<article>', `<h3>${e(role.title)} <span class="company">/ ${e(role.company)}</span></h3>`);
    if (meta) parts.push(`<p class="meta">${e(meta)}</p>`);
    if (role.summary) parts.push(`<p>${e(role.summary.text)}</p>`);
    if (role.bullets.length) parts.push('<ul>', ...role.bullets.map((b) => `<li>${e(b.text)}</li>`), '</ul>');
    parts.push('</article>');
  }
  parts.push('</section>');
  if (m.education.length) parts.push('<section><h2>Education</h2>', ...m.education.map((item) => `<p>${e(educationLine(item))}</p>`), '</section>');
  if (m.skills.length) {
    parts.push('<section><h2>Skills</h2>', '<dl>');
    for (const g of m.skills) parts.push(`<dt>${e(g.label)}</dt><dd>${e(g.items.join(', '))}</dd>`);
    parts.push('</dl>', '</section>');
  }
  parts.push('</main>');
  const css = [
    'body{font-family:-apple-system,BlinkMacSystemFont,"Segoe UI",Helvetica,Arial,sans-serif;color:#1d1d1f;line-height:1.5;max-width:760px;margin:48px auto;padding:0 24px}',
    'h1{font-size:2rem;margin:0}h2{font-size:.8rem;letter-spacing:.08em;text-transform:uppercase;color:#6e6e73;margin:2rem 0 .75rem;border-bottom:1px solid #e5e5ea;padding-bottom:.25rem}',
    'h3{font-size:1.05rem;margin:1.25rem 0 .1rem}.company{font-weight:400;color:#6e6e73}.headline{margin:.25rem 0 .5rem;font-size:1.1rem}',
    '.contact,.meta{color:#6e6e73;font-size:.9rem;margin:0 0 .5rem}.contact a{color:inherit}ul{padding-left:1.2rem;margin:.25rem 0}li{margin:.2rem 0}',
    'dl{display:grid;grid-template-columns:max-content 1fr;gap:.25rem 1rem;margin:0}dt{font-weight:600}dd{margin:0}',
    '@media print{body{margin:0;max-width:none}a{text-decoration:none}}',
  ].join('');
  return htmlDocument(`${id.name} — Résumé`, css, parts.join('\n'));
}

// ---------------------------------------------------------------------------
// DOCX: minimal OOXML package, stored (uncompressed) zip, no dependencies
// ---------------------------------------------------------------------------

const CRC_TABLE = (() => {
  const table = new Uint32Array(256);
  for (let n = 0; n < 256; n += 1) {
    let c = n;
    for (let k = 0; k < 8; k += 1) c = c & 1 ? 0xedb88320 ^ (c >>> 1) : c >>> 1;
    table[n] = c >>> 0;
  }
  return table;
})();

function crc32(buf) {
  let c = 0xffffffff;
  for (const byte of buf) c = CRC_TABLE[(c ^ byte) & 0xff] ^ (c >>> 8);
  return (c ^ 0xffffffff) >>> 0;
}

function zipStore(files) {
  const DOS_DATE_1980_01_01 = 0x21;
  const chunks = [];
  const central = [];
  let offset = 0;
  for (const file of files) {
    const name = Buffer.from(file.name, 'utf8');
    const data = Buffer.isBuffer(file.data) ? file.data : Buffer.from(file.data, 'utf8');
    const crc = crc32(data);

    const local = Buffer.alloc(30);
    local.writeUInt32LE(0x04034b50, 0);
    local.writeUInt16LE(20, 4);
    local.writeUInt16LE(0x0800, 6);
    local.writeUInt16LE(0, 8);
    local.writeUInt16LE(0, 10);
    local.writeUInt16LE(DOS_DATE_1980_01_01, 12);
    local.writeUInt32LE(crc, 14);
    local.writeUInt32LE(data.length, 18);
    local.writeUInt32LE(data.length, 22);
    local.writeUInt16LE(name.length, 26);
    local.writeUInt16LE(0, 28);
    chunks.push(local, name, data);

    const entry = Buffer.alloc(46);
    entry.writeUInt32LE(0x02014b50, 0);
    entry.writeUInt16LE(20, 4);
    entry.writeUInt16LE(20, 6);
    entry.writeUInt16LE(0x0800, 8);
    entry.writeUInt16LE(0, 10);
    entry.writeUInt16LE(0, 12);
    entry.writeUInt16LE(DOS_DATE_1980_01_01, 14);
    entry.writeUInt32LE(crc, 16);
    entry.writeUInt32LE(data.length, 20);
    entry.writeUInt32LE(data.length, 24);
    entry.writeUInt16LE(name.length, 28);
    entry.writeUInt32LE(offset, 42);
    central.push(entry, name);

    offset += local.length + name.length + data.length;
  }
  const centralBuf = Buffer.concat(central);
  const end = Buffer.alloc(22);
  end.writeUInt32LE(0x06054b50, 0);
  end.writeUInt16LE(files.length, 8);
  end.writeUInt16LE(files.length, 10);
  end.writeUInt32LE(centralBuf.length, 12);
  end.writeUInt32LE(offset, 16);
  return Buffer.concat([...chunks, centralBuf, end]);
}

function escapeXml(value) {
  return String(value).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

function wPara(runs, style) {
  const list = Array.isArray(runs) ? runs : [{ text: runs }];
  const pPr = style ? `<w:pPr><w:pStyle w:val="${style}"/></w:pPr>` : '';
  const body = list
    .map((r) => {
      const rPr = r.bold || r.italic ? `<w:rPr>${r.bold ? '<w:b/>' : ''}${r.italic ? '<w:i/>' : ''}</w:rPr>` : '';
      return `<w:r>${rPr}<w:t xml:space="preserve">${escapeXml(r.text)}</w:t></w:r>`;
    })
    .join('');
  return `<w:p>${pPr}${body}</w:p>`;
}

function renderDocx(m) {
  const ps = [wPara(m.identity.name, 'Title')];
  if (m.identity.headline) ps.push(wPara(m.identity.headline.text, 'Subtitle'));
  const contact = contactItems(m.identity);
  if (contact.length) ps.push(wPara(contact.join(' | ')));
  if (m.identity.summary) ps.push(wPara('Summary', 'Heading1'), wPara(m.identity.summary.text));
  ps.push(wPara('Experience', 'Heading1'));
  for (const role of m.experience) {
    ps.push(wPara([{ text: role.title, bold: true }, { text: `, ${role.company}` }], 'RoleHeading'));
    const meta = roleMeta(role);
    if (meta) ps.push(wPara([{ text: meta, italic: true }]));
    if (role.summary) ps.push(wPara(role.summary.text));
    for (const b of role.bullets) ps.push(wPara(`• ${b.text}`, 'Bullet'));
  }
  if (m.education.length) ps.push(wPara('Education', 'Heading1'), ...m.education.map((e) => wPara(educationLine(e))));
  if (m.skills.length) {
    ps.push(wPara('Skills', 'Heading1'));
    for (const g of m.skills) ps.push(wPara([{ text: `${g.label}: `, bold: true }, { text: g.items.join(', ') }]));
  }

  const W = 'xmlns:w="http://schemas.openxmlformats.org/wordprocessingml/2006/main"';
  const XML = '<?xml version="1.0" encoding="UTF-8" standalone="yes"?>';
  const document = `${XML}<w:document ${W}><w:body>${ps.join('')}<w:sectPr><w:pgSz w:w="12240" w:h="15840"/><w:pgMar w:top="1080" w:right="1080" w:bottom="1080" w:left="1080" w:header="720" w:footer="720" w:gutter="0"/></w:sectPr></w:body></w:document>`;
  const style = (id, name, pPr, rPr, extra = '') =>
    `<w:style w:type="paragraph" w:styleId="${id}"${id === 'Normal' ? ' w:default="1"' : ''}><w:name w:val="${name}"/>${id === 'Normal' ? '' : '<w:basedOn w:val="Normal"/>'}${extra}<w:pPr>${pPr}</w:pPr><w:rPr>${rPr}</w:rPr></w:style>`;
  const styles = `${XML}<w:styles ${W}>
<w:docDefaults><w:rPrDefault><w:rPr><w:rFonts w:ascii="Calibri" w:hAnsi="Calibri" w:cs="Calibri"/><w:sz w:val="21"/></w:rPr></w:rPrDefault><w:pPrDefault><w:pPr><w:spacing w:after="80"/></w:pPr></w:pPrDefault></w:docDefaults>
${style('Normal', 'Normal', '', '')}
${style('Title', 'Title', '<w:spacing w:after="40"/>', '<w:b/><w:sz w:val="36"/>')}
${style('Subtitle', 'Subtitle', '<w:spacing w:after="80"/>', '<w:sz w:val="24"/>')}
${style('Heading1', 'heading 1', '<w:keepNext/><w:spacing w:before="240" w:after="80"/><w:outlineLvl w:val="0"/>', '<w:b/><w:caps/><w:sz w:val="22"/>', '<w:next w:val="Normal"/>')}
${style('RoleHeading', 'Role Heading', '<w:keepNext/><w:spacing w:before="160" w:after="20"/>', '')}
${style('Bullet', 'Bullet', '<w:ind w:left="360" w:hanging="200"/><w:spacing w:after="40"/>', '')}
</w:styles>`;
  const contentTypes = `${XML}<Types xmlns="http://schemas.openxmlformats.org/package/2006/content-types"><Default Extension="rels" ContentType="application/vnd.openxmlformats-package.relationships+xml"/><Default Extension="xml" ContentType="application/xml"/><Override PartName="/word/document.xml" ContentType="application/vnd.openxmlformats-officedocument.wordprocessingml.document.main+xml"/><Override PartName="/word/styles.xml" ContentType="application/vnd.openxmlformats-officedocument.wordprocessingml.styles+xml"/></Types>`;
  const rels = `${XML}<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships"><Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/officeDocument" Target="word/document.xml"/></Relationships>`;
  const docRels = `${XML}<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships"><Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/styles" Target="styles.xml"/></Relationships>`;

  return zipStore([
    { name: '[Content_Types].xml', data: contentTypes },
    { name: '_rels/.rels', data: rels },
    { name: 'word/document.xml', data: document },
    { name: 'word/_rels/document.xml.rels', data: docRels },
    { name: 'word/styles.xml', data: styles },
  ]);
}

// ---------------------------------------------------------------------------

function exportProfile(career, profileId) {
  const profile = loadProfile(profileId);
  for (const key of ['id', 'label', 'reader', 'allow_unverified']) {
    if (profile[key] === undefined) throw new ExportError(`Profile "${profileId}" is missing required key "${key}"`);
  }
  if (profile.id !== profileId) throw new ExportError(`Profile file "${profileId}.yml" declares id "${profile.id}"`);

  const { model, warnings } = resolveResume(career, profile);
  const outDir = path.join(EXPORTS_DIR, profile.id);
  fs.mkdirSync(outDir, { recursive: true });
  const outputs = {
    'resume.json': `${JSON.stringify(model, null, 2)}\n`,
    'resume.md': renderMarkdown(model),
    'resume.txt': renderText(model),
    'resume.ats.html': renderAtsHtml(model),
    'resume.html': renderHtml(model),
    'resume.docx': renderDocx(model),
  };
  for (const [name, data] of Object.entries(outputs)) fs.writeFileSync(path.join(outDir, name), data);
  return { model, warnings, outDir };
}

function writeCareerData(career) {
  const profiles = listProfileIds().map((id) => {
    const definition = loadProfile(id);
    return { id, definition, resume: resolveResume(career, definition).model };
  });
  fs.mkdirSync(DATA_DIR, { recursive: true });
  const careerFile = path.join(DATA_DIR, 'career.json');
  const profilesFile = path.join(DATA_DIR, 'resume-profiles.json');
  fs.writeFileSync(careerFile, `${JSON.stringify(career, null, 2)}\n`);
  fs.writeFileSync(profilesFile, `${JSON.stringify({ profiles }, null, 2)}\n`);
  return [careerFile, profilesFile];
}

function main() {
  let profileIds;
  let career;
  try {
    profileIds = parseArgs(process.argv.slice(2));
    career = loadCareer();
  } catch (err) {
    console.error(`export-resume: ${err.message}`);
    process.exit(1);
  }

  let failed = false;
  for (const id of profileIds) {
    try {
      const { model, warnings, outDir } = exportProfile(career, id);
      const s = model.stats;
      console.log(`✓ ${id}: ${s.roles} roles, ${s.bullets} bullets (${s.unverified_bullets} unverified) -> ${path.relative(ROOT, outDir)}/`);
      for (const w of warnings) console.warn(`  ! ${w}`);
    } catch (err) {
      failed = true;
      console.error(`✗ ${id}: ${err.message}`);
    }
  }
  if (!failed) {
    try {
      for (const file of writeCareerData(career)) console.log(`✓ career data -> ${path.relative(ROOT, file)}`);
    } catch (err) {
      failed = true;
      console.error(`✗ career data: ${err.message}`);
    }
  }
  process.exit(failed ? 1 : 0);
}

module.exports = { resolveResume, writeCareerData, ExportError };

if (require.main === module) main();
