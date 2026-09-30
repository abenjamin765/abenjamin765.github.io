# Résumé system

How the résumé is stored, validated, tailored, and exported. Field-level rules
live in `resume/schema/conventions.md`; this doc is the system overview.

## Canonical format

The career record is **YAML, validated by JSON Schema** (draft 2020-12, via Ajv).

- **Human edit:** YAML takes comments, so each fact can carry its source and
  locator next to it.
- **Diffs:** one fact per line reviews cleanly in git.
- **Validation:** `additionalProperties: false` everywhere; unknown keys fail.
- **Multi-format export:** one record feeds every output format.

JSON is a **generated projection** (`resume/exports/**/resume.json`,
`resume/exports/data/*.json`). Never hand-edit JSON; never copy a résumé to
make a new one.

## Directory map

| Path | Holds |
| --- | --- |
| `resume/schema/` | `career.schema.json`, `profile.schema.json`, `conventions.md` |
| `resume/canonical/` | Facts: `identity.yml`, `experience.yml`, `education.yml`, `skills.yml` |
| `resume/profiles/` | Selection and presentation: `default-full.yml`, `public-portfolio.yml` |
| `resume/sources/inbox/` | Drop zone for raw source files (e.g. a LinkedIn export). Empty today (`.gitkeep` only) |
| `resume/sources/notes/` | `reconciliation.md` (source comparison), `linkedin-experience.md` (blocked retrieval) |
| `resume/exports/<profile>/` | Generated per-profile outputs |
| `resume/exports/data/` | `career.json` (full record) and `resume-profiles.json` (every profile + resolved résumé) |
| `resume/exports/builder/` | Local builder page. Git-ignored |

Schema shape: the career document requires `identity`, `experience`,
`education`, `skills` (plus optional `projects`, `schema_version`). A profile
requires `id`, `label`, `reader`, `allow_unverified`.

## Claim model

A claim is one assertion (`kind`: summary, impact, leadership, strategy, craft,
method, project).

- **Status** is `verified | unverified | rejected`. New claims default to
  `unverified` and stay that way until the human confirms them. `verified`
  requires at least one `sources[]` entry (the validator enforces this).
  `rejected` claims are kept so the wording is not proposed again.
- **Today every claim and education entry is `unverified`.** Nothing is
  verified.
- **Variants:** alternate approved wordings go in `variants[]` (with optional
  `length` and `audience`). Conflicting titles go in `title_variants[]`.
  Contradictory education facts go in `alternates[]`. Never collapse them.
- **Metrics** (`metric.value` / `unit` / `wording`) appear only when a source
  states the measure. `wording` alone is valid. Do not make up numbers.
- **Confidential:** `confidential: true` claims never appear in the
  `public-portfolio` profile or any `reader: ats` profile. No claim is marked
  confidential today.
- **Dates** are `YYYY-MM` or `YYYY`. Year-only means the month is unknown
  (Pyramid Consulting is `"2010"`–`"2011"`); never pad to January.

## Profiles

A profile **selects by id**: roles in display order, claims per role, optional
`variant_id`, `title_variant_id`, `summary_level`, and identity picks
(`headline_id`, `summary_id`, `email_id`, `phone_id`, `location_id`). It also
sets `length_budget` (a bullet cap, not pages), `emphasis`, `skill_priority`,
`required_role_ids`, and `allow_unverified`.

A profile **cannot add employers, metrics, or free-form bullet text.** The
schema has no field for them, and export fails on any id that does not resolve.

- `default-full`: every role (including Pyramid), all eligible claims, phone
  included, budget 100.
- `public-portfolio`: mirrors what `/resume.html` shows today; no phone, budget
  16, Pyramid omitted.

**`public-portfolio` currently has `allow_unverified: true`.** That is a
temporary setting so the live résumé page is not blank while every claim is
unverified. It should go back to `false` once the claims it shows are verified.
`default-full` also has `allow_unverified: true`.

## Export formats

`scripts/export-resume.js` writes, per profile, to `resume/exports/<profile>/`:

| File | Use |
| --- | --- |
| `resume.md` | Markdown, for editing and pasting |
| `resume.txt` | Plain text, for web forms and paste-in boxes |
| `resume.docx` | Word file (minimal OOXML, no dependency) for recruiters who ask for .docx |
| `resume.ats.html` | Single column; only Contact / Summary / Experience / Education / Skills headings; no tables or images |
| `resume.html` | Styled standalone HTML |
| `resume.json` | Resolved render model; the public page reads this |

