#!/usr/bin/env node
/**
 * Validate the canonical career record and every résumé profile.
 *
 * Usage: node scripts/validate-resume.js [--root <dir>] [--schema-dir <dir>]
 *
 * Exits 1 on any error. Warnings (e.g. overlapping roles without an
 * overlap_note) are printed to stderr and do not change the exit code.
 */
const fs = require('fs');
const path = require('path');
const yaml = require('js-yaml');
const Ajv2020 = require('ajv/dist/2020');

const REPO_ROOT = path.join(__dirname, '..');
const CANONICAL_PARTS = ['identity', 'experience', 'education', 'skills'];
const ALLOWED_ATS_HEADINGS = new Set(['contact', 'summary', 'experience', 'education', 'skills']);
const YEAR_MONTH_PATTERN = '^\\d{4}-\\d{2}$';
const YEAR_OR_YEAR_MONTH = /^(\d{4})(?:-(\d{2}))?$/;
const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const OPEN_ENDED = '9999-12';
const PUBLIC_PROFILE_ID = 'public-portfolio';
const IDENTITY_REFERENCES = [
  ['headline_id', 'headline_variants'],
  ['summary_id', 'summary_variants'],
  ['email_id', 'emails'],
  ['phone_id', 'phones'],
  ['location_id', 'locations'],
];

class ValidationFailure extends Error {}

function readYaml(file) {
  try {
    return yaml.load(fs.readFileSync(file, 'utf8'));
  } catch (err) {
    throw new ValidationFailure(`Cannot parse YAML ${file}: ${err.message}`);
  }
}

function loadCareer(canonicalDir) {
  const missing = CANONICAL_PARTS.map((part) => path.join(canonicalDir, `${part}.yml`)).filter(
    (file) => !fs.existsSync(file)
  );
  if (missing.length) {
    throw new ValidationFailure(
      `Missing canonical YAML: ${missing.map((f) => path.relative(process.cwd(), f)).join(', ')}`
    );
  }

  const career = {};
  for (const part of CANONICAL_PARTS) {
    const doc = readYaml(path.join(canonicalDir, `${part}.yml`));
    if (doc && typeof doc === 'object' && !Array.isArray(doc) && part in doc) {
      Object.assign(career, doc);
    } else {
      career[part] = doc;
    }
  }
  return career;
}

function loadProfiles(profilesDir) {
  if (!fs.existsSync(profilesDir)) return [];
  return fs
    .readdirSync(profilesDir)
    .filter((name) => /\.ya?ml$/.test(name))
    .sort()
    .map((name) => {
      const file = path.join(profilesDir, name);
      return { file, data: readYaml(file) };
    });
}

function buildValidators(schemaDir) {
  const ajv = new Ajv2020({ allErrors: true, allowUnionTypes: true });
  ajv.addFormat('email', EMAIL);
  const load = (name) => JSON.parse(fs.readFileSync(path.join(schemaDir, name), 'utf8'));
  const careerSchema = load('career.schema.json');
  for (const def of ['dateYearMonth', 'dateYearMonthNullable']) {
    const node = careerSchema.$defs && careerSchema.$defs[def];
    if (node && node.pattern === YEAR_MONTH_PATTERN) node.pattern = YEAR_OR_YEAR_MONTH.source;
  }
  return {
    career: ajv.compile(careerSchema),
    profile: ajv.compile(load('profile.schema.json')),
  };
}

function schemaErrors(validate, data, label) {
  if (validate(data)) return [];
  return validate.errors.map((e) => `${label}: schema ${e.instancePath || '/'} ${e.message}`);
}

function validMonth(month) {
  const m = Number(month);
  return m >= 1 && m <= 12;
}

function isRangeDate(value) {
  const match = typeof value === 'string' && YEAR_OR_YEAR_MONTH.exec(value);
  return Boolean(match) && (!match[2] || validMonth(match[2]));
}

function checkRangeDate(value, label, errors) {
  if (value === undefined || value === null) return true;
  if (isRangeDate(value)) return true;
  const hint = typeof value === 'number' ? ' (quote it in YAML so it stays a string)' : '';
  errors.push(`${label}: date "${value}" is not YYYY or YYYY-MM${hint}`);
  return false;
}

