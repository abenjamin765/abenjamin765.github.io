# Portfolio conventions and observed learning

Scope: this repository's `/newsite` portfolio. These are local conventions drawn from the user's reviews, not rules for unrelated products.

## Start with existing examples

- `newsite/narrative.css`: floating process captions, object nodes, shared type/color roles, grid wells.
- `newsite/shapes.html` and `newsite/shapes.css`: Product representations, state mapping, workspace wireframes, and the corrected fan-out.
- `newsite/assets/process/`: existing vector connectors and semantic icons. Reuse where their geometry fits; do not stretch an asset until its endpoints only approximately match.

## Visual vocabulary

Warm paper background, Helvetica Neue, restrained ink and red accents, pale 13px grids, white object surfaces, thin gray connectors. Read actual CSS variables and nearby examples instead of copying this description as hardcoded tokens.

Use the floating red-label caption for a distinct layer or idea. A real object or grouped representation can have a surface; an ordinary paragraph does not need a card. Keep readable prose narrower than large diagrams.

## User feedback that should persist

- Connect every line to something visible. Apparent proximity is not a connection.
- Peer descriptions should fit one line at desktop widths when natural layout permits; do not enforce nowrap at every size.
- Center the Shopper / discover, Merchant / maintain, and Shopper / review headers in the representation comparison, while retaining natural alignment within the sample interfaces.
- Use “UI elements” for the reference category, not “UI ingredients.”
- Captions should explain the idea confidently. Avoid repeated “illustrative,” “conceptual,” or “not a screenshot” caveats around figures. Keep factual development status in concise project metadata and do not invent results.
- The Shapes story no longer has a left column of section labels or a section-link strip.
- For the workspace wireframe, one library tree and one focused document worked better than three columns of scattered headings. Attributes and references use aligned tables. State mappings and action contracts explain a task rather than just displaying an inventory.

## Regression worth preserving

At the reported 949px viewport, a bus drawn at 16.66% of the grid missed stems centered on cards separated by 16px gaps. See `connector-patterns.md`. Test the current diagram at 949px as well as wide and phone sizes.

Do not treat the repeated local browser-navigation timeout as a product defect. Inspect whether the preview server or browser is stalled before changing the site. Read-only local-file rendering is useful for isolating static layout, but it does not verify HTTP routing or a deployment.
