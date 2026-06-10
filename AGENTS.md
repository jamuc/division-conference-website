# District 95 Division D Website — Agent Handoff

## What this is
Static website for **District 95 Division D Toastmasters**. Hosted on GitHub Pages at `toastmasters-bayern.com`. Bilingual EN/DE.

> **Repurpose in progress:** The site is moving from a one-off conference site (Division D Conference, 25 April 2026) to a standing District 95 Division D site. See "Current state" below for exactly what's done vs. pending.

**Motto:** "Dream small, just do it."

**Identity label:** "District 95 · Division D" (district first). Domain stays `toastmasters-bayern.com`.

---

## Tech stack
Pure HTML5 + CSS + Vanilla JS. No build step, no framework. GitHub Pages deployment.

```
index.html              ← main landing page: hero (champions) + What is Toastmasters? + Facebook
contest.html            ← archive of the 25 Apr contest day (noindex) — see below
agenda.html             ← day programme (still conference-worded — pending)
registration.html       ← multi-step registration funnel
css/style.css           ← (.bottom-bar* rules now unused — bottom bar removed)
js/main.js              ← lang toggle, share buttons, sticky nav, visitor counter
js/register.js          ← registration funnel logic, Stripe, PDF
google-apps-script.js   ← backend (deployed as Google Apps Script)
impressum.html
images/og-image.png     ← social share card, 1200×630 (see "Social share card")
CNAME                   ← toastmasters-bayern.com
```
(The old `js/bottom-bar.js` was deleted — the sticky bottom bar is gone.)

---

## Brand colours
- Maroon: `#772432`
- Dark Blue (Navy): `#004165`
- Gray: `#A9B2B1`
- Off-white: `#f4f5f5` (`--gray-lt`) — used by `.section--cream` (e.g. the "What is Toastmasters?" section, to break it off from the navy "Facebook" section)
- Yellow (CTA): `#F2DF74`
- Fonts: Montserrat (headings), Inter (body) — self-hosted in `/fonts/`

---

## Registration funnel (`registration.html` + `js/register.js`)

### Flow
**Members (6 steps):** Details → Contest Roles → Cleaning Fee → Workshop → Donate → Confirm
**Non-members (5 steps):** Details → Cleaning Fee → Workshop → Donate → Confirm

Panel numbers in HTML: step1=Details, step2=ContestRoles (members only), step3=CleaningFee, step4=Workshop, step5=Donate, step6=Confirm, step7=Confirmation screen.

### Pricing
| Item | Cost |
|---|---|
| Cleaning fee (everyone) | €5 |
| Workshop Pass (optional add-on) | +€5 |
| Workshop auto-toggled ON for members | — |
| Voluntary donation | user-entered |

### Contest Roles (Step 2, members only)
8 checkboxes (multi-select, at least 1 required):
- Contestant, General Support, Judge, Technical Support, Registration Support, Photo, Timekeeper, SAA / Ballot Counter / Logistics

**Judge** expands an eligibility sub-section — both must be checked to proceed:
1. Pathways Level 2 **or** minimum 6 CC speech projects (single combined checkbox)
2. Member for at least 6 months

### Payment
Stripe Checkout (live mode). Card only (`payment_method_types: ['card']`). Backend is Google Apps Script.

**Stripe public key** (live): in `js/register.js` at top — `STRIPE_PUBLIC_KEY`
**Stripe secret key** (live): stored in Apps Script Script Properties as `STRIPE_SECRET_KEY` (never in code)

### Key JS functions in `register.js`
- `buildProgressBar()` — called after step 1, builds 5 or 6 dots depending on `state.isMember`
- `updateStepEyebrow(n)` — computes "Step X of Y" dynamically (no `data-i18n` on eyebrow spans for steps 2+)
- `validateStep2()` — roles: at least 1 selected; if judge selected: both judgeElig checkboxes must be true (judgeElig[0]=speech experience, judgeElig[1]=6 months)
- `goToStep(n)` — central navigation; hooks at n=4 (workshop auto-toggle for members), n=5 (donation), n=6 (summary populate), n=7 (confirmation)
- `initiatePayment()` — creates Stripe Checkout Session via Apps Script, redirects
- `handlePaymentReturn()` — on page load, checks `?payment=success|cancel` URL param

---

## Backend (`google-apps-script.js`)
Deployed as a Google Apps Script web app (access: Anyone).

