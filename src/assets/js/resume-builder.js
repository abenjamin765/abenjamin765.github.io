/*
 * Local résumé builder. `npm run resume:builder` writes it to
 * resume/exports/builder/index.html; it is not part of the public site build.
 *
 * Reads the career record and profiles that the builder task embeds in the page as
 * script type="application/json" blocks, lets the user select and reword
 * existing claims, and renders the same model and formats as
 * scripts/export-resume.js. Nothing is fetched or sent over the network and
 * nothing is written back to the career record.
 */
(function () {
  "use strict";

  const DATA_ELEMENTS = {
    career: "rb-career-data",
    profiles: "rb-profiles-data",
  };
  const PUBLIC_PROFILE_ID = "public-portfolio";
  const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  const SKILL_GROUPS = [
    { kind: "focus", label: "Focus" },
    { kind: "capability", label: "Capabilities" },
    { kind: "practice", label: "Practices" },
    { kind: "tool", label: "Tools" },
  ];
  const SUMMARY_LEVELS = [
    { id: "one_line", label: "One-line summary" },
    { id: "short", label: "Short summary" },
    { id: "long", label: "Long summary" },
  ];
  const FORMATS = {
    md: { ext: "md", type: "text/markdown;charset=utf-8", render: renderMarkdown },
    txt: { ext: "txt", type: "text/plain;charset=utf-8", render: renderText },
    ats: { ext: "ats.html", type: "text/html;charset=utf-8", render: renderAtsHtml },
    json: { ext: "json", type: "application/json;charset=utf-8", render: (m) => `${JSON.stringify(m, null, 2)}\n` },
  };
  const STOPWORDS = new Set(
    "about above across after also among and any are around been being both but can could did does doing done each either every from have having into its itself just more most much must need needs other our ours over own same should such than that the their theirs them then there these they this those through under until upon very was were what when where which while who whom why will with within without would you your yours team teams work working role roles experience years strong ability using used".split(" ")
  );

  const $ = (selector) => document.querySelector(selector);
  const els = {
    error: $("[data-rb-error]"),
    errorBody: $("[data-rb-error-body]"),
    loading: $("[data-rb-loading]"),
    app: $("[data-rb-app]"),
    profile: $("#rb-profile"),
    profileMeta: $("#rb-profile-meta"),
    jd: $("#rb-jd"),
    match: $("[data-rb-match]"),
    clearMatch: $("[data-rb-clear-match]"),
    matchStatus: $("[data-rb-match-status]"),
    emphasis: $("[data-rb-emphasis]"),
    budget: $("#rb-budget"),
    unverified: $("#rb-unverified"),
    confidential: $("[data-rb-confidential]"),
    roles: $("[data-rb-roles]"),
    format: $("#rb-format"),
    status: $("[data-rb-status]"),
    warnings: $("[data-rb-warnings]"),
    preview: $("[data-rb-preview]"),
    source: $("[data-rb-source]"),
    download: $("[data-rb-download]"),
  };

  const state = {
    career: null,
    profiles: [],
    rolesById: new Map(),
    claimsByKey: new Map(),
    profileId: null,
    roles: [],
    emphasis: new Set(),
    budget: null,
    includeUnverified: false,
    format: "md",
    view: "doc",
    edits: new Map(),
    match: null,
    notes: [],
    output: "",
  };

  // -------------------------------------------------------------------------
  // Loading
  // -------------------------------------------------------------------------

  function readEmbeddedJson(id) {
    const node = document.getElementById(id);
    if (!node) {
      throw new Error(`The page has no #${id} data block. Run npm run resume:builder and open resume/exports/builder/index.html so the career data is embedded.`);
    }
    try {
      return JSON.parse(node.textContent);
    } catch (_err) {
      throw new Error(`The #${id} data block is not valid JSON.`);
    }
  }

  // Accepts { profiles: [{ id, definition, resume }] } as written by export-resume.js,
  // plus a bare array or id-keyed map of profile documents.
  function normalizeProfiles(raw) {
    if (Array.isArray(raw)) {
      return raw
        .map((p) => (p && p.definition && typeof p.definition === "object" ? { id: p.id, ...p.definition } : p))
        .filter((p) => p && typeof p.id === "string" && typeof p.label === "string");
    }
    if (raw && typeof raw === "object") {
      if (raw.profiles) return normalizeProfiles(raw.profiles);
      return normalizeProfiles(Object.entries(raw).map(([id, p]) => (p && typeof p === "object" ? { id, ...p } : null)));
    }
    return [];
  }

  function showError(message) {
    els.loading.hidden = true;
    els.app.hidden = true;
    els.errorBody.textContent = message;
    els.error.hidden = false;
  }

  function load() {
    let career;
    let profiles;
    try {
      career = readEmbeddedJson(DATA_ELEMENTS.career);
      profiles = readEmbeddedJson(DATA_ELEMENTS.profiles);
    } catch (err) {
      showError(err.message);
      return;
    }
    if (!career || !career.identity || typeof career.identity.name !== "string" || !Array.isArray(career.experience)) {
      showError("The embedded career record does not match resume/schema/career.schema.json (identity.name and experience[] are required).");
      return;
    }
    const list = normalizeProfiles(profiles);
    if (list.length === 0) {
      showError("The embedded profiles contain no profiles with an id and label.");
      return;
    }

    state.career = career;
    state.profiles = list;
    for (const role of career.experience) {
      state.rolesById.set(role.id, role);
      for (const claim of role.claims || []) state.claimsByKey.set(claimKey(role.id, claim.id), claim);
    }

    els.profile.replaceChildren(...list.map((p) => h("option", { value: p.id }, p.label)));
    const initial = list.find((p) => p.id === "default-full") || list[0];
    els.profile.value = initial.id;
    selectProfile(initial.id);

    bindEvents();
    els.loading.hidden = true;
    els.app.hidden = false;
  }

  // -------------------------------------------------------------------------
  // Rules
  // -------------------------------------------------------------------------

  const claimKey = (roleId, claimId) => `${roleId}::${claimId}`;
  const currentProfile = () => state.profiles.find((p) => p.id === state.profileId);

  function rules() {
    const profile = currentProfile();
    const reader = profile.reader === "ats" || state.format === "ats" ? "ats" : "human";
    return {
      reader,
      allowConfidential: profile.id !== PUBLIC_PROFILE_ID && reader !== "ats",
      allowUnverified: state.includeUnverified,
    };
  }

  function isOffered(record, r) {
    if (!record || record.status === "rejected") return false;
    return !record.confidential || r.allowConfidential;
  }

  function isEligible(record, r) {
    return isOffered(record, r) && (r.allowUnverified || record.status === "verified");
  }

  function passesEmphasis(claim) {
    if (state.emphasis.size === 0) return true;
    return (claim.emphasis || []).some((tag) => state.emphasis.has(tag));
  }

  function emphasisScore(claim, emphasis) {
    return (claim.emphasis || []).filter((tag) => emphasis.includes(tag)).length;
  }

  function findVariant(claim, variantId) {
    return variantId ? (claim.variants || []).find((v) => v.id === variantId) || null : null;
  }

  function baseText(claim, variantId) {
    const variant = findVariant(claim, variantId);
    return variant ? variant.text : claim.text;
  }

  // -------------------------------------------------------------------------
  // Selection state from a profile
  // -------------------------------------------------------------------------

  function selectProfile(id) {
    state.profileId = id;
    const profile = currentProfile();
    state.notes = [];
    state.match = null;
    state.emphasis = new Set();
    state.budget = Number.isInteger(profile.length_budget) ? profile.length_budget : null;
    state.includeUnverified = profile.allow_unverified === true;
    state.roles = buildRoles(profile);

    els.budget.value = state.budget ?? "";
    els.unverified.checked = state.includeUnverified;
    els.matchStatus.textContent = "";
    els.profileMeta.textContent = [
      `Reader: ${profile.reader || "human"}`,
      profile.target_role ? `Target: ${profile.target_role}` : null,
      profile.allow_unverified ? "Allows unverified claims" : "Verified claims only",
    ]
      .filter(Boolean)
      .join(" · ");
    renderAll();
  }

  function buildRoles(profile) {
    const emphasis = profile.emphasis || [];
    const required = new Set(profile.required_role_ids || []);
    const selections = Array.isArray(profile.roles)
      ? profile.roles
      : state.career.experience.map((role) => ({ role_id: role.id }));
    const seen = new Set();
    const out = [];
    for (const selection of selections) {
      const role = state.rolesById.get(selection.role_id);
      if (!role) {
        state.notes.push(`Profile role "${selection.role_id}" is not in the career record, so it is skipped.`);
        continue;
      }
      seen.add(role.id);
      out.push(roleEntry(role, selection, true, emphasis, required.has(role.id)));
    }
    for (const role of state.career.experience) {
      if (!seen.has(role.id)) out.push(roleEntry(role, { role_id: role.id }, false, emphasis, required.has(role.id)));
    }
    return out;
  }

  function roleEntry(role, selection, selected, emphasis, required) {
    const offered = (role.claims || []).filter((claim) => claim && claim.status !== "rejected");
    let claims;
    if (Array.isArray(selection.claims)) {
      const byId = new Map(offered.map((c) => [c.id, c]));
      const picked = [];
      for (const pick of selection.claims) {
        const claim = byId.get(pick.claim_id);
        if (!claim) {
          const known = (role.claims || []).some((c) => c.id === pick.claim_id);
          state.notes.push(
            known
              ? `Claim "${pick.claim_id}" is rejected and is not offered.`
              : `Profile claim "${pick.claim_id}" is not on role "${role.id}", so it is skipped.`
          );
          continue;
        }
        picked.push({ claim_id: claim.id, selected: true, variant_id: findVariant(claim, pick.variant_id) ? pick.variant_id : null });
      }
      const pickedIds = new Set(picked.map((p) => p.claim_id));
      claims = picked.concat(
        offered.filter((c) => !pickedIds.has(c.id)).map((c) => ({ claim_id: c.id, selected: false, variant_id: null }))
      );
    } else {
      claims = offered
        .map((claim, index) => ({ claim, index }))
        .sort((a, b) => emphasisScore(b.claim, emphasis) - emphasisScore(a.claim, emphasis) || a.index - b.index)
        .map(({ claim }) => ({ claim_id: claim.id, selected: true, variant_id: null }));
    }
    const titleVariant = (role.title_variants || []).find((v) => v.id === selection.title_variant_id);
    const summaryLevel = SUMMARY_LEVELS.some((l) => l.id === selection.summary_level) ? selection.summary_level : null;
    return {
      role_id: role.id,
      selected,
      required,
      title_variant_id: titleVariant ? titleVariant.id : null,
      summary_level: summaryLevel,
      claims,
    };
  }

  // -------------------------------------------------------------------------
  // Job-description match (local only)
  // -------------------------------------------------------------------------

  function normalizeText(value) {
    return String(value)
      .toLowerCase()
      .normalize("NFKD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/[^a-z0-9+#]+/g, " ")
      .trim();
  }

  function stem(word) {
    return word.length > 4 ? word.replace(/(ing|ed|es|s)$/, "") : word;
  }

  function contentWords(text) {
    return normalizeText(text)
      .split(" ")
      .filter((w) => w.length >= 4 && !STOPWORDS.has(w));
  }

  // Words in more than this share of claims (e.g. "design") say nothing about fit.
  const COMMON_WORD_SHARE = 0.25;

  function commonStems(claims) {
    const counts = new Map();
    for (const claim of claims) {
      for (const s of new Set(contentWords(claim.text).map(stem))) counts.set(s, (counts.get(s) || 0) + 1);
    }
    const limit = Math.max(2, claims.length * COMMON_WORD_SHARE);
    return new Set([...counts].filter(([, n]) => n > limit).map(([s]) => s));
  }

  function scoreClaim(claim, jdPadded, jdStems) {
    const terms = [];
    let score = 0;
    const phrases = [...(claim.skills || []), ...(claim.keywords || [])];
    for (const phrase of phrases) {
      const norm = normalizeText(phrase);
      if (norm && jdPadded.includes(` ${norm} `) && !terms.includes(phrase)) {
        terms.push(phrase);
        score += 3;
      }
    }
    const seen = new Set();
    for (const word of contentWords(claim.text)) {
      const s = stem(word);
      if (seen.has(s)) continue;
      seen.add(s);
      if (jdStems.has(s)) {
        score += 1;
        if (terms.length < 8) terms.push(word);
      }
    }
    return { score, terms };
  }

  function applyMatch() {
    const text = els.jd.value.trim();
    if (!text) {
      els.matchStatus.textContent = "Paste a job description first.";
      els.jd.focus();
      return;
    }
    const jdPadded = ` ${normalizeText(text)} `;
    const r = rules();
    const common = commonStems([...state.claimsByKey.values()].filter((c) => isOffered(c, r)));
    const jdStems = new Set(contentWords(text).map(stem).filter((s) => !common.has(s)));
    const match = new Map();
    let matched = 0;
    let offered = 0;
    for (const entry of state.roles) {
      for (const ce of entry.claims) {
        const claim = state.claimsByKey.get(claimKey(entry.role_id, ce.claim_id));
        const result = scoreClaim(claim, jdPadded, jdStems);
        match.set(claimKey(entry.role_id, ce.claim_id), result);
        if (!isOffered(claim, r)) continue;
        offered += 1;
        ce.selected = result.score > 0;
        if (ce.selected) matched += 1;
      }
      entry.claims = entry.claims
        .map((ce, index) => ({ ce, index, score: match.get(claimKey(entry.role_id, ce.claim_id)).score }))
        .sort((a, b) => b.score - a.score || a.index - b.index)
        .map(({ ce }) => ce);
    }
    state.match = match;
    els.matchStatus.textContent =
      matched === 0
        ? "No claims matched. The selection was cleared; use Reset to profile to restore it."
        : `Selected ${matched} of ${offered} offered claims that share terms with the job description, strongest first within each role.`;
    renderAll();
  }

  function resetToProfile() {
    selectProfile(state.profileId);
    els.matchStatus.textContent = "Selection reset to the profile.";
  }

  // -------------------------------------------------------------------------
  // Model: mirrors resolveResume() in scripts/export-resume.js
  // -------------------------------------------------------------------------

  function formatMonth(value) {
    const [year, month] = value.split("-");
    return month ? `${MONTHS[Number(month) - 1]} ${year}` : year;
  }

  function formatDates(role) {
    if (!role.start) return "";
    const end = role.end ? formatMonth(role.end) : role.current || role.end === null ? "Present" : "";
    return end ? `${formatMonth(role.start)} – ${end}` : formatMonth(role.start);
  }

  function resolveIdentity(identity, profile, warnings) {
    const pick = (field, list = []) => {
      const id = profile[field];
      if (!id) return null;
      const entry = list.find((item) => item.id === id);
      if (!entry) warnings.push(`Profile ${field} "${id}" is not in the career record, so it is left out.`);
      return entry || null;
    };
    const headline = pick("headline_id", identity.headline_variants);
    const summary = pick("summary_id", identity.summary_variants);
    const email = pick("email_id", identity.emails);
    const phone = pick("phone_id", identity.phones);
    const location = pick("location_id", identity.locations);
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

  function resolveSkills(skills, profile, warnings) {
    const priority = profile.skill_priority || [];
    if (priority.length === 0) return skills;
    const out = [];
    for (const ref of priority) {
      const skill = skills.find((s) => s.id === ref || s.name === ref);
      if (skill) out.push(skill);
      else warnings.push(`Profile skill "${ref}" is not in the career record, so it is left out.`);
    }
    return out;
  }

  function buildModel() {
    const profile = currentProfile();
    const r = rules();
    const warnings = [];
    const rowStates = new Map();
    let remaining = state.budget ?? Infinity;
    let truncated = 0;
    let excludedByStatus = 0;

    const experience = [];
    for (const entry of state.roles) {
      if (!entry.selected) {
        if (entry.required) warnings.push(`${roleLabel(state.rolesById.get(entry.role_id))} is required by this profile but is not selected.`);
        continue;
      }
      const role = state.rolesById.get(entry.role_id);
      const eligible = [];
      for (const ce of entry.claims) {
        const key = claimKey(role.id, ce.claim_id);
        const claim = state.claimsByKey.get(key);
        if (!ce.selected || !isOffered(claim, r) || !passesEmphasis(claim)) continue;
        if (!isEligible(claim, r)) {
          excludedByStatus += 1;
          rowStates.set(key, "unverified-off");
          continue;
        }
        eligible.push(ce);
      }
      const kept = eligible.slice(0, Math.max(0, remaining));
      truncated += eligible.length - kept.length;
      remaining -= kept.length;
      kept.forEach((ce) => rowStates.set(claimKey(role.id, ce.claim_id), "included"));
      eligible.slice(kept.length).forEach((ce) => rowStates.set(claimKey(role.id, ce.claim_id), "over-budget"));

      const titleVariant = (role.title_variants || []).find((v) => v.id === entry.title_variant_id);
      let summary = null;
      if (entry.summary_level) {
        const claim = role.summaries && role.summaries[entry.summary_level];
        if (claim && isEligible(claim, r)) summary = { claim_id: claim.id, text: claim.text, status: claim.status };
      }

      experience.push({
        role_id: role.id,
        company: role.company,
        title: titleVariant ? titleVariant.title : role.title,
        title_variant_id: titleVariant ? titleVariant.id : null,
        location: role.location || null,
        start: role.start || null,
        end: role.end === undefined ? null : role.end,
        current: Boolean(role.current),
        dates: formatDates(role),
        summary,
        bullets: kept.map((ce) => {
          const key = claimKey(role.id, ce.claim_id);
          const claim = state.claimsByKey.get(key);
          const original = baseText(claim, ce.variant_id);
          const edit = state.edits.get(key);
          const edited = edit !== undefined && edit.trim() !== "" && edit.trim() !== original;
          const bullet = {
            claim_id: claim.id,
            variant_id: findVariant(claim, ce.variant_id) ? ce.variant_id : null,
            text: edited ? edit.trim() : original,
            status: claim.status,
          };
          if (claim.metric) bullet.metric = claim.metric;
          if (edited) bullet.edited = true;
          return bullet;
        }),
      });
    }

    if (truncated > 0) warnings.push(`${truncated} selected claim(s) are over the length budget of ${state.budget} and are left out.`);

    const education = (state.career.education || [])
      .filter((item) => isEligible(item, r))
      .map((item) => ({
        id: item.id || null,
        institution: item.institution,
        credential: item.credential || null,
        location: item.location || null,
        year: item.year || null,
        honors: item.honors || [],
        status: item.status || null,
      }));

    const orderedSkills = resolveSkills(state.career.skills || [], profile, warnings);
    const skills = SKILL_GROUPS.map(({ kind, label }) => ({
      kind,
      label,
      items: orderedSkills.filter((s) => s.kind === kind).map((s) => s.name),
    })).filter((group) => group.items.length > 0);

    const bullets = experience.reduce((n, role) => n + role.bullets.length, 0);
    const model = {
      profile: {
        id: profile.id,
        label: profile.label,
        reader: r.reader,
        allow_unverified: r.allowUnverified,
        length_budget: state.budget ?? null,
      },
      identity: resolveIdentity(state.career.identity, profile, warnings),
      experience,
      education,
      skills,
      stats: {
        roles: experience.length,
        bullets,
        unverified_bullets: experience.reduce((n, role) => n + role.bullets.filter((b) => b.status !== "verified").length, 0),
        excluded_by_status: excludedByStatus,
        truncated_by_budget: truncated,
      },
    };
    return { model, warnings, rowStates };
  }

  // -------------------------------------------------------------------------
  // Renderers: same output as scripts/export-resume.js
  // -------------------------------------------------------------------------

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
    const head = [item.credential, item.institution].filter(Boolean).join(", ");
    const tail = [item.location, item.year].filter(Boolean).join(" · ");
    const honors = item.honors.length ? ` (${item.honors.join(", ")})` : "";
    return `${head}${honors}${tail ? ` — ${tail}` : ""}`;
  }

  function roleMeta(role) {
    return [role.dates, role.location].filter(Boolean).join(" · ");
  }

  function renderMarkdown(m) {
    const out = [`# ${m.identity.name}`];
    if (m.identity.headline) out.push("", `**${m.identity.headline.text}**`);
    const contact = contactItems(m.identity);
    if (contact.length) out.push("", contact.join(" · "));
    if (m.identity.summary) out.push("", "## Summary", "", m.identity.summary.text);
    out.push("", "## Experience");
    for (const role of m.experience) {
      out.push("", `### ${role.title} — ${role.company}`);
      const meta = roleMeta(role);
      if (meta) out.push("", `*${meta}*`);
      if (role.summary) out.push("", role.summary.text);
      if (role.bullets.length) out.push("", ...role.bullets.map((b) => `- ${b.text}`));
    }
    if (m.education.length) out.push("", "## Education", "", ...m.education.map((e) => `- ${educationLine(e)}`));
    if (m.skills.length) out.push("", "## Skills", "", ...m.skills.map((g) => `- **${g.label}:** ${g.items.join(", ")}`));
    return `${out.join("\n")}\n`;
  }

  function renderText(m) {
    const out = [m.identity.name.toUpperCase()];
    if (m.identity.headline) out.push(m.identity.headline.text);
    const contact = contactItems(m.identity);
    if (contact.length) out.push(contact.join(" | "));
    if (m.identity.summary) out.push("", "SUMMARY", m.identity.summary.text);
    out.push("", "EXPERIENCE");
    for (const role of m.experience) {
      out.push("", `${role.title}, ${role.company}`);
      const meta = roleMeta(role);
      if (meta) out.push(meta);
      if (role.summary) out.push(role.summary.text);
      out.push(...role.bullets.map((b) => `- ${b.text}`));
    }
    if (m.education.length) out.push("", "EDUCATION", ...m.education.map(educationLine));
    if (m.skills.length) out.push("", "SKILLS", ...m.skills.map((g) => `${g.label}: ${g.items.join(", ")}`));
    return `${out.join("\n")}\n`;
  }

  function escapeHtml(value) {
    return String(value).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
  }

  function renderAtsHtml(m) {
    const e = escapeHtml;
    const parts = [`<p><strong>${e(m.identity.name)}</strong></p>`];
    if (m.identity.headline) parts.push(`<p>${e(m.identity.headline.text)}</p>`);
    const contact = contactItems(m.identity);
    if (contact.length) parts.push("<h2>Contact</h2>", ...contact.map((c) => `<p>${e(c)}</p>`));
    if (m.identity.summary) parts.push("<h2>Summary</h2>", `<p>${e(m.identity.summary.text)}</p>`);
    parts.push("<h2>Experience</h2>");
    for (const role of m.experience) {
      const meta = roleMeta(role);
      parts.push(`<p><strong>${e(role.title)}</strong>, ${e(role.company)}${meta ? `<br>${e(meta)}` : ""}</p>`);
      if (role.summary) parts.push(`<p>${e(role.summary.text)}</p>`);
      if (role.bullets.length) parts.push("<ul>", ...role.bullets.map((b) => `<li>${e(b.text)}</li>`), "</ul>");
    }
    if (m.education.length) parts.push("<h2>Education</h2>", ...m.education.map((item) => `<p>${e(educationLine(item))}</p>`));
    if (m.skills.length) parts.push("<h2>Skills</h2>", ...m.skills.map((g) => `<p>${e(g.label)}: ${e(g.items.join(", "))}</p>`));
    const css =
      "body{font-family:Arial,Helvetica,sans-serif;font-size:11pt;line-height:1.4;max-width:7.5in;margin:0.5in auto;color:#000}h2{font-size:12pt;margin:1.2em 0 0.4em}p,ul{margin:0 0 0.6em}";
    return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${e(`${m.identity.name} — Résumé`)}</title>
<style>${css}</style>
</head>
<body>
${parts.join("\n")}
</body>
</html>
`;
  }

  // -------------------------------------------------------------------------
  // DOM helpers
  // -------------------------------------------------------------------------

  function h(tag, attrs, ...children) {
    const node = document.createElement(tag);
    for (const [name, value] of Object.entries(attrs || {})) {
      if (value === null || value === undefined || value === false) continue;
      if (name === "class") node.className = value;
      else if (name === "dataset") Object.assign(node.dataset, value);
      else if (name in node && typeof value !== "string") node[name] = value;
      else node.setAttribute(name, value === true ? "" : value);
    }
    for (const child of children.flat(Infinity)) {
      if (child === null || child === undefined || child === false) continue;
      node.append(child instanceof Node ? child : document.createTextNode(String(child)));
    }
    return node;
  }

  function badge(text, tone) {
    return h("span", { class: `rb-badge${tone ? ` rb-badge--${tone}` : ""}` }, text);
  }

  function roleLabel(role) {
    return `${role.title} — ${role.company}`;
  }

  let uid = 0;
  const nextId = (prefix) => `${prefix}-${(uid += 1)}`;

  // -------------------------------------------------------------------------
  // Controls
  // -------------------------------------------------------------------------

  function renderAll() {
    renderEmphasis();
    renderConfidentialNote();
    renderRoles();
    update();
  }

  function renderEmphasis() {
    const r = rules();
    const counts = new Map();
    for (const entry of state.roles) {
      for (const ce of entry.claims) {
        const claim = state.claimsByKey.get(claimKey(entry.role_id, ce.claim_id));
        if (!isOffered(claim, r)) continue;
        for (const tag of claim.emphasis || []) counts.set(tag, (counts.get(tag) || 0) + 1);
      }
    }
    for (const tag of [...state.emphasis]) if (!counts.has(tag)) state.emphasis.delete(tag);
    const tags = [...counts.keys()].sort((a, b) => a.localeCompare(b));
    if (tags.length === 0) {
      els.emphasis.replaceChildren(h("p", { class: "rb-hint" }, "No emphasis tags on the offered claims."));
      return;
    }
    els.emphasis.replaceChildren(
      ...tags.map((tag) =>
        h(
          "label",
          { class: "rb-chip" },
          h("input", {
            type: "checkbox",
            value: tag,
            checked: state.emphasis.has(tag),
            onchange: (event) => {
              if (event.target.checked) state.emphasis.add(tag);
              else state.emphasis.delete(tag);
              renderRoles();
              update();
            },
          }),
          h("span", null, tag, h("span", { class: "rb-chip__count" }, ` ${counts.get(tag)}`))
        )
      )
    );
  }

  function renderConfidentialNote() {
    const r = rules();
    const profile = currentProfile();
    let hidden = 0;
    for (const claim of state.claimsByKey.values()) if (claim.confidential && claim.status !== "rejected") hidden += 1;
    let reason;
    if (r.allowConfidential) reason = "Confidential claims are offered because this profile is not the public portfolio and the reader is not an ATS.";
    else if (profile.id === PUBLIC_PROFILE_ID) reason = "Confidential claims are off for the public portfolio profile.";
    else reason = "Confidential claims are off because the reader is an ATS (profile reader or ATS HTML format).";
    els.confidential.textContent = hidden ? `${reason} ${hidden} in the record.` : `${reason} None are in the record.`;
  }

  function renderRoles() {
    const r = rules();
    els.roles.replaceChildren(...state.roles.map((entry) => renderRole(entry, r)));
  }

  function renderRole(entry, r) {
    const role = state.rolesById.get(entry.role_id);
    const roleCheckId = nextId("rb-role");
    const meta = [formatDates(role), role.location].filter(Boolean).join(" · ");

    const head = h(
      "div",
      { class: "rb-role__head" },
      h(
        "label",
        { class: "rb-check rb-check--role", for: roleCheckId },
        h("input", {
          id: roleCheckId,
          type: "checkbox",
          checked: entry.selected,
          onchange: (event) => {
            entry.selected = event.target.checked;
            article.classList.toggle("is-off", !entry.selected);
            update();
          },
        }),
        h("span", null, h("strong", null, role.company), h("span", { class: "rb-role__title" }, role.title))
      ),
      h("p", { class: "rb-role__meta" }, meta, entry.required ? badge("Required by profile") : null)
    );

    const options = [];
    if ((role.title_variants || []).length) {
      const id = nextId("rb-title");
      options.push(
        h(
          "div",
          { class: "rb-field rb-field--inline" },
          h("label", { class: "rb-label rb-label--small", for: id }, "Title"),
          h(
            "select",
            {
              id,
              class: "rb-input rb-input--small",
              onchange: (event) => {
                entry.title_variant_id = event.target.value || null;
                update();
              },
            },
            h("option", { value: "", selected: !entry.title_variant_id }, role.title),
            ...role.title_variants.map((v) =>
              h("option", { value: v.id, selected: entry.title_variant_id === v.id }, `${v.title} (${v.label})`)
            )
          )
        )
      );
    }
    const levels = SUMMARY_LEVELS.filter((l) => role.summaries && isOffered(role.summaries[l.id], r));
    if (levels.length) {
      const id = nextId("rb-summary");
      options.push(
        h(
          "div",
          { class: "rb-field rb-field--inline" },
          h("label", { class: "rb-label rb-label--small", for: id }, "Role summary"),
          h(
            "select",
            {
              id,
              class: "rb-input rb-input--small",
              onchange: (event) => {
                entry.summary_level = event.target.value || null;
                update();
              },
            },
            h("option", { value: "", selected: !entry.summary_level }, "None"),
            ...levels.map((l) => {
              const status = role.summaries[l.id].status;
              return h("option", { value: l.id, selected: entry.summary_level === l.id }, status === "verified" ? l.label : `${l.label} (unverified)`);
            })
          )
        )
      );
    }

    let hiddenByFilter = 0;
    let hiddenConfidential = 0;
    const items = [];
    for (const ce of entry.claims) {
      const key = claimKey(role.id, ce.claim_id);
      const claim = state.claimsByKey.get(key);
      if (!isOffered(claim, r)) {
        if (claim.confidential) hiddenConfidential += 1;
        continue;
      }
      if (!passesEmphasis(claim)) {
        hiddenByFilter += 1;
        continue;
      }
      items.push(renderClaim(entry, ce, claim, key, r));
    }

    const notes = [];
    if (items.length === 0 && hiddenByFilter === 0 && hiddenConfidential === 0) notes.push("No claims recorded for this role.");
    if (hiddenByFilter) notes.push(`${hiddenByFilter} claim${hiddenByFilter === 1 ? "" : "s"} hidden by the emphasis filter.`);
    if (hiddenConfidential) notes.push(`${hiddenConfidential} confidential claim${hiddenConfidential === 1 ? "" : "s"} not offered.`);

    const article = h(
      "article",
      { class: `rb-role${entry.selected ? "" : " is-off"}`, "aria-label": roleLabel(role) },
      head,
      options.length ? h("div", { class: "rb-role__opts" }, options) : null,
      items.length ? h("ul", { class: "rb-claims", role: "list" }, items) : null,
      notes.length ? h("p", { class: "rb-role__note" }, notes.join(" ")) : null
    );
    return article;
  }

  function renderClaim(entry, ce, claim, key, r) {
    const checkId = nextId("rb-claim");
    const editId = nextId("rb-edit");
    const warnId = nextId("rb-warn");
    const disabled = !isEligible(claim, r);
    const textSpan = h("span", { class: "rb-claim__text" }, displayText(claim, ce, key));

    const badges = [];
    if (claim.status !== "verified") badges.push(badge("Unverified", "warn"));
    if (claim.confidential) badges.push(badge("Confidential", "dark"));
    if (claim.metric) badges.push(badge("Has metric"));
    if (state.edits.has(key)) badges.push(badge("Edited", "edit"));
    const match = state.match && state.match.get(key);
    if (match && match.score > 0) badges.push(badge(`Match: ${match.terms.join(", ")}`, "match"));
    const statusSpan = h("span", { class: "rb-claim__state", "aria-live": "off" });

    const warning = h("p", { class: "rb-claim__warn", id: warnId, hidden: true });
    const textarea = h("textarea", {
      id: editId,
      class: "rb-input rb-input--area rb-input--small",
      rows: 3,
      "aria-describedby": warnId,
      oninput: (event) => {
        const value = event.target.value;
        if (value.trim() === "" || value.trim() === baseText(claim, ce.variant_id)) state.edits.delete(key);
        else state.edits.set(key, value);
        textSpan.textContent = displayText(claim, ce, key);
        updateEditWarning(claim, value, warning);
        update();
      },
    });
    const editBoxId = nextId("rb-editbox");
    const editBox = h(
      "div",
      { class: "rb-claim__edit", id: editBoxId, hidden: true },
      h("label", { class: "rb-label rb-label--small", for: editId }, "Text for this download only"),
      textarea,
      warning,
      h(
        "button",
        {
          type: "button",
          class: "rb-btn rb-btn--quiet rb-btn--small",
          onclick: () => {
            state.edits.delete(key);
            textarea.value = baseText(claim, ce.variant_id);
            textSpan.textContent = displayText(claim, ce, key);
            updateEditWarning(claim, textarea.value, warning);
            update();
          },
        },
        "Reset to record text"
      )
    );
    const editToggle = h(
      "button",
      {
        type: "button",
        class: "rb-btn rb-btn--quiet rb-btn--small",
        "aria-expanded": "false",
        "aria-controls": editBoxId,
        onclick: (event) => {
          const open = editBox.hidden;
          editBox.hidden = !open;
          event.currentTarget.setAttribute("aria-expanded", String(open));
          event.currentTarget.textContent = open ? "Close editor" : "Edit text";
          if (open) {
            textarea.value = state.edits.get(key) ?? baseText(claim, ce.variant_id);
            updateEditWarning(claim, textarea.value, warning);
            textarea.focus();
          }
        },
      },
      "Edit text"
    );

    const tools = [editToggle];
    if ((claim.variants || []).length) {
      const variantId = nextId("rb-variant");
      tools.unshift(
        h("label", { class: "visually-hidden", for: variantId }, "Wording"),
        h(
          "select",
          {
            id: variantId,
            class: "rb-input rb-input--small",
            onchange: (event) => {
              ce.variant_id = event.target.value || null;
              state.edits.delete(key);
              textSpan.textContent = displayText(claim, ce, key);
              if (!editBox.hidden) textarea.value = baseText(claim, ce.variant_id);
              update();
            },
          },
          h("option", { value: "", selected: !ce.variant_id }, "Record wording"),
          ...claim.variants.map((v) =>
            h("option", { value: v.id, selected: ce.variant_id === v.id }, `Variant: ${[v.length, v.audience].filter(Boolean).join(", ") || v.id}`)
          )
        )
      );
    }

    return h(
      "li",
      { class: `rb-claim${disabled ? " is-disabled" : ""}`, dataset: { key } },
      h(
        "label",
        { class: "rb-check", for: checkId },
        h("input", {
          id: checkId,
          type: "checkbox",
          checked: ce.selected,
          disabled,
          onchange: (event) => {
            ce.selected = event.target.checked;
            update();
          },
        }),
        textSpan
      ),
      h("div", { class: "rb-claim__meta" }, badges, statusSpan),
      h("div", { class: "rb-claim__tools" }, tools),
      editBox
    );
  }

  function displayText(claim, ce, key) {
    return state.edits.get(key)?.trim() || baseText(claim, ce.variant_id);
  }

  function numbersIn(text) {
    return String(text).match(/\d[\d,.]*%?/g) || [];
  }

  function updateEditWarning(claim, value, warning) {
    const known = new Set(
      [
        claim.text,
        ...(claim.variants || []).map((v) => v.text),
        claim.metric ? `${claim.metric.value ?? ""} ${claim.metric.wording ?? ""}` : "",
      ].flatMap(numbersIn)
    );
    const added = [...new Set(numbersIn(value))].filter((n) => !known.has(n));
    warning.hidden = added.length === 0;
    warning.textContent = added.length ? `Adds numbers that are not in the career record for this claim: ${added.join(", ")}.` : "";
  }

  // -------------------------------------------------------------------------
  // Preview and output
  // -------------------------------------------------------------------------

  function update() {
    const { model, warnings, rowStates } = buildModel();
    state.output = FORMATS[state.format].render(model);

    for (const row of els.roles.querySelectorAll(".rb-claim")) {
      const rowState = rowStates.get(row.dataset.key) || "off";
      row.dataset.state = rowState;
      const label = row.querySelector(".rb-claim__state");
      if (label) {
        label.textContent =
          rowState === "over-budget" ? "Over budget" : rowState === "unverified-off" ? "Excluded: unverified" : "";
      }
    }

    const s = model.stats;
    const status = [
      `${s.bullets} bullet${s.bullets === 1 ? "" : "s"} across ${s.roles} role${s.roles === 1 ? "" : "s"}`,
      state.budget ? `budget ${state.budget}` : "no budget",
      s.unverified_bullets ? `${s.unverified_bullets} unverified` : null,
      s.truncated_by_budget ? `${s.truncated_by_budget} over budget` : null,
    ]
      .filter(Boolean)
      .join(" · ");
    if (els.status.textContent !== status) els.status.textContent = status;

    const allWarnings = [...state.notes, ...warnings];
    const edited = model.experience.reduce((n, role) => n + role.bullets.filter((b) => b.edited).length, 0);
    if (edited) allWarnings.push(`${edited} bullet${edited === 1 ? " uses" : "s use"} edited text for this download only.`);
    els.warnings.replaceChildren(...allWarnings.map((w) => h("li", null, w)));
    els.warnings.hidden = allWarnings.length === 0;

    renderPreview(model);
    els.source.textContent = state.output;
    els.preview.hidden = state.view !== "doc";
    els.source.hidden = state.view !== "file";
  }

  function renderPreview(m) {
    const id = m.identity;
    const contact = contactItems(id);
    const doc = [h("p", { class: "rb-doc__name" }, id.name)];
    if (id.headline) doc.push(h("p", { class: "rb-doc__headline" }, id.headline.text));
    if (contact.length) doc.push(h("p", { class: "rb-doc__contact" }, contact.join(" · ")));
    if (id.summary) doc.push(h("h3", { class: "rb-doc__h" }, "Summary"), h("p", null, id.summary.text));
    doc.push(h("h3", { class: "rb-doc__h" }, "Experience"));
    if (m.experience.length === 0) doc.push(h("p", { class: "rb-hint" }, "No roles selected."));
    for (const role of m.experience) {
      const meta = roleMeta(role);
      doc.push(
        h(
          "div",
          { class: "rb-doc__role" },
          h("h4", { class: "rb-doc__role-title" }, role.title, h("span", { class: "rb-doc__company" }, ` / ${role.company}`)),
          meta ? h("p", { class: "rb-doc__meta" }, meta) : null,
          role.summary
            ? h("p", null, role.summary.text, role.summary.status !== "verified" ? badge("Unverified", "warn") : null)
            : null,
          role.bullets.length
            ? h(
                "ul",
                null,
                role.bullets.map((b) =>
                  h(
                    "li",
                    null,
                    b.text,
                    b.status !== "verified" ? badge("Unverified", "warn") : null,
                    b.edited ? badge("Edited", "edit") : null
                  )
                )
              )
            : null
        )
      );
    }
    if (m.education.length) {
      doc.push(h("h3", { class: "rb-doc__h" }, "Education"));
      for (const item of m.education) {
        doc.push(h("p", null, educationLine(item), item.status !== "verified" ? badge("Unverified", "warn") : null));
      }
    }
    if (m.skills.length) {
      doc.push(
        h("h3", { class: "rb-doc__h" }, "Skills"),
        h("dl", { class: "rb-doc__skills" }, m.skills.map((g) => [h("dt", null, g.label), h("dd", null, g.items.join(", "))]))
      );
    }
    const notice =
      m.stats.unverified_bullets > 0
        ? h(
            "p",
            { class: "rb-note" },
            `${m.stats.unverified_bullets} bullet${m.stats.unverified_bullets === 1 ? " is" : "s are"} unverified. The Unverified marks appear only in this preview, not in the downloaded file.`
          )
        : null;
    els.preview.replaceChildren(...[notice, h("div", { class: "rb-doc" }, doc)].filter(Boolean));
  }

  function slug(value) {
    return normalizeText(value).replace(/\s+/g, "-") || "resume";
  }

  function download() {
    const format = FORMATS[state.format];
    const name = `${slug(state.career.identity.name)}-resume-${state.profileId}${state.match ? "-matched" : ""}.${format.ext}`;
    const url = URL.createObjectURL(new Blob([state.output], { type: format.type }));
    const link = h("a", { href: url, download: name, hidden: true });
    document.body.append(link);
    link.click();
    link.remove();
    setTimeout(() => URL.revokeObjectURL(url), 0);
  }

  // -------------------------------------------------------------------------
  // Events
  // -------------------------------------------------------------------------

  function bindEvents() {
    els.profile.addEventListener("change", () => selectProfile(els.profile.value));
    els.match.addEventListener("click", applyMatch);
    els.clearMatch.addEventListener("click", resetToProfile);
    els.budget.addEventListener("input", () => {
      const value = Number(els.budget.value);
      state.budget = els.budget.value !== "" && Number.isInteger(value) && value >= 1 ? value : null;
      update();
    });
    els.unverified.addEventListener("change", () => {
      state.includeUnverified = els.unverified.checked;
      renderRoles();
      update();
    });
    els.format.addEventListener("change", () => {
      const wasAts = rules().reader === "ats";
      state.format = els.format.value;
      if ((rules().reader === "ats") !== wasAts) renderAll();
      else update();
    });
    for (const radio of document.querySelectorAll('input[name="rb-view"]')) {
      radio.addEventListener("change", () => {
        state.view = radio.value;
        update();
      });
    }
    els.download.addEventListener("click", download);
  }

  load();
})();
