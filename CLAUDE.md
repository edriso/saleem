# CLAUDE.md — Saleem (سليم)

Project memory for Claude Code. Read this before doing anything. Keep edits aligned with it; if you intentionally diverge, update this file in the same change.

## What Saleem is

A **frontend-only**, **bilingual (English + Egyptian Arabic, full RTL)** web app that helps ordinary Egyptians eat healthier and move more — **without** giving up the food they love and **without** calorie counting. Name: **سليم** ("sound / whole / healthy"). Tagline: **"Eat well, move a little — the Egyptian way." / "كُل صح واتحرّك شوية، على الطريقة المصرية."**

Core philosophy: **keep the Egyptian food, fix portions and preparation.** Ful, koshari, ta'meya, molokhia, eish baladi all stay — the app adjusts _how much_ and _how it's made_. It must feel made **for Egypt**, never a translated Western diet app. No backend, no accounts; all state local; works offline.

## Product shape

Responsive: desktop **side-rail**, mobile **bottom-nav**. Four small screens:

- **Today (النهاردة)** — greeting; "build your next plate" with a ½ veg / ¼ protein / ¼ carbs plate visual; a **water** counter (+1 glass, daily goal); a **move** nudge; "this week's one habit"; a rotating fact.
- **Eat (الأكل)** — the **no-numbers hand plate** (Protein = palm, Vegetables = fist, Carbs = cupped hand, Fats = thumb, with examples) + expandable **Egyptian dish swaps** (ful, ta'meya, koshari, molokhia, mahshi, eish baladi, sugary tea, soda/juice), each with a verdict, a practical swap, and the why. Tone tags good / ok / watch.
- **Move (الحركة)** — three short, no-equipment home workouts → full-screen guided player (per-move countdown ring, rounds, rest, pause/skip, completion).
- **Habits (العادات)** — build **one at a time** (less sugar in tea, 8 glasses water, 15-min walk, veg with lunch, smaller plate / eat seated), each with reasoning. Gentle "not medical advice — see your doctor if diabetic/pregnant/etc." note.

All guidance is **science-based** (plate method / hand portions; WHO + Egyptian dietary guidance on portion control, added sugar, activity) and **positively framed — never shaming**.

## Internationalization & RTL — the defining constraint. Get it right.

- **Two languages: `en` (LTR) and `ar` (RTL)**, switchable instantly from a visible toggle, persisted. Switching flips `documentElement.lang`, `dir`, the font, and all copy — **no reload**.
- **Zero hardcoded UI strings.** Everything user-facing goes through the i18n layer. Here that is a typed dictionary of `{ en, ar }` in `src/i18n/messages.ts` plus `t(id)` / `tr(localized)` from `useI18n()`; content data (dishes/habits/workouts/facts) also carries both languages as `Localized = { en, ar }`. An ESLint rule (`react/jsx-no-literals`) enforces it.
- **The Arabic is Egyptian dialect (عامية)** where it fits ("النهاردة", "كُل صح", "اتحرّك شوية") — warm and natural, **not** stiff MSA. Preserve that voice in every new string.
- **RTL correctness is mandatory:**
  - Use CSS **logical properties** everywhere — `margin-inline-*`, `padding-inline-*`, `inset-inline-*`, `border-inline-*`, `text-align: start/end`. Never raw `left`/`right`.
  - **Mirror directional icons** (chevrons, arrows) under `[dir="rtl"]` (the `.s-flip { transform: scaleX(-1) }` class).
  - No horizontal overflow; the rail, bottom-nav, sheets, and workout player must all mirror cleanly.
  - Don't apply Latin letter-spacing to Arabic; give Arabic a slightly taller line-height.
- **Fonts by language:** Plus Jakarta Sans (Latin/English) ⇄ **Cairo** (Arabic), swapped via `--font` on language change.
- **Numbers/dates:** format with `Intl` and the active locale (`ar-EG` / `en-GB`); Eastern-Arabic numerals in Arabic, kept consistent via `num()` / `longDate()`.
- Every message must exist in **both** languages — a missing/empty translation is a bug (and a test).

## Design system

Default **dark fresh-green**; also **light**. Green is the signature (`#3fb27f`); one accent at a time (swatches: greens, Nile blue `#3a86c8`, amber `#d9a23b`, terracotta `#c44f3d`); tints via `color-mix`. Food-group colors are fixed and meaningful: protein `#e0795a`, veg `#3fb27f`, carbs `#d9a23b`, fats `#c9a86a` — consistent across the plate, hand-portion rows, and dish dots. Fresh, clean, trustworthy, minimal. Plus Jakarta Sans / Cairo, weights to 800 for headings. Honor `prefers-reduced-motion` and `prefers-color-scheme`.

Voice: encouraging, practical, non-judgmental, local. Never shame, never moralize about food, never imply Egyptian cuisine is the problem.

## Tech & architecture

- **React 19 + TypeScript (strict)**, **Vite**, **Tailwind v4** (CSS-first `@theme`, no config; logical-property/RTL utilities, direction off `<html dir>`).
- **i18n**: typed `t()`/dictionary as above — language persisted.
- **Zustand** (counters/workout/overlay state); **React Router** (4 routes); **React Hook Form + Zod** (inputs + persisted-shape validation).
- **Persistence behind a typed `repository`** (`getState`/`saveState`/`setSettings`/`setApp`). localStorage; components never touch storage directly; Zod parse with safe defaults. **Daily rollover** (reset water/moved at date change) is one pure, tested function.
- **PWA**: installable, offline-first (vite-plugin-pwa + manifest, green icon, localized name/short_name).
- Folders: `components/`, `features/{today,eat,move,habits,settings}/`, `store/`, `hooks/`, `lib/` (repository, rollover/streak/workout utils, bilingual content constants), `i18n/`, `types/`, `styles/`. Co-locate tests.

### Conventions

- Naming: `PascalCase` components/types · `camelCase` functions/vars · `kebab-case` files · `SCREAMING_SNAKE_CASE` constants. One component per file; keep small.
- No `any` (`unknown` + narrowing). Discriminated unions for workout/overlay state. Path aliases (`@/`).
- **No hardcoded UI strings** — enforced via lint/CI. **Pure, unit-tested logic** for rollover, habit streak, and the workout sequence — keep out of components.
- Accessibility: keyboard-operable, focus trap + Esc in the player, localized ARIA labels on icon buttons, visible focus rings, correct `lang`/`dir`.

## Commands

```bash
pnpm install
pnpm dev          # vite dev server
pnpm build        # type-check + production build
pnpm preview      # preview the build
pnpm lint         # eslint (incl. no-hardcoded-strings), zero warnings
pnpm format       # prettier --write
pnpm test         # vitest (unit + component, incl. i18n completeness + RTL)
pnpm test:e2e     # playwright (both languages)
```

Husky: pre-commit runs Prettier + ESLint on staged files; pre-push runs type-check + unit tests. Conventional Commits (commitlint).

## Definition of done

Lint clean (zero warnings, no hardcoded strings), `tsc` clean, unit/component/e2e green (including i18n-completeness and RTL tests), builds, **installs and runs offline**, **works flawlessly in both English (LTR) and Egyptian Arabic (RTL)**, keyboard-accessible, reduced-motion safe, and faithful to this design system — fresh dark green, minimal, trustworthy. The prototype (`Saleem.html` + `saleem-i18n.js` + `saleem-*` modules) is the source of truth for screens, both-language copy, dish swaps, hand portions, workouts, and habits; port it faithfully. Above all: it must feel **made for Egypt**, keep the cuisine, and never shame the user.
