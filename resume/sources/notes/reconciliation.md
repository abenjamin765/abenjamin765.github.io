# Résumé Source Reconciliation — Aaron Benjamin

Prepared by Scout. This is a research/reconciliation memo, not canonical data. All claim statuses below are **unverified**. Nothing here has been chosen as "correct" — contradictions are listed side by side for the schema/canonical-data owner to resolve.

---

## 1. Source inventory

| Path | What it is | Era (from git history / internal evidence) | Reliability note |
|---|---|---|---|
| `src/assets/data/work-history.yml` | Current site's experience data, consumed by `src/resume.pug` | Live/current (file touched today; content reflects roles through Renaissance Learning, July 2024–Present) | Current site data — highest-currency source, but itself hand-authored prose, not a primary record |
| `src/assets/data/skills.yml` | Current site's focus areas, hard skills, soft skills, tools | Live/current | Current site data |
| `src/assets/data/education.yml` | Current site's single education record | Live/current | Current site data |
| `src/assets/data/contact-info.yml` | Current site's name, title, description, website, LinkedIn, email, phone, location | Live/current | Current site data |
| `src/resume.pug` | Pug template that renders the public `/resume.html` page. Pulls from the four YAML files above but **cherry-picks** which accomplishment bullets show, and contains its own **hardcoded** summary paragraph not sourced from any YAML file (see §2) | Live/current | Reveals what's public-facing vs. full internal data; also a second, independent identity-copy source |
| `archive/resume/index.html` | Standalone static résumé, sidebar layout | Content added 2017‑11‑12, last touched 2018‑01‑14 (git log) | Archive — earliest era, written while Aaron was still at Amazon as "UX Designer II" |
| `archive/resume/index2.html` | Alternate static résumé, different layout (dark intro block, two-column jobs), same repo era | Same commit range as `index.html`: 2017‑11‑12 to 2018‑01‑14 | Archive — same era as `index.html` but **not identical content** (see contradictions below); appears to be an alternate design pass done in parallel |
| `archive/resume/print.html` | Print-oriented CSS variant | Same commit range as `index.html` | Archive — confirmed via diff to share the same HTML content/copy as `index.html` (only CSS differs: flattened print styles, no `@media` blocks). Treated as a duplicate of `index.html` for content purposes; not separately quoted below except where noted |
| `archive/resume2/index.html` | Standalone static résumé, two-column layout with a References section | Added 2018‑07‑15; content updated through 2022‑05‑26 (added Redfin) and 2024‑05‑13 (last substantive edit before a 2025‑09‑02 file move) | Archive — **most recently maintained** archive resume; covers Indeed/Redfin roles, so closest in coverage to current data, but was last edited before Renaissance Learning existed and before Indeed's end date was known (shows "October 2022 – Present") |
| `resume/sources/inbox/` | Drop folder for future source material | N/A | Did not exist before this task; created empty (only `.gitkeep`) |
| `dist/assets/Aaron-Benjamin-Resume.pdf` | Compiled PDF résumé | Unknown | **Unread.** No `pdftotext`, `pdftohtml`, or Python PDF libraries (`PyPDF2`, `pdfminer`, `fitz`) are available in this environment, and installing one would add a dependency, which is out of scope. Flagging for a follow-up pass with proper tooling. |

No files were found in `resume/sources/inbox/` prior to this task (folder did not exist).

---

## 2. Identity and contact

### Name
"Aaron Benjamin" — consistent across every source. No variants found.

### Title / headline
- `src/assets/data/contact-info.yml` → `candidateTitle: "UX Designer"`
- `src/resume.pug` renders `contactInfo.candidateTitle` as the page kicker, **and separately** the site's `<head>` meta description (via `folioHead`) reads: *"Aaron Benjamin is a product designer who leads complex UX work across marketplaces, education, commerce, and internal tools."* — a third, independent characterization ("product designer" vs. "UX Designer"), hardcoded in the template, not sourced from any YAML file.
- `archive/resume/index.html`: `<h2>UX Designer</h2>` — matches current.
- `archive/resume/index2.html`: *"Aaron Benjamin—Senior UX / Product Designer"* — differs from both current and `index.html`.
- `archive/resume2/index.html`: no visible title next to the name; source contains a **commented-out** line `<!-- <p>UX &amp; Product Designer</p> -->` — present in markup but disabled.

