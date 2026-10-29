# Nine-case editorial tightening scorecards

October 25, 2026. Baseline recorded before this revision, separately from the migration scorecards. Source snapshots: `/private/tmp/case-tightening-baseline-2026-10-25/`. Assessment by the implementing agent, not an independent review or hiring prediction.

Rubric: [case-study-rubric](../../../newsite/research/case-study-rubric.md). O=orientation (10), W=ownership (15), J=judgment (20), E=evidence (15), C=craft (15), R=consequences/credibility (15), N=narrative (10). Scores 0–4; weighted sum = weight × score / 4. Target ≥80, all ≥2, W/J/R ≥3. Functional and unsupported-claim blockers override totals.

## Baseline

| Case | O | W | J | E | C | R | N | Total |
|---|---:|---:|---:|---:|---:|---:|---:|---:|
| Classroom | 3 | 4 | 4 | 3 | 3 | 3 | 2 | 81.25 |
| Curbside Pickup | 3 | 3 | 4 | 3 | 3 | 3 | 3 | 80.0 |
| Price Adjustments | 3 | 3 | 4 | 3 | 4 | 3 | 2 | 81.25 |
| Green Loom | 3 | 3 | 4 | 3 | 4 | 3 | 2 | 81.25 |
| UX MEOW | 3 | 4 | 4 | 3 | 3 | 3 | 2 | 81.25 |
| Amazon First Claim | 3 | 4 | 4 | 3 | 3 | 3 | 2 | 81.25 |
| Design Dash | 3 | 3 | 4 | 3 | 3 | 3 | 2 | 77.5 |
| Many Hats | 3 | 3 | 4 | 3 | 3 | 3 | 2 | 77.5 |
| Shapes | 3 | 4 | 4 | 2 | 4 | 3 | 3 | 83.75 |

## Final

Re-scored after source inspection, heading/skim review, and browser verification. Only Narrative rises where the implementation now supports scanning without repeated caveats. No new research, outcomes, ownership, or craft evidence was added; those scores stay unchanged. Curbside and Shapes retain their previous totals.

| Case | O | W | J | E | C | R | N | Total |
|---|---:|---:|---:|---:|---:|---:|---:|---:|
| Classroom | 3 | 4 | 4 | 3 | 3 | 3 | 3 | 83.75 |
| Curbside Pickup | 3 | 3 | 4 | 3 | 3 | 3 | 3 | 80.0 |
| Price Adjustments | 3 | 3 | 4 | 3 | 4 | 3 | 3 | 83.75 |
| Green Loom | 3 | 3 | 4 | 3 | 4 | 3 | 3 | 83.75 |
| UX MEOW | 3 | 4 | 4 | 3 | 3 | 3 | 3 | 83.75 |
| Amazon First Claim | 3 | 4 | 4 | 3 | 3 | 3 | 3 | 83.75 |
| Design Dash | 3 | 3 | 4 | 3 | 3 | 3 | 3 | 80.0 |
| Many Hats | 3 | 3 | 4 | 3 | 3 | 3 | 3 | 80.0 |
| Shapes | 3 | 4 | 4 | 2 | 4 | 3 | 3 | 83.75 |

All nine meet the numerical editorial target with no functional blocker found in this pass. This is an implementing-agent assessment, not a new independent review. Test coverage is described in the [verification report](case-study-tightening-verification-2026-10-25.md).

## Case evidence and unresolved gaps

### Classroom

- Baseline: three chapter rails, hero jump link, repeated learning-impact qualification, and overlapping before-state captions interrupted a strong existing decision trail.
- Revision: retained the count → urgency → student identity → API/workshop sequence; combined the ten-teacher research description with the finding; shortened the outcome to delivery and 60-day report-exit behavior.
- Final support: “Start with urgency. Then show who.” plus the API/student-ID and pre-filtering passages support W4/J4. Original count, wireframe, and shared model remain; sample student data is visible beside the cover. N3 reflects clear headings and one outcome account.
- Remaining gap: adoption magnitudes are confidential. Existing hub behavior and qualitative findings remain the evidence; no student-learning result is claimed.

### Curbside Pickup

- Baseline: narrative already strong; redundant captions and a separate result caveat added friction.
- Revision: connected Wi-Fi/login constraints to the email alternative; preserved the app-download tradeoff, email, and all notification states. Scoped the outcome once to reported 50-store/60-day results.
- Final support: channel-access decision and stakeholder-backed pilot support J4; ETA/check-in artifact and success/failure/progress states support C3. Pilot population, comparative pickup-switch rates, and ETA timing remain intact, supporting R3. N stays 3.
- Remaining gap: retrospective presentation results do not separate communications from operations; the combined pilot scope remains explicit. Redacted source percentages stay omitted.

### Price Adjustments

