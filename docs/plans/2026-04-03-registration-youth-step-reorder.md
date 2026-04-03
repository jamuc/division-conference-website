# Registration Youth Step Reorder Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Move the cleaning-fee acceptance step to the end of the registration funnel and make the youth-attendance question the earlier mandatory step for both member and non-member flows.

**Architecture:** Keep the existing static HTML + vanilla JS funnel, but reorder the panels and align the JavaScript step model with the visual flow. Reuse the existing youth age-band UI, replace the optional “0/0 and continue” behavior with a required bring/not-bring choice, and make the summary/payment flow continue to calculate totals exactly as before.

**Tech Stack:** HTML5, CSS, vanilla JavaScript, existing i18n object in `js/register.js`

---

## Recommended Copy

Use **“Youth Bootcamp”** as the step name and refer to attendees as **“young people”** in English, not “children.” In German, use **“Jugend-Bootcamp”** or **“Jugendprogramm”** depending on tone, with **“Jugendliche”** for the age groups.

Recommended EN copy:
- Title: `Youth Bootcamp`
- Subtitle: `Will you be bringing any young people to the Youth Bootcamp?`
- Choice A: `Yes, I’m bringing young people`
- Choice B: `No, I’m not bringing any young people`
- Helper text: `If yes, please tell us how many young people are in each age group.`
- Group labels: `Ages 10–14`, `Ages 14–17`

Recommended DE copy:
- Title: `Jugend-Bootcamp`
- Subtitle: `Bringst du Jugendliche zum Jugend-Bootcamp mit?`
- Choice A: `Ja, ich bringe Jugendliche mit`
- Choice B: `Nein, ich bringe keine Jugendlichen mit`
- Helper text: `Wenn ja, teile uns bitte mit, wie viele Jugendliche zu jeder Altersgruppe gehören.`
- Group labels: `10–14 Jahre`, `14–17 Jahre`

## Implementation Prompt

Update the static registration funnel in `/Users/jason.franklin/repositories/division_conference_website` so that:

1. The cleaning-fee acceptance step moves to the end of the funnel, immediately before the confirmation/payment step.
2. The youth-attendance question becomes the earlier mandatory step:
   - non-members: Step 2
   - Toastmasters members: Step 3, after contest roles
3. The youth step must require an explicit choice:
   - “Yes, I’m bringing young people”
   - “No, I’m not bringing any young people”
4. If the attendee selects “Yes,” keep the existing age-group counters for `10–14` and `14–17`.
5. If the attendee selects “No,” the counters should be visually hidden or disabled and the stored counts should be reset to zero.
6. Validation must block progression until the attendee chooses either yes or no.
7. Keep pricing unchanged:
   - cleaning fee still required for everyone
   - workshop pricing unchanged
   - donation unchanged
8. Keep bilingual support in `js/register.js` complete for English and German.
9. Fix the current step-order inconsistencies while making this change:
   - unique panel IDs
   - correct progress-bar labels
   - correct dynamic eyebrow numbering
   - correct back/next navigation for member and non-member flows
10. Preserve the existing summary, Stripe checkout, and confirmation behavior unless a flow fix is required by the new order.

Prefer “young people” / `Jugendliche` over “children.” Reuse the existing youth UI where possible instead of inventing a new component.

## Tasks

### Task 1: Document the target flow and step numbering

**Files:**
- Modify: `/Users/jason.franklin/repositories/division_conference_website/registration.html`
- Modify: `/Users/jason.franklin/repositories/division_conference_website/js/register.js`

**Step 1: Define the intended panel order**

Member flow target:
1. Details
2. Contest Roles
3. Youth Bootcamp
4. Workshop
5. Donate
6. Cleaning Fee
7. Confirm

Non-member flow target:
1. Details
2. Youth Bootcamp
3. Workshop
4. Donate
5. Cleaning Fee
6. Confirm

**Step 2: Map this to stable panel IDs**

Use unique DOM IDs for each panel. Do not keep two separate sections with `id="step6"`.

Suggested stable structure:
- `step1` details
- `step2` roles
- `step3` youth
- `step4` workshop
- `step5` donation
- `step6` cleaning
- `step7` confirm
- `step8` confirmation screen

**Step 3: Confirm all JS order arrays match this numbering**

Expected member order:
```js
[1, 2, 3, 4, 5, 6, 7]
```

Expected non-member order:
```js
[1, 3, 4, 5, 6, 7]
```

### Task 2: Update the HTML structure for reordered steps

**Files:**
- Modify: `/Users/jason.franklin/repositories/division_conference_website/registration.html`

**Step 1: Move the cleaning-fee panel so it appears after donation and before confirm**

The DOM order should match the intended funnel sequence to avoid confusion during maintenance.

**Step 2: Update panel headings and `aria-label`s**

Make the visible step names and hidden labels reflect the new order.

**Step 3: Refactor the youth panel content**

Replace the current optional copy with:
- a required yes/no choice
- conditional age-band counters
- clearer “young people” wording

**Step 4: Keep the existing age counters if feasible**

Retain the counter controls for:
- `10–14`
- `14–17`

Add a radio group or similarly explicit binary selector ahead of the counters.

### Task 3: Add state for mandatory youth attendance selection

