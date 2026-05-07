# Folder Structure

This document explains where files should go in the project.

## Tree Overview

```txt
126-final-project/
├── changelog/
├── docs/
├── public/
├── src/
│   ├── app/
│   ├── assets/
│   ├── components/
│   │   ├── layout/
│   │   └── ui/
│   ├── features/
│   │   ├── achievements/
│   │   ├── anime/
│   │   ├── game/
│   │   ├── leaderboard/
│   │   └── user/
│   ├── lib/
│   ├── pages/
│   ├── styles/
│   ├── types/
│   └── utils/
├── supabase/
├── index.html
├── package.json
└── vite.config.ts
```

## Table of Contents

- [changelog/](#changelog)
- [docs/](#docs)
- [public/](#public)
- [src/app/](#srcapp)
- [src/assets/](#srcassets)
- [src/components/layout/](#srccomponentslayout)
- [src/components/ui/](#srccomponentsui)
- [src/features/achievements/](#srcfeaturesachievements)
- [src/features/anime/](#srcfeaturesanime)
- [src/features/game/](#srcfeaturesgame)
- [src/features/leaderboard/](#srcfeaturesleaderboard)
- [src/features/user/](#srcfeaturesuser)
- [src/lib/](#srclib)
- [src/pages/](#srcpages)
- [src/styles/](#srcstyles)
- [src/types/](#srctypes)
- [src/utils/](#srcutils)
- [supabase/](#supabase)

## `changelog/`

Use [`changelog/`](../changelog/) for release notes, change records, and changelog templates.

Example files:

- `CHANGELOGS.md`
- `CHANGELOG-TEMPLATE.MD`

## `docs/`

Use [`docs/`](./) for project documentation that helps developers understand the app.

Example files:

- `README.md`
- `FOLDER_STRUCTURE.md`

## `public/`

Use [`public/`](../public/) for static files that should be served directly by Vite.

Example files:

- `favicon.svg`
- `icons.svg`

## `src/app/`

Use [`src/app/`](../src/app/) for app-level setup files.

Example files:

- `App.tsx`
- `main.tsx`
- `router.tsx`

This keeps routing and app initialization separate from pages and features.

## `src/assets/`

Use [`src/assets/`](../src/assets/) for images, SVGs, and other imported media assets.

Example files:

- `hero.png`
- `react.svg`
- `vite.svg`

## `src/components/layout/`

Use [`src/components/layout/`](../src/components/layout/) for reusable layout components.

Example files:

- `Navbar.tsx`
- `Footer.tsx`
- `PageContainer.tsx`

These are components used across multiple pages to keep the layout consistent.

## `src/components/ui/`

Use [`src/components/ui/`](../src/components/ui/) for general reusable UI pieces.

Example files:

- `Button.tsx`
- `Card.tsx`
- `Modal.tsx`
- `LoadingState.tsx`
- `ErrorState.tsx`

These should not be tied to one feature only. For example, both the leaderboard and achievements page can reuse `Card.tsx`, `LoadingState.tsx`, and `ErrorState.tsx`.

## `src/features/achievements/`

Use [`src/features/achievements/`](../src/features/achievements/) for achievement-related code.

Example files:

- `api/achievementsApi.ts`
- `components/AchievementCard.tsx`
- `hooks/useAchievements.ts`
- `types.ts`

Use this for achievement fetching, achievement display, and achievement checking logic.

## `src/features/anime/`

Use [`src/features/anime/`](../src/features/anime/) for anime-related data, components, hooks, and types.

Example files:

- `api/animeApi.ts`
- `components/AnimeCard.tsx`
- `hooks/useAnimeData.ts`
- `types.ts`

Use this for anything related to fetching or displaying anime and character data from the MyAnimeList API.

## `src/features/game/`

Use [`src/features/game/`](../src/features/game/) for game logic and game-specific UI.

Example files:

- `components/GameBoard.tsx`
- `components/ChoiceButton.tsx`
- `components/ScoreDisplay.tsx`
- `components/GameResult.tsx`
- `hooks/useGame.ts`
- `utils/compareStats.ts`
- `types.ts`

Both `SeriesGame.tsx` and `CharacterGame.tsx` in [`src/pages/`](../src/pages/) can reuse these files, so you avoid copying the same game logic across pages.

## `src/features/leaderboard/`

Use [`src/features/leaderboard/`](../src/features/leaderboard/) for leaderboard-related code.

Example files:

- `api/leaderboardApi.ts`
- `components/LeaderboardTable.tsx`
- `hooks/useLeaderboard.ts`
- `types.ts`

This keeps leaderboard database queries and leaderboard UI separate from the rest of the app.

## `src/features/user/`

Use [`src/features/user/`](../src/features/user/) for user-related stats and profile data.

Example files:

- `api/userStatsApi.ts`
- `hooks/useUserStats.ts`
- `types.ts`

Use this for things like user score, streak, saved progress, or player stats.

## `src/lib/`

Use [`src/lib/`](../src/lib/) for shared library setup files.

Example files:

- `supabaseClient.ts`

This is where you initialize third-party tools that are used across the app.

## `src/pages/`

Use [`src/pages/`](../src/pages/) for full webpage screens.

Example files:

- `Home.tsx`
- `SeriesGame.tsx`
- `CharacterGame.tsx`
- `Leaderboard.tsx`
- `Achievements.tsx`
- `NotFound.tsx`

Each file here represents a route page in the web app.

## `src/styles/`

Use [`src/styles/`](../src/styles/) for global styling files.

Example files:

- `global.css`
- `variable.css`

Use this for app-wide CSS, color variables, font settings, and general layout styling.

## `src/types/`

Use [`src/types/`](../src/types/) for global TypeScript types.

Example files:

- `database.ts`

Use this for shared types that are used by many features.

## `src/utils/`

Use [`src/utils/`](../src/utils/) for general helper functions.

Example files:

- `constants.ts`
- `formatters.ts`
- `randomizer.ts`

These should be reusable and not tied to only one page or feature.

## `supabase/`

Use [`supabase/`](../supabase/) for database schema, seed data, and Supabase setup files.

Example files:

- `schema.sql`
- `seed.sql`
