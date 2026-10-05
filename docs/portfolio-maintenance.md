# Portfolio maintenance

## Case-study structure

`src/includes/folio-shared.pug` provides the shared case hero, responsive figures, and closing invitation. Keep each opening in the order introduction, hero media, facts. `src/includes/project-catalog.pug` owns case titles, routes, and the next-story sequence; update it when adding or renaming a project.

## Responsive images

Preserve the original files and their provenance. Run `npm run images:variants` with Python 3 and Pillow installed after adding or changing image assets. The script makes WebP delivery variants without cropping, preserves transparency, and regenerates `src/includes/image-variants.pug` and `src/assets/data/image-variants.json`. Shared figures and cards consume the generated source sets. Copy images with the site's normal image task when preparing a build.

Publication permits image formats only under the image output tree. Prompt records, source notes, logs, and operating-system sidecars remain outside published assets. Do not remove historic originals simply because they are absent from the current page.

## Embedded catalog

See `src/prototypes/green-loom/README.md` for rebuilding the standalone snapshot from the local Green Loom app. Ordinary site builds reuse the checked-in prototype. Deliberate rebuilds record upstream source hashes and require desktop/mobile inspection and `npm run test:green`.

## Verification

Build Pug and Sass, then build Eleventy. Run `npm test` and `npm run test:green` with the local preview running. The portfolio checks cover responsive fit, shared reading order and next links, image candidate existence, published sidecars, and the markdown interaction. These checks do not validate the production Green Loom application.
