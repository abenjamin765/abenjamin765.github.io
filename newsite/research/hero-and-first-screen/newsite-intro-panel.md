# What the newsite intro already is

**Claim:** The homepage notes treat the newsite intro as the identity panel, and say the sample wants that identity to be one screen, with work next.

**Sources:** Wall of Portfolios notes (`newsite/research.md`). Checked against `newsite/index.html` only for panel names and the intro text that is in the markup.

## Evidence

**Observed in `newsite/index.html`:** Navigation items are Intro, Experience, Work, About, Contact. The intro panel contains an `h2` “Hello” and a paragraph “complicated.” The work, experience, about, and contact panels in that file are the placeholder word “Hello.”

**Inferred (homepage notes, not re-verified in the browser):** The newsite intro is described as a full-viewport yellow panel, the word “Hello,” a large word, and a waving portrait. The notes say that panel is the identity. They recommend keeping the hello and the portrait; adding name, role, and one claim; putting company names in one line if at all; and not using a rotating adjective list. The claim should say what happens after the problem is understood: a product people can act on.

**Inferred (homepage notes):** The production hero in `src/index.pug` is described as already having a claim about helping teams make sense of complex problems, then shipping something people can use. That file was not re-read for this library.

## Implication for this portfolio

The research constraint on Intro is: one screen, person, role, one specific claim, then stop so Work can start. Palette, type, motion, and scroll-versus-snap are explicitly undecided by the sample.

## Limit

The portrait, yellow field, and production claim are the notes’ description. The HTML fragment confirms “Hello” and “complicated,” not the portrait or the yellow field.