- **`doGet()`** — reads/increments visitor counter from `PropertiesService` (key: `VISITOR_COUNT`, starts at 1011). Returns JSON `{count: N}`.
- **`doPost()`** — creates Stripe Checkout Session. Line items: cleaning fee (€5), workshop (€5, only if non-member — members get it free), donation (if > 0). Logs registration to a Google Sheet named `"Registrations"`.

**Two separate Apps Script deployments / URLs:**
- `js/main.js` uses one URL → visitor counter only (GET)
- `js/register.js` uses a different URL → payment + sheet logging (POST)

Both URLs are constants at the top of each JS file. When the Apps Script is redeployed, **both URLs must be updated** in the respective JS files.

---

## Visitor counter
Shown in the hero section of `index.html`. Fetches from Apps Script on first visit per session, caches in `localStorage`. Displays immediately on subsequent loads without a network call.

---

## i18n system
- All strings in `js/main.js` (for `index.html`) and `js/register.js` (for `registration.html`) in an `i18n` object: `{ en: {...}, de: {...} }`
- `data-i18n="key"` attributes on HTML elements
- `applyLang()` swaps `innerHTML` for all tagged elements
- Preference stored in `localStorage`

---

## Social share card (`images/og-image.png`)
- 1200×630 flat PNG — **no source template in the repo**. Shows "District 95 Division D" + the motto on a maroon→navy gradient with the Toastmasters globe.
- To regenerate: `pip3 install Pillow fonttools brotli`, convert the self-hosted WOFF2 fonts in `/fonts/` to TTF with fontTools (`montserrat-latin.woff2` is a variable font, wght 100–900 — instantiate with `varLib.instancer`), compose with Pillow. (No ImageMagick / headless Chrome available locally.)
- After changing the image, **bump the `?v=N` query** on the og:image / twitter:image / JSON-LD image URLs in `index.html` and `agenda.html` so WhatsApp/Facebook refetch instead of serving a cached copy. Currently `?v=3`.

## Current state (repurpose, as of 10 June 2026)
**Done (step 1 — identity & previews):**
- Link-preview/meta tags (title, description, OG, Twitter, JSON-LD), visible identity labels, and the new social card all say **"District 95 Division D"** + motto. No more "Division D Conference 2026".
- Nav brand reversed to "District 95 · Division D"; the "District 95 ↗" pill removed (desktop + mobile menu).
- Entire sticky bottom bar removed (Essen send-off + sponsors) from index.html and agenda.html; `js/bottom-bar.js` deleted.

**Done (step 2 — split contest content off the main page):**
- The main page now shows only: hero (champions) + "What is Toastmasters?" + "Facebook".
- The four contest-day sections — **About the Event, Workshops, Contest Chairs, Venue** — were moved verbatim to **`contest.html`** (archive, `robots noindex`) so nothing is lost; we may reuse them later. Linked from the main page's burger menu ("Contest 2026") and footer.
- `contest.html` reuses the same chrome + `js/main.js` i18n; new nav keys added: `nav.contest`, `nav.chairs`, `nav.home`. The hero champions content + `hero.lead` are unchanged (still carry April-event wording).

**Still pending (carries April-event wording — later steps):**
- `index.html`: the Champions section + `hero.lead`, and the champion-card links/alt-text → `district95-conference.com`.
- `contest.html`: all of it is April-event content by design (it's the archive) — revisit if/when reused.
- `agenda.html`: the programme body still reads "Conference Programme" / "Division D Conference 2026" (~lines 752, 772, 1197).
- Registration funnel (`registration.html` / `js/register.js`) and the Apps Script `SHEET_NAME = 'Division D Conference Registration'` (left untouched — bound to live Google Sheet data).
- `impressum.html`: the "Veranstaltung" / "Konferenzanmeldungen" clauses.

## Known issues / pending (registration)
- Stripe automatic receipt emails not firing (account verification may be incomplete — manual send works).
- Registration funnel was built for the April conference; revisit whether it's still needed for the standing Division D site.

## Dead code left behind (harmless)
- `.bottom-bar*` rules in `css/style.css` and the `bar.thanks` i18n key in `js/main.js` are unused since the bottom bar was removed.

---

## Key URLs
- Live site: `https://toastmasters-bayern.com`
- GitHub repo: `https://github.com/jamuc/division-conference-website`
- District 95: `https://toastmasters-95.org/district-team-2025-2026/`