**Files:**
- Modify: `/Users/jason.franklin/repositories/division_conference_website/js/register.js`

**Step 1: Extend registration state**

Add explicit youth-attendance state, for example:

```js
youthAttendance: '',
youth1014: 0,
youth1417: 0,
```

Avoid relying on counter values alone to infer whether the user answered the question.

**Step 2: Wire DOM elements to state**

The explicit yes/no selection should set `youthAttendance` to a stable value.

**Step 3: Reset age counters when “No” is selected**

Expected behavior:
- `youth1014 = 0`
- `youth1417 = 0`
- counter UI hidden or disabled

### Task 4: Replace cleaning validation with youth-step validation at the earlier point

**Files:**
- Modify: `/Users/jason.franklin/repositories/division_conference_website/js/register.js`

**Step 1: Keep role validation for member-only Step 2**

`validateStep2()` should remain the roles validator for member flow.

**Step 2: Introduce validation for the youth step**

Add a dedicated validator that:
- fails if neither yes nor no is selected
- passes if “No” is selected
- passes if “Yes” is selected, regardless of whether one or both age-band counts are zero, unless product decides otherwise later

**Step 3: Move cleaning-fee validation to the new late step**

The cleaning toggle still must be accepted before reaching confirm.

### Task 5: Rewire navigation, progress bar, and eyebrow numbering

**Files:**
- Modify: `/Users/jason.franklin/repositories/division_conference_website/js/register.js`

**Step 1: Update `buildProgressBar()` labels**

Expected labels by flow:
- member: Details, Roles, Youth, Workshop, Donate, Fee, Confirm
- non-member: Details, Youth, Workshop, Donate, Fee, Confirm

**Step 2: Update `updateStepEyebrow()` order arrays**

They must reflect the new panel numbering and late cleaning step.

**Step 3: Update `goToStep()` side effects**

Check which steps should trigger:
- workshop setup
- donation update
- cleaning state display if needed
- summary population at confirm
- confirmation population after successful payment

**Step 4: Update all back/next button handlers**

Make sure:
- member Step 2 goes to Step 3
- non-member Step 1 goes to Step 3 directly
- workshop back points to youth
- donation next points to cleaning
- cleaning next points to confirm
- confirm back points to cleaning

### Task 6: Refresh i18n keys and labels

**Files:**
- Modify: `/Users/jason.franklin/repositories/division_conference_website/js/register.js`

**Step 1: Rename or repurpose nav/title/subtitle keys**

The current keys still label Step 3 as the fee step. Update them so the semantic labels match the new order.

**Step 2: Add youth-specific copy**

Include keys for:
- nav label
- title
- subtitle
- yes/no options
- helper copy
- validation error
- age-band labels if needed

**Step 3: Keep English and German in sync**

Do not leave one locale with old “cleaning fee first” copy.

### Task 7: Decide whether summary should show youth attendance

**Files:**
- Modify: `/Users/jason.franklin/repositories/division_conference_website/registration.html`
- Modify: `/Users/jason.franklin/repositories/division_conference_website/js/register.js`

**Step 1: Choose the minimal summary behavior**

Recommended:
- do not add youth details to the price section
- optionally add a non-price summary row for youth attendance if useful for review

**Step 2: Keep payment payload unchanged unless youth data is needed operationally**

If the registration backend or sheet should capture youth counts, then extend the POST body in a separate, explicit change. If not requested, do not expand backend scope yet.

### Task 8: Verify the full member and non-member journeys manually

**Files:**
- Modify if needed: `/Users/jason.franklin/repositories/division_conference_website/registration.html`
- Modify if needed: `/Users/jason.franklin/repositories/division_conference_website/js/register.js`

**Step 1: Manual member flow check**

Verify:
- Step 1 details
- Step 2 roles required
- Step 3 youth mandatory yes/no
- Step 6 cleaning required
- Step 7 confirm shows correct total

**Step 2: Manual non-member flow check**

Verify:
- Step 1 details
- Step 3 youth is first branch step
- roles are skipped
- Step 6 cleaning required
- confirm total includes workshop only when selected

**Step 3: Language toggle check**

Verify the active step copy updates correctly in both `en` and `de`.

**Step 4: Regression check**

Verify:
- judge eligibility still works
- workshop auto-select for members still works
- payment return still restores the correct confirm step

## Verification Commands

Run from `/Users/jason.franklin/repositories/division_conference_website`:

```bash
rg -n "id=\"step6\"|id=\"step7\"|id=\"step8\"|reg.step3|reg.step6|reg.step7|youth|cleaning" registration.html js/register.js
```

Expected:
- exactly one panel per step ID
- youth copy appears in the earlier step keys
- cleaning copy appears in the late step keys

If a local static server is useful:

```bash
python3 -m http.server 8000
```

Then manually verify the two flows in a browser.

## Open Decisions Already Resolved

- The youth step is mandatory.
- The attendee must explicitly choose either bringing or not bringing young people.
- Preferred wording is “young people” rather than “children.”

## Suggested Commit Split

1. `refactor: normalize registration step ids and flow order`
2. `feat: require youth bootcamp selection before workshop`
3. `copy: update registration flow wording in en and de`
