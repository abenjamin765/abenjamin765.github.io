# Green Loom portfolio prototype

Embeds the Retail Admin CatalogPanel, CatalogDetailMain, UI primitives, app tokens, and DEMO_CATALOG_PRODUCTS from the local Green Loom Retail app. The Next Link adapter keeps selection inside the example. Stock commands update isolated React state; no auth, database, API requests, or production records are used. Other write capabilities are disabled.

Build with `node scripts/build-green-prototype.mjs`. Requires the existing app dependencies in ~/Sites/greenloom/retail/apps/retail-admin (override with GREEN_LOOM_APP). Committed standalone assets support the portfolio preview without running Retail. The build snapshots the current local component code; it does not modify Green Loom.

The mobile layout pivots from the list to the selected detail, with a back control. A stock save remounts detail using the active tab so on-hand and available remain consistent with the list.

Expanded portfolio-only sample data contains 15 products. Six AI-generated transparent category images replace the source app's repeated sample image. Build-only transforms expose each sample's imageUrl in CatalogPanel and the Product gallery; the original Green Loom app stays unchanged. Products of the same form share its category photo.

## Upstream dependency and snapshot boundary

The rebuild reads the current local Retail Admin checkout and its installed dependencies. It is not pinned to an upstream commit or dependency lockfile in this portfolio. A different local app revision can change the generated interface or break the build-only transforms, which target specific component source strings.

The portfolio stores the resulting standalone `index.html`, `prototype.js`, and `prototype.css` under this directory. Its regular site build copies these snapshots through Eleventy; it does not rebuild Retail Admin. Keep the existing snapshots usable until a deliberate rebuild has been inspected.

After a deliberate rebuild, record the upstream commit and any uncommitted component changes in the review, inspect both desktop and mobile behavior, and run `node scripts/test-green-prototype.js`. That check covers the sample catalog, stock consistency, reset, empty-search recovery, publication filters, mobile return path, responsive fit, and runtime errors. It does not validate the production application, COA import, legal compliance, or the complete publication workflow.

The build writes `upstream-snapshot.json` with the local upstream commit, dirty state, and SHA-256 hashes of the component inputs. Required source substitutions fail explicitly if upstream code no longer matches, so a changed adapter cannot silently produce an incomplete prototype. This records provenance; it does not pin the upstream checkout.

## Portfolio accessibility layer

`polish.css` is a separate stylesheet loaded after the generated application CSS. It supplies embed spacing, readable secondary colors, visible focus, and reduced-motion treatment without changing the upstream app. The portfolio wrapper restores the stock adjustment launch control when the controlled dialog closes, including after a stock-save remount. This wrapper change was deliberately rebuilt and verified against the recorded upstream component hashes.

Run `npm run test:prototype-a11y` after changing presentation or dialog handling. These checks inspect settled states, avoiding false contrast readings during fades. They complement, rather than replace, manual assistive-technology review.
