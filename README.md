# Saleem · سليم

A **frontend-only**, **bilingual (English + Egyptian Arabic, full RTL)** web app
that helps ordinary Egyptians eat healthier and move more — **without** giving up
the food they love and **without** calorie counting. The name **سليم** means
"sound / whole / healthy." Tagline: **"Eat well, move a little — the Egyptian
way." / "كُل صح واتحرّك شوية، على الطريقة المصرية."**

The whole philosophy is one line: **keep the Egyptian food, fix portions and
preparation.** Ful, koshari, ta'meya, molokhia, eish baladi all stay — Saleem
just adjusts _how much_ and _how it's made_. There is no backend, no account, and
no network calls. Everything lives on your device and the app works fully offline.

All guidance is science-based (the plate method / hand portions; WHO and Egyptian
dietary guidance on portion control, added sugar, and physical activity) and
framed positively — it never shames you or your cuisine.

---

## The four screens

- **Today (النهاردة)** — a greeting, a "build your next plate" card with a
  ½ veg / ¼ protein / ¼ carbs plate visual, a water counter (+1 glass toward a
  daily goal), a move nudge, this week's one habit, and a rotating fact.
- **Eat (الأكل)** — the **no-numbers hand plate** (Protein = your palm,
  Vegetables = your fist, Carbs = a cupped hand, Fats = your thumb) plus
  expandable **Egyptian dish swaps** (ful, ta'meya, koshari, molokhia, mahshi,
  eish baladi, sugary tea, soda/juice), each with a verdict, a practical swap,
  and the why. Tone tags: good / ok / watch.
- **Move (الحركة)** — three short, no-equipment home workouts that open a
  full-screen guided player (per-move countdown ring, rounds, rest, pause/skip,
  a warm completion).
- **Habits (العادات)** — build **one habit at a time** (less sugar in tea,
  8 glasses of water, a 15-minute walk, veg with every lunch, smaller plate /
  eat seated), each with the reasoning, plus a gentle "not medical advice" note.

---

## Internationalization & RTL

This is the defining constraint of the app, built in from the first commit.

- **Two languages: `en` (LTR) and `ar` (Egyptian dialect, RTL)**, switchable
  instantly from a visible toggle and persisted. Switching flips
  `documentElement.lang`, `dir`, the font, and all copy with **no reload**.
- **Zero hardcoded UI strings.** Every user-facing string lives in the i18n layer
  (`src/i18n/messages.ts`) as `{ en, ar }` and is read through `t(id)`; content
  data (dishes, habits, workouts, facts) carries both languages as
  `Localized = { en, ar }` and is read through `tr(value)`. An ESLint rule
  (`react/jsx-no-literals`) fails the build on any bare text in JSX.
- **The Arabic is Egyptian (عامية)** — warm and natural ("النهاردة", "كُل صح",
  "اتحرّك شوية"), not stiff MSA.
- **RTL is real:** the layout uses CSS **logical properties** throughout
  (`margin-inline-*`, `inset-inline`, `border-inline-*`, `text-align: start`),
  directional glyphs are mirrored with `.s-flip`, and the rail, bottom-nav, and
  overlays all mirror cleanly. The font swaps from **Plus Jakarta Sans** to
  **Cairo** for Arabic, with a slightly taller line-height and no Latin tracking.
- **Numerals & dates** are formatted via `Intl` with the active locale — Saleem
  shows Eastern-Arabic numerals (٠١٢٣) in Arabic and Western numerals in English,
  consistently, through the `num()` / `longDate()` helpers.

A test (`src/i18n/messages.test.ts`) fails if any message id or content field is
missing or empty in either language, so the two languages can never drift apart.

---

## Tech stack

- **React 19 + TypeScript** (strict), built with **Vite**
- **Tailwind CSS v4** (configured in CSS with `@theme`, no `tailwind.config.js`)
- **Zustand** for state, **React Router** for the four routes
- **React Hook Form + Zod** are available for inputs; Zod validates all persisted
  data
- **vite-plugin-pwa** so the app is installable and works offline
- **Vitest** + **Testing Library** for unit and component tests, **Playwright**
  for browser tests (run in both languages)

---

## Getting started

You need **Node 20+** and **pnpm** (`npm install -g pnpm`).

```bash
pnpm install
pnpm dev
```

Open <http://localhost:5173>. There is nothing else to configure — no backend.

---

## Commands

| Command          | What it does                                          |
| ---------------- | ----------------------------------------------------- |
| `pnpm dev`       | Start the Vite dev server                             |
| `pnpm build`     | Type-check and build for production                   |
| `pnpm preview`   | Preview the production build locally                  |
| `pnpm lint`      | ESLint, incl. the no-hardcoded-strings rule (0 warns) |
| `pnpm format`    | Format every file with Prettier                       |
| `pnpm typecheck` | Type-check without building                           |
| `pnpm test`      | Unit + component tests, incl. i18n completeness + RTL |
| `pnpm test:e2e`  | Browser tests in both languages (Playwright)          |

Run `pnpm test:e2e:install` once to download the browser before `pnpm test:e2e`.

---

## How it is built

```
src/
├── components/   Presentational pieces (icon, ring, card, button, label, overlay, tone-dot, app-layout)
├── features/     One folder per screen: today, eat, move (+ workout player), habits, settings
├── store/        Zustand stores (saved app state + settings; ephemeral UI state)
├── hooks/        Small reusable hooks (interval, apply-document)
├── i18n/         The message catalog and the I18nProvider (t / tr / num / longDate)
├── lib/          Pure logic & data: repository, rollover, streak, workout, date, format, content
├── types/        Zod schemas and the types they produce
└── styles/       The theme and layout CSS (tokens, logical properties, .s-flip)
```

A few ideas worth knowing:

- **All saving goes through one seam.** `lib/repository.ts` is a small typed
  interface (`getState`, `saveState`, `setSettings`, `setApp`) backed by
  localStorage; components and the store never touch storage directly, so a
  Dexie/IndexedDB version could slot in later. Saved data is parsed with Zod, so
  an old, partial, or corrupt shape safely falls back to defaults.
- **The tricky logic is pure and tested.** The daily rollover (`lib/rollover.ts`),
  the habit streak (`lib/streak.ts`, one bump per day), and the workout sequence
  (`lib/workout.ts`, moves × rounds) are plain functions with no React, so the
  midnight/month/year edges and the sequencing are easy to test.
- **Daily rollover** resets water and "moved today" when the calendar day
  changes, on read, while habit progress is cumulative and untouched.

### Adding a dish, habit, or workout (in both languages)

Open `src/lib/content.ts` and append a typed entry to `DISHES`, `HABITS`,
`WORKOUTS`, `PLATE`, or `FACTS`. Every `Localized` field needs both `en` and `ar`
filled in — the i18n completeness test will fail otherwise. For a new UI string,
add an entry to `messages` in `src/i18n/messages.ts` and use it via `t('yourId')`;
never write the text directly in a component.

---

## Accessibility & motion

- Every control is keyboard-operable with a visible focus ring.
- The workout player and settings trap focus and close on Escape; icon buttons
  carry localized ARIA labels; `lang`/`dir` are kept correct so screen readers
  switch voices between English and Arabic.
- The app honors `prefers-reduced-motion` (animations collapse to near zero) and
  `prefers-color-scheme`. Theme (dark / light), accent, language, and water goal
  are all in Settings.

---

## A note on care

Saleem gives general, science-based guidance — not medical advice. If you have
diabetes, are pregnant, or have any health condition, check with your doctor
before changing your diet. And above all: keep the food you love.

---

## License

MIT.