### Summary / positioning statement
- `contact-info.yml` → `candidateDescription`: *"For more than 10 years, I've helped global brands design and build products that deliver long-term value to customers and achieve business goals."*
- `archive/resume2/index.html` lead paragraph: *"For more than 10 years, I've helped global brands design and build products that deliver long-term value to customers and achieve business goals."* — **exact match**, indicating this copy has persisted from the 2018–2024 archive resume into the current YAML.
- `src/resume.pug` `.resume-summary` (hardcoded, not from any YAML): *"I lead design for complex product systems, connecting research, shared models, and shipped interfaces. My work spans marketplaces, education, commerce, and internal tools, with a focus on decisions teams can carry through implementation."* — a **different, independent** summary that the public page actually displays instead of `candidateDescription`.
- `archive/resume/index.html` and `print.html` lead paragraph: *"Seattle based UX designer. More than 7 years of experience creating products for customers around the world at companies including AT&T, HP, and Amazon. Skilled at visualizing complex, technical concepts as concrete mockups and prototypes. Exceptional design leadership skills. Able to lead broad-ranging initiatives and projects. Excels at translating customer and business needs into solutions with long-term value."*
- `archive/resume/index2.html`: same paragraph is present but **HTML-commented-out**; replaced with a bullet list: *"More than 7 years of experience building responsive websites and mobile apps for customers around the world."* / *"Able to lead broad-ranging initiatives and projects."* / *"Skilled at visualizing complex, technical concepts as mockups and prototypes."* / *"Experienced designer with background working on Fortune 500 brands."*

### Email
- Current (`contact-info.yml`): `hello@aaronbenjamin.design`
- `archive/resume/index.html`, `print.html`: `abenjamin765@gmail.com`
- `archive/resume/index2.html`: `aaronbenjamin@outlook.com`
- `archive/resume2/index.html`: `hello@aaronbenjamin.design` — matches current; this address appears to have been adopted by 2018–2024, superseding the two 2017/18-era addresses above.

### Phone
Digits are consistent everywhere (7703805566); only formatting differs:
- Current: `(770) 380-5566`
- `archive/resume/index.html`, `print.html`: `770 380 5566` (href `tel:7703805566`)
- `archive/resume/index2.html`: `770.380.5566`
- `archive/resume2/index.html`: `(770) 380-5566` — matches current format.

### Location
- Current (`contact-info.yml`): `Powder Springs, GA`
- `archive/resume/index.html`, `print.html`: no explicit personal location field, but the lead paragraph states *"Seattle based UX designer."*
- `archive/resume/index2.html`: no personal location statement (the "Seattle based" sentence is commented out; see Summary above).
- `archive/resume2/index.html`: no personal "based in" statement; only per-job locations (Seattle, WA for Snap!/Amazon; Atlanta, GA for Home Depot/AT&T; Remote for Indeed/Redfin).

See §6 for this listed explicitly as a contradiction per the requested checklist.

### Links
- Current: website `aaronbenjamin.design`; LinkedIn `https://www.linkedin.com/in/aaronbenjamindesign/`.
- `archive/resume/index.html`, `index2.html`: website link only (`aaronbenjamin.design` / `http://aaronbenjamin.design`); no LinkedIn found.
- `archive/resume2/index.html`: four header links, three of which share the bug of all pointing to `http://aaronbenjamin.design` regardless of link text: `aaronbenjamin.design`, `hello@aaronbenjamin.design` (text only, mailto not used), `(770) 380-5566` (text only, tel not used), and `@perfectKeming` (apparent social handle, platform unstated). No LinkedIn URL appears in any archive source — it appears to be a current-only addition.

---

## 3. Education variants

| Field | `education.yml` (current) | `archive/resume/index.html` | `archive/resume/index2.html` | `archive/resume2/index.html` |
|---|---|---|---|---|
| School name | `FullSail University` (no space) | "Full Sail University" (with space) | "Full Sail University" | "Full Sail University" |
| Location | Winter Park, FL | not stated | not stated | Orlando, Florida |
| Degree wording | (rendered generically; no degree-title field in schema, only school/location/year) | "A.S. Graphic Design" | "A.S. Graphic Design" | "Associate of Science" |
| Year(s) | 2008 (single year) | "2009" + "Salutatorian" | "2009" (no salutatorian) | "September 2008 – November 2009" (explicit range spanning both years) |
| Extra detail | none | "Salutatorian" | *"Classes included Visual Design, Front-end web development, Project management, and User research"* | none |

