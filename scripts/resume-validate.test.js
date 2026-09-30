const { test } = require('node:test');
const assert = require('node:assert');
const fs = require('fs');
const os = require('os');
const path = require('path');
const { spawnSync } = require('child_process');
const yaml = require('js-yaml');
const { validateResume } = require('./validate-resume');

const SCRIPT = path.join(__dirname, 'validate-resume.js');
const SOURCE = [{ path: 'resume/sources/notes/reconciliation.md', locator: 'Indeed' }];

function baseFixture() {
  return {
    identity: { name: 'Aaron Benjamin' },
    experience: [
      {
        id: 'acme-lead',
        company: 'Acme',
        title: 'Design Lead',
        start: '2021-01',
        end: null,
        current: true,
        claims: [
          { id: 'acme-launch', kind: 'impact', text: 'Launched the catalog.', status: 'verified', sources: SOURCE },
          { id: 'acme-tests', kind: 'impact', text: 'Ran over 30 A/B tests.', status: 'verified', sources: SOURCE },
        ],
      },
      {
        id: 'globex-designer',
        company: 'Globex',
        title: 'Product Designer',
        start: '2018-03',
        end: '2020-12',
        claims: [
          { id: 'globex-system', kind: 'craft', text: 'Built the design system.', status: 'verified', sources: SOURCE },
        ],
      },
    ],
    education: [{ id: 'state-u', institution: 'State University', status: 'unverified' }],
    skills: [{ name: 'Interaction design', kind: 'capability' }],
    profiles: {
      public: {
        id: 'public',
        label: 'Public',
        reader: 'human',
        allow_unverified: false,
        length_budget: 5,
        required_role_ids: ['acme-lead'],
        roles: [
          { role_id: 'acme-lead', claims: [{ claim_id: 'acme-launch' }, { claim_id: 'acme-tests' }] },
          { role_id: 'globex-designer', claims: [{ claim_id: 'globex-system' }] },
        ],
      },
    },
  };
}

function writeFixture(fixture) {
  const root = fs.mkdtempSync(path.join(os.tmpdir(), 'resume-validate-'));
  const canonical = path.join(root, 'resume', 'canonical');
  const profiles = path.join(root, 'resume', 'profiles');
  fs.mkdirSync(canonical, { recursive: true });
  fs.mkdirSync(profiles, { recursive: true });
  for (const part of ['identity', 'experience', 'education', 'skills']) {
    fs.writeFileSync(path.join(canonical, `${part}.yml`), yaml.dump({ [part]: fixture[part] }));
  }
  for (const [name, profile] of Object.entries(fixture.profiles)) {
    fs.writeFileSync(path.join(profiles, `${name}.yml`), yaml.dump(profile));
  }
  return root;
}

function run(mutate) {
  const fixture = baseFixture();
  if (mutate) mutate(fixture);
  const root = writeFixture(fixture);
  try {
    return validateResume({ root });
  } finally {
    fs.rmSync(root, { recursive: true, force: true });
  }
}

function assertError(result, pattern) {
  assert.ok(
    result.errors.some((e) => pattern.test(e)),
    `expected an error matching ${pattern}, got:\n${result.errors.join('\n') || '(none)'}`
  );
}

test('valid fixture passes with no errors or warnings', () => {
  const result = run();
  assert.deepStrictEqual(result.errors, []);
  assert.deepStrictEqual(result.warnings, []);
});

test('inverted role dates fail', () => {
  const result = run((f) => {
    f.experience[1].start = '2020-12';
    f.experience[1].end = '2018-03';
  });
  assertError(result, /role globex-designer: end 2018-03 is before start 2020-12/);
});

test('year-only role dates pass when ordered and fail when inverted', () => {
  const ordered = run((f) => {
    f.experience[1].start = '2010';
    f.experience[1].end = '2011';
  });
  assert.deepStrictEqual(ordered.errors, []);

  const inverted = run((f) => {
    f.experience[1].start = '2011';
    f.experience[1].end = '2010';
  });
  assertError(inverted, /role globex-designer: end 2010 is before start 2011/);
});

test('same-year year-only range and mixed precision range pass', () => {
  const result = run((f) => {
    f.experience[1].start = '2019-06';
    f.experience[1].end = '2019';
  });
  assert.deepStrictEqual(result.errors, []);
});

