# Curbside: HTML email and illustration correction

October 26, 2026. Local `/newsite` update from four browser comments.

Replaced the pickup-email explanatory raster with responsive, selectable HTML. The email body, selected pickup method/store, ETA choices, arrival action, location, help, and three numbered design callouts are separate elements. Desktop places the callouts alongside the email; narrow layouts stack them below. The existing local Home Depot wordmark remains an image; the car graphic is inline SVG and the location map is a decorative CSS schematic. ETA and support elements are a static design exhibit, with no real check-in or store-contact behavior.

Removed the app-notification and service-illustration captions. The notification image remains. Corrected the central customer's hand anatomy in the service illustration, using a mounted phone and a right hand on the steering wheel while the left supports her cheek. The six-scene narrative and text remain intact. The previous image is retained as an unused sibling asset.

## Verification

Focused email checks passed at 320, 390, 768, 949, and 1440px: no page overflow, zero reported WCAG-tagged axe violations, enlarged-text reflow, and content available without JavaScript. Desktop and mobile screenshots were visually inspected. The ten-case collection checks also passed at all five widths, including images, navigation, keyboard disclosures, enlarged text, reduced motion, and no-JavaScript reflow. The reusable disclosure check now verifies toggling from either initial state, accommodating the restored Classroom prototype’s open groups. Results are saved alongside the focused evidence.

Evidence: [HTML email review](/Users/aaron/Documents/ChatGPT/portfolio/output/curbside-html-2026-10-26/results.json), [desktop email](/Users/aaron/Documents/ChatGPT/portfolio/output/curbside-html-2026-10-26/email-1440.png), [mobile email](/Users/aaron/Documents/ChatGPT/portfolio/output/curbside-html-2026-10-26/email-390.png), [collection results](/Users/aaron/Documents/ChatGPT/portfolio/output/curbside-html-2026-10-26/collection/results.json).

## Image-generation record

Used the built-in image-generation tool for the localized raster edit. Final asset: [two-sides-of-the-same-wait-v3.png](/Users/aaron/Sites/abenjamin765.github.io/newsite/assets/img/folio/project--curbside-pickup/two-sides-of-the-same-wait-v3.png). Original output is retained at `/Users/aaron/.codex/generated_images/01a169b4-c07f-7672-89ab-9763d86d2e91/exec-df8f1c7d-e0cd-425f-81ed-e5ce8eff65b8.png`.

Final prompt, using the preceding edited image as the edit target:

> Make a precise localized pose correction ONLY in the TOP CENTER 'Wait' panel. The phone hand still has ambiguous anatomy. REMOVE the hand holding the phone entirely. Put that phone into a clearly visible DASHBOARD PHONE MOUNT at the right of the steering wheel. The woman has exactly TWO visible hands: her LEFT hand remains resting against her cheek at the right side of her face in the image; her RIGHT hand comes from her right shoulder on the LEFT SIDE OF THE IMAGE and rests naturally on the LEFT SIDE of the steering wheel. The right arm should be visibly continuous from her viewer-left shoulder down to that hand. No hand touches the phone. Do not cross the arms. Leave her face, hair and expression unchanged. Preserve ALL other content and typography and layout exactly: all six scenes, headings, thought bubble 'Do they know I’m here?', labels, arrows, orange no-confirmation annotation, store staff, warm sketch style and paper. Only change that woman's right arm/hand and phone mounting in the top-center scene.

No project metrics, quotations, or outcome claims were changed. No publication performed.

## Follow-up: generated car and Homer icons

Replaced the inline car drawing and headset symbol with two generated transparent PNGs, using the original pickup-email image as a style/subject reference. Generated with the built-in image-generation tool; both original outputs remain in the generated-images directory. Copied the final files unchanged into the project:

- [pickup-car-icon-v1.png](/Users/aaron/Sites/abenjamin765.github.io/newsite/assets/img/folio/project--curbside-pickup/pickup-car-icon-v1.png), 1536 × 1024. Original: `exec-92a744d9-1fe5-44cd-8833-abe1959852a1.png`.
- [homer-support-icon-v1.png](/Users/aaron/Sites/abenjamin765.github.io/newsite/assets/img/folio/project--curbside-pickup/homer-support-icon-v1.png), 1254 × 1254. Original: `exec-603c8db4-498b-47cf-be4d-edc81cf2fd3e.png`.

Both files have verified transparent alpha. They are decorative beside their existing text, with empty alt attributes. The car displays at 140px wide and Homer at 72px, with their intrinsic proportions preserved. Desktop and mobile renders inspected; five-width layout, automated accessibility, enlarged-text, and no-JavaScript checks passed again. The existing evidence screenshots and focused result file were refreshed.

Car final prompt:

> Generate one standalone transparent PNG asset for a retail pickup email. Use ONLY the small car illustration near the upper middle of the supplied image as reference. Recreate that small illustration at high resolution: straight rear view of a compact white/light-gray hatchback with trunk raised, two tan cardboard packages visible in the trunk, dark charcoal outlines, tiny orange rear lights, dark tires. An orange map-location pin with white center stands just to the right of the car. A short thin dark baseline beneath car and pin. Flat friendly 2D vector-like email illustration, smooth precise outlines, restrained pale blue-gray vehicle shading, Home Depot orange accent. Center the complete car and pin tightly with about 6% transparent margin. Wide aspect around 3:2. No surrounding email, words, logos, heading, borders, white rectangle, shadows, or other objects. Background must be genuinely transparent.

Homer final prompt:

> Generate one standalone transparent PNG icon asset of Homer, The Home Depot's friendly illustrated support mascot, for the 'Need help?' area of the pickup email. The small mascot near the bottom of the supplied reference is the exact style/subject reference, not the whole image. Draw only his smiling head and orange Home Depot cap, facing forward: warm golden skin, simple friendly cartoon face with broad rounded nose, dark charcoal outlines, orange work cap with a small white rectangular Home Depot logo patch on the front, and a dark customer-support headset with microphone at the cheek. Flat 2D vector-like illustration with clean smooth outlines and very subtle simple shading, matching the email's small original mascot. Keep the character compact and recognizable at 56–64px displayed size. Center the complete head, cap and headset with about 6% transparent margin, square composition. No body, shoulders, hands, callout, text outside the logo patch, button, frame, white rectangle, or other objects. Genuinely transparent background.