`scripts/build-resume-pdf.js` (last step of `npm run build`) adds two PDFs:

- `resume/exports/public-portfolio/resume-ats.pdf`: ATS PDF printed from
  `resume.ats.html` (Letter, 0.5in margins). Only for `public-portfolio`.
- `dist/assets/Aaron-Benjamin-Resume.pdf`: print PDF of the styled public
  page `/resume.html`; the page's "Download PDF" link points here. The script
  refuses to write it if the stylesheet did not load.

There is **no separate Workday format.** Use the ATS HTML/PDF, DOCX, or plain
text.

## Commands

| Command | What it does |
| --- | --- |
| `npm run resume:validate` | Schema and rule checks on canonical YAML and every profile. Exits 1 on error |
| `npm run resume:export` | Exports every profile (same as `--all`), then writes `resume/exports/data/` |
| `npm run resume:export -- --profile <id>` | Exports one profile (repeatable; `--profile=<id>` also works). `exports/data/` is written only if every requested profile resolves |
| `npm run resume:builder` | Runs the export, then builds the local builder to `resume/exports/builder/index.html` |
| `npm run build` | Full site: `resume:validate` first (the build stops if it fails), then Sass, `gulp pug` (runs the export, then compiles `src/*.pug` except the builder), images, JS (except the builder script), Eleventy, then both PDFs |

`node scripts/validate-resume.js` also accepts `--root <dir>` and
`--schema-dir <dir>`. The validator's unit tests run with
`node --test scripts/resume-validate.test.js` (not wired to an npm script).

### What validation fails vs. warns

Fails (exit 1):

- Missing canonical file, YAML that won't parse, or schema errors.
- Bad dates, end before start, or `current: true` with an `end`.
- `verified` with zero sources (claims and education, including alternates).
- A metric with neither `value` nor `wording`.
- Duplicate claim ids or duplicate claim text within a role.
- Profile errors: unknown role, claim, variant, title-variant, or identity id.
  Also: selecting a claim twice, selecting a `rejected` claim, selecting an
  unverified claim when `allow_unverified: false`, selecting a confidential
  claim in a public or ATS profile, a missing required role, or more claims
  selected than `length_budget` allows.
- The ATS export, if it already exists, contains `<table>`, `<img>`, or any
  heading other than the five allowed.

Warns (exit 0): overlapping role dates with no `overlap_note` on either role; a
`summary_level` with no matching summary; no profiles found.

## Add or update a role or claim

1. Put any new source file in `resume/sources/inbox/` or record it in
   `resume/sources/notes/`.
2. Edit `resume/canonical/experience.yml`. Give the role or claim a new
   kebab-case `id` (ids are permanent, because profiles reference them). Set
   `status: unverified` and add `sources[]` with `path` and `locator`.
3. Put a different wording of an existing fact in `variants[]`; don't overwrite
   the old text. Add `metric` only if the source states it.
4. To show the claim, add its `claim_id` under the role in a profile. A role
   entry with no `claims` list includes every eligible claim, ordered by
   `emphasis` match.
5. Run `npm run resume:validate`, then `npm run resume:export`. Run validate
   again afterward so the ATS check reads the new files.
6. Run `npm run build` to refresh `/resume.html` and the PDFs.

Only the human changes a status to `verified`, and only with a real source.

## Builder (local only)

`npm run resume:builder` writes `resume/exports/builder/index.html`, which you
open from `file://`. It is excluded from `gulp pug` and `gulp js`, so it is
**not in `dist/`**, and no page links to it. The page embeds `career.json` and
`resume-profiles.json` as inline JSON blocks and makes no network requests.

Controls:

1. **Start from:** pick a profile (defaults to `default-full`), which loads its
   roles, claims, budget, and unverified setting. **Job description** plus
   **Match claims** scores claims against the pasted text using their text,
   `skills`, and `keywords`. It selects only claims that match and puts the
   strongest first within each role. **Reset to profile** undoes this.
2. **Rules:** emphasis-tag filter; length budget (bullets across the résumé,
   filled in role order); **Include unverified claims**. Confidential claims
   are hidden for `public-portfolio` and whenever the reader or format is ATS.
3. **Roles and claims:** role checkboxes; title-variant and role-summary
   selects; per-claim checkbox, wording-variant select, and **Edit text**. Edit
   text flags any number that is not already in that claim's record.