test('current true with a year-only end fails', () => {
  const result = run((f) => {
    f.experience[0].end = '2024';
  });
  assertError(result, /role acme-lead: current is true but end is 2024/);
});

test('verified claim without a source fails', () => {
  const result = run((f) => {
    delete f.experience[0].claims[0].sources;
  });
  assertError(result, /claim acme-launch: status verified with zero sources/);
});

test('verified education without a source fails', () => {
  const result = run((f) => {
    f.education[0].status = 'verified';
  });
  assertError(result, /education state-u: status verified with zero sources/);
});

test('profile referencing an unknown claim id fails', () => {
  const result = run((f) => {
    f.profiles.public.roles[0].claims.push({ claim_id: 'acme-imaginary' });
  });
  assertError(result, /unknown claim id "acme-imaginary"/);
});

test('profile headline_id must exist in identity.headline_variants', () => {
  const addHeadline = (f) => {
    f.identity.headline_variants = [{ id: 'design-lead', text: 'Product design lead' }];
  };
  const known = run((f) => {
    addHeadline(f);
    f.profiles.public.headline_id = 'design-lead';
  });
  assert.deepStrictEqual(known.errors, []);

  const unknown = run((f) => {
    addHeadline(f);
    f.profiles.public.headline_id = 'chief-wizard';
  });
  assertError(unknown, /headline_id "chief-wizard" does not exist in identity\.headline_variants/);
});

test('selected claim count over length_budget fails', () => {
  const result = run((f) => {
    f.profiles.public.length_budget = 2;
  });
  assertError(result, /selects 3 claims, exceeding length_budget 2/);
});

test('public-portfolio selecting a confidential claim fails even when allow_unverified is true', () => {
  const result = run((f) => {
    f.experience[0].claims[0].confidential = true;
    f.profiles.public.id = 'public-portfolio';
    f.profiles.public.allow_unverified = true;
  });
  assertError(result, /role acme-lead: selects confidential claim "acme-launch" in a public or ATS profile/);
});

test('ATS profile selecting a confidential claim fails', () => {
  const result = run((f) => {
    f.experience[0].claims[0].confidential = true;
    f.profiles.public.id = 'ats-general';
    f.profiles.public.reader = 'ats';
  });
  assertError(result, /selects confidential claim "acme-launch"/);
});

test('human profile with another id may select a confidential claim', () => {
  const result = run((f) => {
    f.experience[0].claims[0].confidential = true;
    f.profiles.public.id = 'default-full';
    f.profiles.public.allow_unverified = false;
  });
  assert.deepStrictEqual(result.errors, []);
  assert.deepStrictEqual(result.warnings, []);
});

test('overlapping roles without overlap_note warn on stderr but exit 0', () => {
  const fixture = baseFixture();
  fixture.experience[1].end = '2021-06';
  const root = writeFixture(fixture);
  try {
    const cli = spawnSync(process.execPath, [SCRIPT, '--root', root], { encoding: 'utf8' });
    assert.strictEqual(cli.status, 0, `stderr:\n${cli.stderr}`);
    assert.match(cli.stderr, /warning: roles acme-lead and globex-designer have overlapping dates/);
    assert.doesNotMatch(cli.stderr, /error:/);
  } finally {
    fs.rmSync(root, { recursive: true, force: true });
  }
});

test('overlap_note on either role silences the overlap warning', () => {
  const result = run((f) => {
    f.experience[1].end = '2021-06';
    f.experience[1].overlap_note = 'Concurrent contract during notice period.';
  });
  assert.deepStrictEqual(result.errors, []);
  assert.deepStrictEqual(result.warnings, []);
});

test('missing canonical YAML exits 1 with a clear message', () => {
  const root = writeFixture(baseFixture());
  try {
    fs.rmSync(path.join(root, 'resume', 'canonical', 'skills.yml'));
    const cli = spawnSync(process.execPath, [SCRIPT, '--root', root], { encoding: 'utf8' });
    assert.strictEqual(cli.status, 1);
    assert.match(cli.stderr, /Missing canonical YAML: .*skills\.yml/);
  } finally {
    fs.rmSync(root, { recursive: true, force: true });
  }
});