Notes:
- Exact quote, `index.html`/`print.html`: `<h4>A.S. Graphic Design <span class="light-text">Full Sail University / 2009 Salutatorian</span></h4>`
- Exact quote, `index2.html`: `<h3>2009<span>Full Sail University</span><span>A.S. Graphic Design</span></h3>`
- Exact quote, `resume2/index.html`: `<h3>Associate of Science, Full Sail University, Orlando, Florida</h3>` / `<p class="date">September 2008 – November 2009</p>`
- The current YAML's school name spelling ("FullSail University," no space) differs from every archive's spelling ("Full Sail University," with space, which matches the institution's actual name). Flagging as a spelling variant, not correcting it.

---

## 4. Roles (reverse-chronological per current YAML, then archive-only)

For each role: titles seen · companies · locations · workplace (remote/onsite as stated) · date ranges (normalized to YYYY-MM where a month is given; year-only noted as such) · employment type · team/product mentions · leadership scope · claims (see §5 for full claim text/variants).

### `role-renaissance-learning` — Renaissance Learning
- Titles seen: "Senior UX Designer" (current YAML only)
- Dates: 2024-07 – Present (current YAML only; "Full-time")
- Location: Remote
- No archive source covers this role — it postdates every archive file found.
- Team/product: "Renaissance Intelligence" (K-12 classroom experiences)
- Claims: OOUX championing, AI-assisted prototyping, design system contributions — no metrics attached in current YAML.

### `role-indeed` — Indeed
- Titles seen: "Senior UX Designer" (current YAML and `archive/resume2/index.html` — consistent)
- Dates: current YAML: 2022-10 – 2024-07. `archive/resume2/index.html`: "October 2022 – Present" (i.e., open-ended at time of writing; not a contradiction of the start date, just an earlier snapshot before the end date existed).
- Location: Remote (both sources agree)
- Employment type: "Full-time" (current YAML only; not stated in archive)
- Claims: monetization/growth ownership, 30+ A/B tests, cross-functional UX working group founding, service blueprint — see §5 for wording differences.

### `role-redfin` — Redfin
- Titles seen: current YAML: "Senior Product Designer". `archive/resume2/index.html`: **"Senior Product Designer 2"**
- Dates: 2022-02 – 2022-09 (both sources agree, resume2 gives full months matching current)
- Location: Remote (both agree)
- Claims: research-driven roadmap influence, StrengthsFinder workshops, hiring/onboarding support — wording differs (see §5), not yet verified as identical underlying facts.

### `role-home-depot` — The Home Depot
- Titles seen: "Staff UX Designer" — consistent between current YAML and `archive/resume2/index.html`
- Dates: 2018-10 – 2022-02 — consistent, full months in both sources
- Location: Atlanta, GA — consistent
- Claims: enterprise tool design (merchandising/store systems/HR — current wording) vs. "enterprise vision and strategy (OGSMs/OKRs)" and omni-channel selling for suppliers (resume2 wording); accessibility championing (both, different phrasing).

### `role-snap-mobile` — Snap! Mobile
- Titles seen: current YAML: "Senior Product Designer". `archive/resume2/index.html`: "Senior Product Designer" — consistent title.
- Dates: current YAML: **2018-01 – 2018-10**. `archive/resume2/index.html`: **"January 2017 – October 2018"** — contradiction on start year (2017 vs. 2018); end date agrees.
- Location: Seattle, WA — consistent.
- Claims: agile cross-functional leadership, research practice introduction, design standards, accessibility audits, new business line, mentoring, PWA adoption, cohort analysis across three channels, donation-experience redesign — wording varies but is broadly consistent between the two sources (see §5 for exact quotes on the cohort-analysis and new-business-line claims).

### `role-amazon` — Amazon
- Titles seen: current YAML: **"UX Designer"**. `archive/resume2/index.html`: **"User Experience Designer"**. `archive/resume/index.html`, `index2.html`, `print.html` (2017/18 era): **"UX Designer II"**.
- Dates: current YAML and `archive/resume2/index.html` agree: **2016-08 – 2017-12**. The 2017/18-era archives (`index.html`/`index2.html`/`print.html`) give **"2016 - Present (1 year)"**, i.e., open-ended, written while the role was still active — not a contradiction of the start date, but a different snapshot (see also §6 title/end-date item below).
- Location: Seattle, WA (current YAML and resume2 agree; earliest archives don't state a location for this job specifically, though the page's own "Seattle based" intro implies it).
- Claims: seller-tools design, newsletter launch (see §5 for the multi-source metric variants), workflow automation, mentorship (University of Washington partnership mentioned only in the 2017/18-era archives — see §7).

### `role-hp` — HP Inc.
- Titles seen: current YAML: **"UX Lead"**. `archive/resume/index.html`, `print.html`: **"UX Lead"**. `archive/resume/index2.html`: **"Head of User Experience"**. `archive/resume2/index.html`: **"User Experience Lead"**.
- Dates: current YAML: **2015-09 – 2016-08**. `archive/resume2/index.html`: **"July 2015 – August 2016"** — contradiction on start month (Sep vs. Jul; same year). Earliest archives (`index.html`/`index2.html`/`print.html`): **"2015 - 2016 (1 year)"**, year-only, no month.
- Location: Alpharetta, GA (current YAML and `archive/resume2/index.html` agree; earliest archives don't state a city for this job).
- Team size and product: see §6 (dedicated contradiction item — "four designers + researcher" vs. "three direct reports"; "HP Marketing Cloud" vs. "HP Aurasma").

### `role-att` — AT&T
- Titles seen: current YAML: **"Senior UX Designer"** for the entire span. `archive/resume/index.html`: **"Sr. UX Designer"** for the entire span. `archive/resume/index2.html`: **"Senior UX Designer"** for the entire span. `archive/resume2/index.html`: **"Junior UX Designer → Senior UX Designer"** — a title progression, not a single level.
- Dates: current YAML: **2011-07 – 2015-08**. `archive/resume2/index.html`: **"August 2011 – July 2015"** — contradiction on both start and end month (current starts July/ends August; resume2 starts August/ends July). Earliest archives: **"2011 - 2015 (4 years)"**, year-only.
- Location: Atlanta, GA — consistent across all sources that state a location.
- Claims: see §5/§6 for the $1B wording variants, Connected Car / att.com / iPhone campaign / Lithium-award items.

### `role-pyramid-consulting` — Pyramid Consulting Inc. (archive-only)
- Titles seen: "Graphic Designer" (`archive/resume/index.html`, `print.html` only)
- Dates: "2010 - 2011 (1 year)" — year-only, no month
- Location: not stated
- Not present in `index2.html`, `archive/resume2/index.html`, or the current YAML — see §7.
- Claims: digital-marketing collateral design, HTML prototypes of landing pages, template/style-guide development for product life-cycle events; two ticket-reduction metrics (see §5/§8).

---

## 5. Claims (paraphrase, exact wording, metric flag, sources)

Each entry below is grouped by underlying topic. Where two documents use different wording for what appears to be the same underlying work, they are listed as **variants — not yet verified as the same fact**.

### `claim-amazon-newsletter-reach`
- Paraphrase: Designed and launched the Amazon Seller Newsletter, reaching 1M+ sellers across 12 markets.
- Metric: yes (reach, market count)
- Current YAML quote: *"Launched the Amazon Seller Newsletter, reaching over 1 million sellers across 12 markets."*
- Archive quote (identical in `index.html`, `index2.html`, `print.html`, `resume2/index.html`): *"Responsible for the end-to-end design and launch of the Amazon Seller Newsletter; reaching more than 1 million sellers in 6 different languages across 12 global markets with an open rate consistently above 32% over 6 months."*
- Sources: `src/assets/data/work-history.yml`; `archive/resume/index.html`; `archive/resume/index2.html`; `archive/resume/print.html`; `archive/resume2/index.html`
- Note: the "1 million sellers" and "12 markets" figures agree everywhere they appear. The language count (6) and open rate (>32% over 6 months) appear in every archive but are absent from the current YAML — see §7.

### `claim-amazon-automation-support-volume`
- Paraphrase: Introduced/led design of automated support workflows that reduced contact volume.
- Metric: no (directional claim, no number)
- Current: *"Introduced automation into key support workflows, reducing support volume and improving seller satisfaction."*
- Archive (`index.html`/`index2.html`/`print.html`): *"Led the design of automated workflows that resulted in an increase in seller trust and a decrease in contact volume."*
- Archive (`resume2`): *"Led the design of automated workflows that resulted in an increase in seller trust and a decrease in support contact volume"*
- Status: variants — not yet verified as the same underlying fact (current YAML adds "seller satisfaction," drops "seller trust").

### `claim-amazon-mentorship-scope`
- Paraphrase: Mentored junior team members / supported a mentorship program.
- Metric: no
- Archive (`index.html`/`index2.html`/`print.html`): *"Mentor junior team members. Support the student mentorship program in partnership with The University of Washington."*
- Archive (`resume2`): *"Mentor junior team members and support the student mentorship program"* (university name dropped)
- Current: *"Mentored junior designers and supported Amazon's internal mentorship program."*
- Status: variants — the scope claim shifts from an external University of Washington partnership (earliest archives) to an unspecified "internal" Amazon program (current). Not verified as describing the same program.

### `claim-hp-team-size`
- Paraphrase: Managed/supported a design team at HP.
- Metric: yes (headcount)
- Current: *"Managed and supported a team of four designers and a UX researcher."*
- Archive (`index2.html`): *"Support and develop a team of 4 designers and a researcher."*
- Archive (`resume2`): *"Support and develop a team of 4 designers and a researcher."*
- Archive (`index.html`/`print.html`): *"Oversee design direction, concepts, and implementations while supporting and developing 3 direct reports."*
- Status: **contradiction** — see §6.

### `claim-hp-product`
- Paraphrase: Owned roadmap/resourcing for an HP product.
- Metric: no
- Current: *"Owned design roadmap and team resourcing for HP Marketing Cloud."*
- Archive (`index2.html`): *"Manage resourcing, road-map, and product direction for HP Marketing Cloud."*
- Archive (`resume2`): *"Manage resourcing, roadmap, and product direction for HP Marketing Cloud."*
- Archive (`index.html`/`print.html`): *"Manage resourcing, road-map, and design direction for HP Aurasma, an Augmented Reality (AR) product for marketers and consumers."*
- Status: **contradiction** — see §6.

### `claim-hp-intake-process`
- Paraphrase: Redefined intake/production process, cutting delivery time.
- Metric: yes (45%)
- Current: *"Streamlined intake and production processes, reducing design delivery time by 45%."*
- All archives (identical wording, `index.html`/`index2.html`/`print.html`/`resume2`): *"Redefined intake process, team tool-set, and workflow resulting in a 45% decrease in production time."*
- Status: consistent across all sources on the 45% figure; only phrasing differs.

### `claim-hp-grommet`
- Paraphrase: Contributed to the Grommet design system.
- Metric: no
- Current: *"Contributed to the Grommet design system, enhancing accessibility and reusability across HP products."*
- Archives (`index.html`/`index2.html`/`print.html`/`resume2`, near-identical): *"Drove adoption of Grommet design system across all HP Software products to support company goals around product consistency, accessibility, and performance."* (resume2 wording: *"...targeting product usability, accessibility, and performance."*)
- Status: variants — same design system named consistently; "adoption across HP Software" (archives) vs. "contributed to... across HP products" (current) are not verified as describing identical scope.

### `claim-att-level-progression`
- Paraphrase: Level held at AT&T.
- Metric: no
- Current & earliest archives: single level, "Senior UX Designer" / "Sr. UX Designer," for the full 2011–2015 span.
- `archive/resume2/index.html`: *"Junior UX Designer → Senior UX Designer at AT&T, Atlanta, Georgia"*
- Status: **contradiction** — see §6.

### `claim-att-billpay-metric`
- Paraphrase: Designed mobile bill-pay flow associated with $1B+.
- Metric: yes ($1B+, unit/basis disputed)
- Current: *"Designed the mobile bill-pay flow that drove over $1B in app-based payments."*
- Archive (`index.html`/`index2.html`/`print.html`): *"Designed the mobile bill-pay experience for customers resulting in more than $1 billion in new revenue through the mobile app."*
- Archive (`resume2`): *"Designed the mobile bill-pay experience for customers resulting in more than $1 billion in payments through the mobile app."*
- Status: **contradiction** — see §6. Three distinct wordings across the corpus: "new revenue" (earliest archives), "payments" (resume2), "app-based payments" (current). Revenue and payment volume are not interchangeable financial claims; not verified as the same fact.

### `claim-att-community-forums-award`
- Paraphrase: Redesigned AT&T Community forums, improving CHI score, won an award.
- Metric: partial (CHI score improvement claimed, no number given anywhere)
- Current: *"Redesigned the AT&T Community forums, earning a "Game Changing UX" award and improving CHI scores."*
- Archives (`index.html`/`index2.html`/`print.html`/`resume2`, near-identical): *"Redesign of AT&T Community forums increased Community Health Index (CHI) score and won an award for "Game Changing UX" from Lithium"*
- Status: consistent claim; current YAML drops the "from Lithium" attribution but otherwise matches. **Not** archive-only, contrary to what might be assumed — see §6 note.

### `claim-att-connected-car` (archive-only)
- Quote (`index.html`/`index2.html`/`print.html`): *"Contribute to the AT&amp;T Connected Car in-car UI design system."*
- Metric: no. Not present in `resume2` or current YAML.

### `claim-att-attcom-redesign` (archive-only)
- Quote (`index.html`/`index2.html`/`print.html`): *"Lead the redesign of att.com search, contact us, and home page."* and achievement: *"Redesigned the att.com search UI and taxonomy resulting in higher accuracy of search results."*
- Metric: qualitative ("higher accuracy") only. Not present in `resume2` or current YAML.

### `claim-att-iphone-campaigns` (archive-only, but present in all four archive documents)
- Quote (identical in `index.html`/`index2.html`/`print.html`/`resume2`): *"Successfully launched campaign elements for the iPhone 4, iPhone 4s, and iPhone 5, resulting in record breaking sales."*
- Metric: qualitative ("record breaking") only. Absent from current YAML.

### `claim-att-design-roundtable` (archive-only, 2017/18-era only)
- Quote (`index.html`/`index2.html`/`print.html`): *"Lead the bi-weekly "design round-table" meeting to open design communication across the company."*
- Metric: no. Not present in `resume2` or current YAML.

### `claim-redfin-title-variant`
- Current: "Senior Product Designer"
- `archive/resume2/index.html`: "Senior Product Designer 2"
- Status: **contradiction** — see §6.

### `claim-indeed-ab-tests`
- Paraphrase: Ran 30+ A/B tests generating revenue/cost savings.
- Metric: yes (30+)
- Current: *"Generated new revenue streams and cost savings by designing and analyzing over 30 A/B tests for employer monetization initiatives."*
- Archive (`resume2`): *"Led the design and execution of more than 30 A/B tests that created new revenue and cost savings"*
- Status: consistent on the "30+" figure; phrasing differs slightly ("designing and analyzing" vs. "design and execution").

### `claim-snap-cohort-analysis`
- Paraphrase: Customer cohort analysis across channels.
- Metric: yes (3 channels)
- Current: *"Led a customer cohort analysis across three channels, informing roadmap direction."*
- Archive (`resume2`): *"Completed customer cohort analysis across 3 product channels that informed product direction"*
- Status: consistent on "3 channels."

### `claim-pyramid-ticket-reduction` (archive-only)
- Paraphrase: Automation/CSS-button advocacy eliminated recurring support tickets.
- Metric: yes (two separate figures)
- Quote (`index.html`/`print.html`): *"Automated the production of web-ready device images resulting in the elimination of more than 240 tickets per year."* and *"Advocated for the replacement of graphic buttons with CSS buttons across all digital properties. Eliminated more than 1000 tickets per year."*
- Status: only source for this role; no corroborating document exists since the role itself is archive-only (see §7).

---

## 6. Contradiction list

1. **Education year: 2008 vs. 2009.** Current `education.yml`: `2008`. `archive/resume/index.html` & `print.html`: *"Full Sail University / 2009 Salutatorian"*. `archive/resume/index2.html`: *"2009 ... Full Sail University"*. `archive/resume2/index.html`: *"September 2008 – November 2009"* (spans both years).

2. **Education location: Winter Park vs. Orlando.** Current: `Winter Park, FL`. `archive/resume2/index.html`: *"Full Sail University, Orlando, Florida"*. The two earliest archives don't state a location.

3. **Education degree wording.** Current schema has no separate degree-title field. `archive/resume/index.html`/`index2.html`: *"A.S. Graphic Design"*. `archive/resume2/index.html`: *"Associate of Science"* (no discipline named).

4. **Salutatorian.** Claimed only in `archive/resume/index.html` and `print.html`: *"Full Sail University / 2009 Salutatorian"*. Absent from `index2.html`, `resume2`, and current YAML.

5. **Amazon title and end date.** Current: *"UX Designer"*, 2016-08–2017-12. `archive/resume2/index.html`: *"User Experience Designer"*, same dates. `archive/resume/index.html`/`index2.html`/`print.html` (written while the role was current): *"UX Designer II"*, *"2016 - Present (1 year)"*.

6. **Amazon newsletter metrics.** All four archive documents state: *"reaching more than 1 million sellers in 6 different languages across 12 global markets with an open rate consistently above 32% over 6 months."* Current YAML states only: *"reaching over 1 million sellers across 12 markets"* — no language count, no open-rate figure.

7. **HP team size.** `archive/resume/index2.html` and `archive/resume2/index.html`: *"a team of 4 designers and a researcher"* (matches current YAML's *"four designers and a UX researcher"*). `archive/resume/index.html` and `print.html` — from the **same commit era** as `index2.html` — instead say: *"supporting and developing 3 direct reports."* This is a contradiction between two archive documents of the same vintage, not just between archive and current.

8. **HP product.** `archive/resume/index2.html`, `archive/resume2/index.html`, and current YAML all name **"HP Marketing Cloud."** `archive/resume/index.html` and `print.html` — again, same era as `index2.html` — instead name **"HP Aurasma, an Augmented Reality (AR) product for marketers and consumers."**

9. **AT&T level.** Current YAML, `archive/resume/index.html`, and `index2.html` all show a single level ("Senior UX Designer" / "Sr. UX Designer") across the full 2011–2015 span. `archive/resume2/index.html` instead shows: *"Junior UX Designer → Senior UX Designer at AT&T, Atlanta, Georgia."*

10. **AT&T $1B wording.** Current: *"drove over $1B in app-based payments."* `archive/resume/index.html`/`index2.html`/`print.html`: *"more than $1 billion in new revenue through the mobile app."* `archive/resume2/index.html`: *"more than $1 billion in payments through the mobile app."*

11. **AT&T archive-only claims** (not in current YAML): Connected Car in-car UI design system contribution; att.com search/contact-us/home-page redesign (with its own accuracy claim); iPhone 4/4s/5 campaign launches ("record breaking sales" — present in *all four* archive documents, including `resume2`, but absent from current); bi-weekly "design round-table" meeting (2017/18-era archives only). The "Game Changing UX"/Lithium/CHI claim is **not** archive-only — current YAML retains it (minus the "from Lithium" attribution) — flagging this since the task prompt suggested checking whether it was dropped.

12. **Redfin title with/without "2."** Current: *"Senior Product Designer."* `archive/resume2/index.html`: *"Senior Product Designer 2 at Redfin, Remote."*

13. **Contact emails.** Current & `archive/resume2/index.html`: `hello@aaronbenjamin.design`. `archive/resume/index.html`/`print.html`: `abenjamin765@gmail.com`. `archive/resume/index2.html`: `aaronbenjamin@outlook.com`.

14. **Seattle vs. Powder Springs.** `archive/resume/index.html` and `print.html` open with *"Seattle based UX designer."* Current `contact-info.yml` states `candidateLocation: "Powder Springs, GA"`. `archive/resume/index2.html` and `archive/resume2/index.html` state no personal base location at all (only per-job locations). Not necessarily inconsistent if read as a relocation over time, but the sources never state that explicitly — no source describes a move.

---

## 7. Claims present only in archives (dropped from current YAML)

- Amazon newsletter: language count (6) and open rate (>32% over 6 months) — all archives; current YAML keeps only reach + market count.
- Amazon: University of Washington student-mentorship partnership (2017/18-era archives only; `resume2` and current both generalize to an unnamed/"internal" program).
- HP: "Lead application modeling sessions to visualize product requirements." (`index.html`/`print.html` only)
- HP: "Conduct user research studies to inform product direction." (`index.html`/`print.html` only)
- HP: "Organize workshops for team development." (`index.html`/`print.html` only)
- HP: Aurasma/AR product identification (`index.html`/`print.html` only — superseded by "Marketing Cloud" elsewhere)
- HP: "3 direct reports" framing (`index.html`/`print.html` only — superseded by "4 designers + researcher" elsewhere)
- AT&T: Connected Car contribution, att.com redesign, iPhone campaign launches, bi-weekly design round-table meeting (see §6 item 11 for exact scope of which archive documents carry each)
- AT&T: "new revenue" framing for the $1B claim (earliest archives only)
- AT&T: Junior → Senior title progression (`resume2` only)
- Entire **Pyramid Consulting Inc.** role — "Graphic Designer," 2010–2011 — present only in `archive/resume/index.html` and `print.html`. Not in `index2.html` (same era), not in `resume2`, not in current YAML.
- Education: "Salutatorian" honor; Orlando, FL location; explicit Sept 2008–Nov 2009 date range (each dropped in at least one later source, none carried into current YAML).
- Contact: References section — four named professional references with personal emails/phones (`archive/resume2/index.html` only). Not reproduced verbatim here beyond noting its existence, since it concerns third parties' personal contact details rather than Aaron's own résumé facts; the raw file is available at `archive/resume2/index.html` if needed.
- Contact: Twitter/X-style handle `@perfectKeming` (`resume2` only).
- Redfin: the "2" suffix on the title (`resume2` only).
- Snap! Mobile: "January 2017" start date (`resume2` only — see §6-adjacent note under §4, this is a genuine date conflict, not merely a drop, since current YAML asserts "January 2018").

---

## 8. Missing data

- **No month given** for: HP UX Lead dates in `index.html`/`index2.html`/`print.html` ("2015 - 2016"); AT&T dates in the same three files ("2011 - 2015"); Amazon start date in the same three files ("2016 - Present"); Pyramid Consulting dates in `index.html`/`print.html` ("2010 - 2011"). Do not infer months for these.
- **No metric** attached to most Renaissance Learning bullets, most Home Depot bullets, and several Indeed/Snap!/HP descriptive (non-achievement) bullets in every source. Left as qualitative claims.
- **Unclear/unverifiable scope**: the two Pyramid Consulting ticket-reduction figures (240/year, 1000/year) have only one source document each and no corroborating file, since the entire role is archive-only.
- **Employment type ("Full-time") values** in current `work-history.yml` are not corroborated or contradicted by any archive document — no archive states an employment type field at all. Noting as uncorroborated, not contradicted.
- **Renaissance Learning** has zero archive corroboration for any field (title, dates, location, claims) — it postdates every archive source found in this pass.
- **`dist/assets/Aaron-Benjamin-Resume.pdf`** — entirely unread; could contain additional variants or corroborating/contradicting data not captured here.
- **Basis of relocation** (Seattle → Georgia) is never stated by any source; only inferable from job locations and the "Seattle based" vs. "Powder Springs, GA" snapshots (see §6 item 14).

---

## 9. Suggested stable IDs (all statuses: **unverified**)

### Role IDs
- `role-renaissance-learning-senior-ux-designer`
- `role-indeed-senior-ux-designer`
- `role-redfin-senior-product-designer`
- `role-home-depot-staff-ux-designer`
- `role-snap-mobile-senior-product-designer`
- `role-amazon-ux-designer`
- `role-hp-ux-lead`
- `role-att-senior-ux-designer`
- `role-pyramid-consulting-graphic-designer` (archive-only)

### Claim IDs
- `claim-amazon-newsletter-reach`
- `claim-amazon-automation-support-volume`
- `claim-amazon-mentorship-scope`
- `claim-hp-team-size`
- `claim-hp-product`
- `claim-hp-intake-process`
- `claim-hp-grommet`
- `claim-att-level-progression`
- `claim-att-billpay-metric`
- `claim-att-community-forums-award`
- `claim-att-connected-car`
- `claim-att-attcom-redesign`
- `claim-att-iphone-campaigns`
- `claim-att-design-roundtable`
- `claim-redfin-title-variant`
- `claim-indeed-ab-tests`
- `claim-snap-cohort-analysis`
- `claim-pyramid-ticket-reduction`
- `claim-education-year`
- `claim-education-location`
- `claim-education-degree-wording`
- `claim-education-salutatorian`
- `claim-contact-email-variant`
- `claim-contact-location-variant`
- `claim-identity-title-variant`
- `claim-identity-summary-variant`

All claim and role IDs above are proposals only, for a later agent to load and adjudicate; none have been marked verified or rejected.