4. **Preview and download:** format (Markdown, plain text, ATS HTML, JSON);
   formatted or file-contents view; **Download**. The preview shows Unverified
   and Edited badges; the downloaded file does not include them.

**Edits never write back to canonical YAML.** Text edits apply only to that
download. To keep a wording, add it as a `variant` in `experience.yml`.

## Tailoring rules

You can tailor a résumé by choosing which claims to include, their order, which
variant to use, the length budget, emphasis tags, and the local job-description
match. All of these pick from existing records. **No person or model may invent
a metric**, an employer, or a claim. If a new fact is needed, it goes into
canonical YAML as `unverified` with a source, and the human confirms it.

## Unresolved facts (human must confirm)

From `resume/sources/notes/reconciliation.md` section 6. All remain unverified.

- **Education:** year 2008 vs 2009 (resume2 says Sept 2008–Nov 2009); campus
  Winter Park, FL vs Orlando, FL; degree "A.S. Graphic Design" vs "Associate of
  Science"; Salutatorian appears only in the 2017 archive.
- **Amazon:** title "UX Designer" vs "User Experience Designer" vs "UX Designer
  II"; end date 2017-12 vs "2016 - Present" (archives written while employed).
- **Amazon newsletter metrics:** archives say >1M sellers, 6 languages, 12
  markets, >32% open rate over 6 months; current YAML keeps only 1M sellers
  and 12 markets.
- **HP team size:** "4 designers and a researcher" vs "3 direct reports". Both
  come from same-era archives.
- **HP product:** "HP Marketing Cloud" vs "HP Aurasma" (AR).
- **AT&T level:** Senior throughout vs "Junior UX Designer → Senior UX
  Designer" (resume2). **$1B wording:** "app-based payments" vs "new revenue
  through the mobile app" vs "payments through the mobile app".
- **Redfin title:** "Senior Product Designer" vs "Senior Product Designer 2".
- **Snap! Mobile start:** 2018-01 (current) vs 2017-01 (resume2). A 2017 start
  would overlap Amazon.
- **Pyramid Consulting:** year-only dates (2010–2011) in every source; months
  are unknown. The role is archive-only.
- **Contact:** location Powder Springs, GA vs "Seattle based" (no source states
  a move); older emails `abenjamin765@gmail.com` and
  `aaronbenjamin@outlook.com` vs current `hello@aaronbenjamin.design`.

**LinkedIn was not ingested.** Every retrieval attempt hit LinkedIn's login wall
or returned 404 (see `resume/sources/notes/linkedin-experience.md`). Aaron says
LinkedIn is his most accurate work history, so it remains the **preferred
work-history source**. The next step is to put a LinkedIn data export in
`resume/sources/inbox/`.

## Phone number and private data

The phone number already exists in `src/assets/data/contact-info.yml`
(`candidatePhone`). `identity.yml` repeats it as `phone-main`. This is not a
new secret. `public-portfolio` sets no `phone_id`, so `/resume.html` does not
show the number. `default-full` exports do include it.

**Do not commit `resume/exports/builder/`.** It embeds the full record: every
email, the phone number, and all unverified claims. It is git-ignored; keep it
that way. `resume/exports/data/career.json` holds the same data. The build
deletes any copy from `dist/assets/data/`, and it must never be published as a
standalone URL.

## Gaps

- **Validator does not check `skill_priority`.** Unknown skill ids fail only at
  export time.
- **ATS check can be stale.** Validation reads whatever `resume.ats.html`
  already exists. If you run it before exporting, it checks the old file.
  `npm run build` validates before `gulp pug` exports, so the build checks
  the previous export, not the one it is about to write.
- **Builder styles ship on the public site.** `dist/assets/style/folio.css`
  includes the builder styles (`.rb-*`).
- **Builder has fewer formats than the export.** It downloads Markdown, text,
  ATS HTML, and JSON only; there is no DOCX, styled HTML, or PDF.
- **ATS PDF only for `public-portfolio`**, and only through `npm run build`,
  not `resume:export`.
- **Other exports are not git-ignored.** Only `resume/exports/builder/` is
  ignored. `resume/exports/data/` and `default-full/` (which include the phone
  and all unverified claims) would be committed, and this repo serves a public
  site. Decide deliberately.
- **No verified claims yet**, so both profiles depend on
  `allow_unverified: true`.
