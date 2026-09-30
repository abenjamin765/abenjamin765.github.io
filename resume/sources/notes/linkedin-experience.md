# LinkedIn Experience — Source Note

Aaron said LinkedIn is probably his most accurate and complete work history. That is
recorded here as a stated preference, not as evidence that any claim below has been
verified. Every claim in this file has status: **unverified**, because no LinkedIn
content could actually be retrieved.

## Retrieval status: BLOCKED

All attempts to retrieve LinkedIn content failed. No role data was retrieved from
LinkedIn. This note contains no LinkedIn-sourced facts.

| Attempt | Method | Target | Result |
|---|---|---|---|
| 1 | `WebFetch` | Primary details URL (`.../details/experience/?isSelfProfile=true&vieweeProfileId=...`) | `404 Not Found` |
| 2 | `WebFetch` | Public fallback (`https://www.linkedin.com/in/aaronbenjamindesign/`) | `404 Not Found` |
| 3 | `WebSearch` | `site:linkedin.com/in/aaronbenjamindesign` | `No results found` |
| 4 | Browser navigation (logged-in Cursor browser session) | Primary details URL | Redirected to `https://www.linkedin.com/authwall?...&sessionRedirect=https%3A%2F%2Fwww.linkedin.com%2Fin%2Faaronbenjamindesign`, page title "Sign Up \| LinkedIn" |
| 5 | Browser navigation (logged-in Cursor browser session) | Public fallback URL | Redirected to the same LinkedIn authwall / "Sign Up \| LinkedIn" sign-in page |

Both the primary (self-profile) URL and the public fallback URL resolved to LinkedIn's
authwall (sign-in/sign-up interstitial) in a live browser session, and both returned
`404` via direct `WebFetch`. `WebSearch` for the profile returned no results. No cached,
snippet, or partial experience data was available through any of the four methods
attempted.

### Inbox check

Checked `resume/sources/inbox/` for a dropped LinkedIn export (e.g., PDF or "Download
your data" ZIP/CSV). **Result: empty.** No file exists there, so there is nothing in
the inbox to prefer over the blocked page.

## Roles retrieved

None. No role, title, employment type, location, workplace type, date range,
description, or bullet text could be captured from LinkedIn. Per instructions, no
career history is reconstructed from memory or from other files and attributed to
LinkedIn.

## Suggested role ids

Not applicable — no LinkedIn roles were retrieved to assign ids to. The candidate id
list supplied in the task (`renaissance-learning`, `indeed`, `redfin`,
`the-home-depot`, `snap-mobile`, `amazon`, `hp-inc`, `att`, `pyramid-consulting`)
is recorded here for reference only, in case a future successful fetch or inbox
export needs to reuse it.

## Comparison to `src/assets/data/work-history.yml`

Not possible to produce. A diff against the in-repo YAML requires LinkedIn data to
compare against, and none was retrieved. `src/assets/data/work-history.yml` was
read only to prepare for this comparison; its contents are **not** reproduced here
as if they were LinkedIn data. For reference, that YAML currently lists 8 employers
(Renaissance Learning, Indeed, Redfin, The Home Depot, Snap! Mobile, Amazon, HP Inc.,
AT&T) and does not include Pyramid Consulting — but this is a note about the YAML,
not a LinkedIn-sourced finding, and cannot be confirmed or contradicted by LinkedIn
until retrieval succeeds.

## Claim status

Every statement above about LinkedIn's *content* is: not applicable (no content
retrieved). Every statement about the *retrieval attempts themselves* (URLs tried,
error codes, authwall redirect, inbox emptiness) is directly observed during this
session and reported as-is.

## Recorded preference

Aaron stated: "LinkedIn is probably his most accurate and complete work history."
This preference is noted for whoever attempts the next retrieval (e.g., after
exporting "Download your data" from LinkedIn into `resume/sources/inbox/`, or after
authenticating a browser session that can reach the profile). It does not upgrade
any existing claim's status to verified.

## Next steps (not performed by this note)

- Aaron could export LinkedIn data (Settings & Privacy → Data privacy → Get a copy
  of your data) and drop the export into `resume/sources/inbox/` for a future
  retrieval pass.
- A future attempt could retry `WebFetch`/`WebSearch`/browser navigation in case the
  authwall or 404 behavior was session- or rate-limit-dependent rather than permanent.