/**
 * Comparable YYYY-MM for a range endpoint. A year-only value has an unknown
 * month: `widest` spans the whole year (Jan start, Dec end); otherwise it spans
 * none of it (Dec start, Jan end) so only certain overlaps are reported.
 */
function rangeBound(value, side, widest = true) {
  if (value.length > 4) return value;
  const startMonth = widest ? '01' : '12';
  const endMonth = widest ? '12' : '01';
  return `${value}-${side === 'start' ? startMonth : endMonth}`;
}

function checkDateRange(item, label, errors) {
  const startOk = checkRangeDate(item.start, `${label}.start`, errors);
  const endOk = checkRangeDate(item.end, `${label}.end`, errors);
  if (
    startOk &&
    endOk &&
    typeof item.start === 'string' &&
    typeof item.end === 'string' &&
    rangeBound(item.end, 'end') < rangeBound(item.start, 'start')
  ) {
    errors.push(`${label}: end ${item.end} is before start ${item.start}`);
  }
  if (item.current === true && item.end !== undefined && item.end !== null) {
    errors.push(`${label}: current is true but end is ${item.end}`);
  }
}

function normalizeText(text) {
  return String(text ?? '')
    .toLowerCase()
    .replace(/[^\p{L}\p{N}\s]/gu, '')
    .replace(/\s+/g, ' ')
    .trim();
}

function isPresent(value) {
  return value !== undefined && value !== null && value !== '';
}

function claimsOf(owner) {
  const summaries = owner && owner.summaries && typeof owner.summaries === 'object' ? owner.summaries : {};
  return [
    ...Object.values(summaries).filter((c) => c && typeof c === 'object'),
    ...(Array.isArray(owner && owner.claims) ? owner.claims : []),
  ];
}

function checkClaim(claim, label, errors) {
  const sources = Array.isArray(claim.sources) ? claim.sources : [];
  if (claim.status === 'verified' && sources.length === 0) {
    errors.push(`${label}: status verified with zero sources`);
  }
  if (claim.metric && typeof claim.metric === 'object') {
    if (!isPresent(claim.metric.value) && !isPresent(claim.metric.wording)) {
      errors.push(`${label}: metric has neither value nor wording`);
    }
  }
}

function checkClaimSet(claims, ownerLabel, errors) {
  const ids = new Map();
  const texts = new Map();
  for (const claim of claims) {
    const label = `${ownerLabel} claim ${claim.id ?? '(no id)'}`;
    checkClaim(claim, label, errors);
    if (claim.id !== undefined) {
      if (ids.has(claim.id)) errors.push(`${ownerLabel}: duplicate claim id "${claim.id}"`);
      ids.set(claim.id, true);
    }
    const normalized = normalizeText(claim.text);
    if (normalized) {
      if (texts.has(normalized)) {
        errors.push(
          `${ownerLabel}: claims "${texts.get(normalized)}" and "${claim.id}" have duplicate text`
        );
      } else {
        texts.set(normalized, claim.id);
      }
    }
  }
}

function checkEducation(education, errors) {
  education.forEach((item, i) => {
    const label = `education ${item.id ?? `[${i}]`}`;
    const entries = [[item, label], ...(item.alternates || []).map((alt, j) => [alt, `${label} alternate ${alt.id ?? `[${j}]`}`])];
    for (const [entry, entryLabel] of entries) {
      if (isPresent(entry.year)) {
        const match = typeof entry.year === 'string' && YEAR_OR_YEAR_MONTH.exec(entry.year);
        if (!match || (match[2] && !validMonth(match[2]))) {
          errors.push(`${entryLabel}: year "${entry.year}" is not YYYY or YYYY-MM`);
        }
      }
      if (entry.status === 'verified' && !(Array.isArray(entry.sources) && entry.sources.length)) {
        errors.push(`${entryLabel}: status verified with zero sources`);
      }
    }
  });
}