- Baseline: four chapters separated overlapping controls and interaction setup; the demo introduction and outcome repeated what was not measured.
- Revision: three chapters cover context-preserving form factor, business rules, and working interaction. The observed-workaround image is available in supporting detail. The demo has one sample-data/reconstruction label.
- Final support: 12-store discovery and comparison of modals/fly-outs/inline/pages support J4/E3; apply/update/remove, visible calculations, static alternative, and working guard support C4. Rollout and directional 30/60/90-day reports support R3. N3 reflects the clearer progression.
- Remaining gap: the sample demonstration covers item-level markdowns and blocks >$50; the historical manager handoff and whole-order paths are described, not implemented as a full store system. No numeric time, shrink, or SUS magnitude is supplied.

### Green Loom

- Baseline: five chapters repeated product/record distinctions; generated illustrations and multiple legal/status caveats competed with original wireframes.
- Revision: four chapters lead with the evidence-lifecycle decision. Original evidence/stock wireframes and the stock demonstration are prominent; the generated record model and workflow illustration use disclosures.
- Final support: expiry blocks a Listing while retaining Product, explicit Product/Variant/Listing/Inventory/Lab Result boundaries, guided-versus-direct navigation, and separate exchange contract support J4. Original wireframes, readable transcription, and preserved stock controls support C4. Completed COA import/publication checks are supported by author confirmation.
- Remaining gap: operator testing and retailer deployment remain future evidence. Historical Georgia launch constraints are scoped to the project; the copy makes no present-day legal certification claim. N3 does not raise E or R.

### UX MEOW

- Baseline: opportunity and learning priority overlapped; the program account repeatedly qualified reconstructions, launches, and shared outcomes.
- Revision: merged setup and priority, followed with check-ins and returning-mentor growth. Preserved the approved mascot, program model, and reconstructed mentor prompts.
- Final support: first-person co-founder/training/workshop/project-sourcing work and named partner functions support W4. Protecting learning under delivery pressure and prompting uncertainty support J4. Six-to-sixteen-team growth and three UX transitions keep shared attribution in the result paragraph. N3 reflects reduced repetition.
- Remaining gap: reconstructed prompts are not original training sheets; program outcomes do not quantify mentoring proficiency. No new participant scenes or quotations were created.

### Amazon First Claim

- Baseline: ownership, policy authority, reconstruction, and eligibility qualifications appeared in several places; the refund trend diluted the central result.
- Revision: retained three chapters; integrated strict under-$50 eligibility and shared policy/funding responsibility into the proposal. Moved the 30% YoY trend into supporting detail.
- Final support: 250-contact analysis and seller interviews connect to tenets and four email jobs; author-confirmed coverage advocacy and cross-functional feasibility support W4/J4. Results retain 88% of email openers, 14% A-to-z support-call reduction, and the 60-day U.S. window, explicitly as presentation-reported program results.
- Remaining gap: these historical presentation results remain unverified in the career record and are not promoted to verified metrics. Specific eligibility exclusions were not supplied and remain unspecified. The combined coverage/communication scope stays visible. N3 reflects integrating these facts instead of repeating disclaimers.

### Design Dash

- Baseline: a real SONAR decision episode was present, but generic planning setup, repeated fictional-example warnings, and a separate method tutorial diluted it.
- Revision: shortened the opening and retained SONAR directly after it; kept model and traceable-handoff chapters. Moved Object Guide imagery, alternate example states, phases, adapters, and review tiers into supporting disclosures. All existing images remain available.
- Final support: changed prediction language, viewing-prior selection, and Inspector Canvas alternatives support J4/E3. A coherent fictional Tool/Loan example explains the connected artifacts. SONAR use and Renaissance workshop output replace repeated intended-benefit paragraphs. N3 raises the total to 80.
- Remaining gap: independent handoff evaluation and comparative effectiveness remain proposed. Author use and inspectable records are evidence of application, not general validation.

### Many Hats

- Baseline: five opening paragraphs repeated the delegation problem; caveats appeared after diagrams, the fictional demonstration, and the status account.
- Revision: led with the generalist-handoff bottleneck, retained two architectural decisions, kept one labeled Library Holds trail, and consolidated real author use. Implementation scale and adapters remain supporting detail.
- Final support: role/project separation and independent critique retain alternatives and coordination cost (J4). The challenge → smaller scope → human decision trail substantiates the review contract. Personal observations are explicitly first-person experience; they are not presented as benchmark gains. N3 raises the total to 80.
- Remaining gap: broader adoption and independent effectiveness are not established. The contributor-handoff evaluation remains next work; fictional Library Holds is labeled visibly.

### Shapes

- Baseline: already centered and visually coherent, but some prose repeated diagrams and the planned-test introduction read as a disclaimer.
- Revision: shortened the availability premise and shared-definition tradeoff, removed the repeated workspace takeaway, and tightened the existing combined authoring/maintenance chapter. Kept every diagram and the glossary. Planned testing now starts with “Next, I’ll test…”.
- Final support: shared identity versus contextual representations, documentation/pattern/standard adoption, reviewed authoring, and maintenance triggers retain W4/J4/C4. The Product → card → action → flow path remains inspectable. N remains 3.
- Remaining gap: no completed participant validation or adoption evidence was added. E remains 2 and total remains 83.75. The development/concept stage is visible in the fact sheet.
