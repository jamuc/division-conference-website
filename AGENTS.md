# Division D Conference Website — Agent Handoff

## What this is
Static website for the **Division D (District 95) Toastmasters** conference on **25 April 2026** at Stadtteilkultur 2411, Munich. Hosted on GitHub Pages at `toastmasters-bayern.com`. Bilingual EN/DE.

**Tagline:** "Where Stories Connect" / "Wo Geschichten sich begegnen"

---

## Tech stack
Pure HTML5 + CSS + Vanilla JS. No build step, no framework. GitHub Pages deployment.

```
index.html              ← main landing page
agenda.html             ← conference agenda
registration.html       ← multi-step registration funnel
css/style.css
js/main.js              ← lang toggle, share buttons, sticky nav, visitor counter
js/register.js          ← registration funnel logic, Stripe, PDF
google-apps-script.js   ← backend (deployed as Google Apps Script)
impressum.html
CNAME                   ← toastmasters-bayern.com
```

---

## Brand colours
- Maroon: `#772432`
- Dark Blue (Navy): `#004165`
- Gray: `#A9B2B1`
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

**Judge** expands an eligibility sub-section — both conditions must be met to proceed:
1. Member for at least 6 months (required)
2. Speech experience — **either** Pathways Level 2 **or** minimum 6 CC speech projects (at least one required)

### Payment
Stripe Checkout (live mode). Card only (`payment_method_types: ['card']`). Backend is Google Apps Script.

**Stripe public key** (live): in `js/register.js` at top — `STRIPE_PUBLIC_KEY`
**Stripe secret key** (live): stored in Apps Script Script Properties as `STRIPE_SECRET_KEY` (never in code)

### Key JS functions in `register.js`
- `buildProgressBar()` — called after step 1, builds 5 or 6 dots depending on `state.isMember`
- `updateStepEyebrow(n)` — computes "Step X of Y" dynamically (no `data-i18n` on eyebrow spans for steps 2+)
- `validateStep2()` — roles: at least 1 selected; if judge selected: judgeElig[1] (6 months) AND (judgeElig[0] (Pathways L2) OR judgeElig[2] (6 CC speeches))
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

## Current state (as of April 3, 2026)
- **Pre-Signup mode**: index.html and agenda.html show "Pre-Signup" button linking to Google Form `https://forms.gle/zk1Nz7jc395sWGPu6` with note "Registration opens 4 April 2026"
- **Registration funnel**: fully built with Stripe live payments working
- **Stripe**: live mode, card only, receipts via Stripe (email send pending full account verification)
- **Contest roles step**: just implemented — members see 6-step funnel with roles + judge eligibility

## Known issues / pending
- Stripe automatic receipt emails not firing (account verification may be incomplete — manual send works)
- Registration opens 4 April 2026 — at that point switch Pre-Signup buttons back to "Register Now!" linking to `registration.html`

---

## Key URLs
- Live site: `https://toastmasters-bayern.com`
- GitHub repo: `https://github.com/jamuc/division-conference-website`
- District 95: `https://toastmasters-95.org/district-team-2025-2026/`