function checkOverlaps(roles, warnings) {
  const dated = roles
    .filter((r) => isRangeDate(r.start) && (r.end === undefined || r.end === null || isRangeDate(r.end)))
    .map((r) => ({
      role: r,
      start: rangeBound(r.start, 'start', false),
      end: typeof r.end === 'string' ? rangeBound(r.end, 'end', false) : OPEN_ENDED,
    }));
  for (let i = 0; i < dated.length; i++) {
    for (let j = i + 1; j < dated.length; j++) {
      const a = dated[i].role;
      const b = dated[j].role;
      const overlaps = dated[i].start < dated[j].end && dated[j].start < dated[i].end;
      if (overlaps && !a.overlap_note && !b.overlap_note) {
        warnings.push(`roles ${a.id} and ${b.id} have overlapping dates and no overlap_note`);
      }
    }
  }
}

function checkCareer(career, errors, warnings) {
  const roles = Array.isArray(career.experience) ? career.experience : [];
  roles.forEach((role, i) => {
    const label = `role ${role.id ?? `[${i}]`}`;
    checkDateRange(role, label, errors);
    checkClaimSet(claimsOf(role), label, errors);
  });
  (Array.isArray(career.projects) ? career.projects : []).forEach((project, i) => {
    const label = `project ${project.id ?? `[${i}]`}`;
    checkDateRange(project, label, errors);
    checkClaimSet(claimsOf(project), label, errors);
  });
  checkEducation(Array.isArray(career.education) ? career.education : [], errors);
  checkOverlaps(roles, warnings);
}

function isPublicFacing(profile) {
  return profile.id === PUBLIC_PROFILE_ID || profile.reader === 'ats';
}

function checkProfileIdentity(profile, identity, label, errors) {
  const source = identity && typeof identity === 'object' ? identity : {};
  for (const [field, listKey] of IDENTITY_REFERENCES) {
    const id = profile[field];
    if (!isPresent(id)) continue;
    const list = Array.isArray(source[listKey]) ? source[listKey] : [];
    if (!list.some((entry) => entry && entry.id === id)) {
      errors.push(`${label}: ${field} "${id}" does not exist in identity.${listKey}`);
    }
  }
}

function checkProfile(profile, roleIndex, label, errors, warnings) {
  const selections = Array.isArray(profile.roles) ? profile.roles : [];
  const selectedClaimIds = new Set();
  let claimCount = 0;

  for (const selection of selections) {
    const role = roleIndex.get(selection.role_id);
    if (!role) {
      errors.push(`${label}: unknown role id "${selection.role_id}"`);
      continue;
    }
    const roleLabel = `${label} role ${role.id}`;
    if (
      selection.title_variant_id &&
      !(role.title_variants || []).some((t) => t.id === selection.title_variant_id)
    ) {
      errors.push(`${roleLabel}: unknown title variant id "${selection.title_variant_id}"`);
    }
    if (selection.summary_level && !(role.summaries && role.summaries[selection.summary_level])) {
      warnings.push(`${roleLabel}: no ${selection.summary_level} summary exists for summary_level`);
    }

    const claims = new Map(claimsOf(role).map((c) => [c.id, c]));
    for (const pick of Array.isArray(selection.claims) ? selection.claims : []) {
      claimCount += 1;
      if (selectedClaimIds.has(pick.claim_id)) {
        errors.push(`${label}: claim id "${pick.claim_id}" is selected more than once`);
      }
      selectedClaimIds.add(pick.claim_id);

      const claim = claims.get(pick.claim_id);
      if (!claim) {
        errors.push(`${roleLabel}: unknown claim id "${pick.claim_id}"`);
        continue;
      }
      if (pick.variant_id && !(claim.variants || []).some((v) => v.id === pick.variant_id)) {
        errors.push(`${roleLabel}: unknown variant id "${pick.variant_id}" on claim "${claim.id}"`);
      }
      if (claim.status === 'rejected') {
        errors.push(`${roleLabel}: selects rejected claim "${claim.id}"`);
      } else if (profile.allow_unverified === false && claim.status !== 'verified') {
        errors.push(`${roleLabel}: selects unverified claim "${claim.id}" but allow_unverified is false`);
      }
      if (claim.confidential === true && isPublicFacing(profile)) {
        errors.push(`${roleLabel}: selects confidential claim "${claim.id}" in a public or ATS profile`);
      }
    }
  }

  const selectedRoleIds = new Set(selections.map((s) => s.role_id));
  for (const requiredId of Array.isArray(profile.required_role_ids) ? profile.required_role_ids : []) {
    if (!roleIndex.has(requiredId)) {
      errors.push(`${label}: required role id "${requiredId}" does not exist in the canonical record`);
    }
    if (!selectedRoleIds.has(requiredId)) {
      errors.push(`${label}: required role id "${requiredId}" is missing from roles`);
    }
  }

  if (Number.isInteger(profile.length_budget) && claimCount > profile.length_budget) {
    errors.push(`${label}: selects ${claimCount} claims, exceeding length_budget ${profile.length_budget}`);
  }
}

function stripTags(html) {
  return html
    .replace(/<[^>]*>/g, '')
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/\s+/g, ' ')
    .trim();
}

function checkAtsExport(file, label, errors) {
  if (!fs.existsSync(file)) return;
  const html = fs.readFileSync(file, 'utf8');
  if (/<table\b/i.test(html)) errors.push(`${label}: ATS export contains <table>`);
  if (/<img\b/i.test(html)) errors.push(`${label}: ATS export contains <img>`);
  for (const match of html.matchAll(/<h([1-6])\b[^>]*>([\s\S]*?)<\/h\1\s*>/gi)) {
    const text = stripTags(match[2]);
    if (!ALLOWED_ATS_HEADINGS.has(text.toLowerCase())) {
      errors.push(`${label}: ATS export has disallowed heading "${text}"`);
    }
  }
}

function validateResume(options = {}) {
  const root = options.root || REPO_ROOT;
  const schemaDir = options.schemaDir || path.join(REPO_ROOT, 'resume', 'schema');
  const errors = [];
  const warnings = [];

  let career;
  let profiles;
  try {
    career = loadCareer(path.join(root, 'resume', 'canonical'));
    profiles = loadProfiles(path.join(root, 'resume', 'profiles'));
  } catch (err) {
    if (err instanceof ValidationFailure) return { errors: [err.message], warnings, profileCount: 0 };
    throw err;
  }

  const validators = buildValidators(schemaDir);
  errors.push(...schemaErrors(validators.career, career, 'career'));
  checkCareer(career, errors, warnings);

  const roles = Array.isArray(career.experience) ? career.experience : [];
  const roleIndex = new Map(roles.filter((r) => r && r.id).map((r) => [r.id, r]));

  if (!profiles.length) warnings.push('no profiles found in resume/profiles');
  for (const { file, data } of profiles) {
    const label = `profile ${path.basename(file)}`;
    const profile = data && typeof data === 'object' ? data : {};
    errors.push(...schemaErrors(validators.profile, data, label));
    checkProfile(profile, roleIndex, label, errors, warnings);
    checkProfileIdentity(profile, career.identity, label, errors);
    if (typeof profile.id === 'string') {
      checkAtsExport(path.join(root, 'resume', 'exports', profile.id, 'resume.ats.html'), label, errors);
    }
  }

  return { errors, warnings, profileCount: profiles.length };
}

function parseArgs(argv) {
  const options = {};
  for (let i = 0; i < argv.length; i++) {
    if (argv[i] === '--root') options.root = path.resolve(argv[++i]);
    else if (argv[i] === '--schema-dir') options.schemaDir = path.resolve(argv[++i]);
  }
  return options;
}

function main() {
  const { errors, warnings, profileCount } = validateResume(parseArgs(process.argv.slice(2)));
  for (const w of warnings) console.error(`warning: ${w}`);
  for (const e of errors) console.error(`error: ${e}`);
  if (errors.length) {
    console.error(`Résumé validation failed with ${errors.length} error(s).`);
    process.exit(1);
  }
  console.log(`Résumé validation passed (${profileCount} profile(s), ${warnings.length} warning(s)).`);
}

if (require.main === module) main();

module.exports = { validateResume, normalizeText };
