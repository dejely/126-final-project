Use [app/](/src/app) for app-level setup files like:

- `App.tsx`
- `main.tsx`
- `router.tsx`

This keeps routing and app initialization seperate from pages and features.

---
Use [pages/](/src/pages/) for full webpage screens, like:

- `Home.tsx`
- `SeriesGame.tsx`
- `Character.tsx`
- `Leaderboard.tsx`
- `Achievements.tsx`
- `NotFound.tsx`

Each file here represents a route.page in the weba app.
---

Use [components/layout/](/src/components/layout) for reusable layout components like:

- `Navbar.tsx`
- `Footer.tsx`
- `PageContainer.tsx`

These are components used accross multiple pages to keep the layout consistent.

---
Use [components/ui/](/src/components/ui/) for general **reusable** UI pieces, like:

- `Button.tsx`
- `Card.tsx`
- `Modal.tsx`
- `LoadingState.tsx`
- `ErrorState.tsx`

These should not be tied to one feature only. For example, both the leaderboard and achievements page can reuse `Card.tsx`, `LoadingState.tsx`, and `ErrorState.tsx`

---
Use [features/anime/](/src/features/anime/) for anime related data, components, hooks, and types.

Example files:

- `api/animeApi.ts`
- `components/AnimeCard.tsx`
- `hooks/useAnimeDate.ts`
- `types.ts`

Use this for anything related to fetching or displaying anime/character data from the **MyAnimeList API**.

---
Use [features/game](/src/features/game/) for game logic and game-specific UI.

Example files:

- `components/GameBoard.tsx`
- `components/ChoiceButton.tsx`
- `components/ScoreDisplay.tsx`
- `components/GameResult.tsx`
- `hooks/useGame.ts`
- `utils/compareStats.ts`
- `types.ts`

Both `SeriesGame.tsx` and `CharacterGame.tsx` in [pages](/src/pages/) can reuse these files, so you avoid copying the same game logic accross pages.

---
Use [features/leaderboard/](/src/features/leaderboard/) for leaderboard-related code.

Example files:

- `api/leaderboardApi.ts`
- `components/LeaderboardTable.tsx`
- `hooks/useLeaderboard.ts`
- `types.ts`

This keeps leaderboard dataabase queries and leaderboard UI seperate from the rest of the app.

---
Use [features/achievements](/src/features/achievements/) for achievement-related code.

Example files:

- `api/achievementApi.ts`
- `components/AchievementCard.tsx`
- `hooks/useAchievements.ts`
- `types.ts`

Use this for achievement fetching, achievement display, and achievement checking logic.

---
Use [features/user/](/src/features/user) for user-related stats and profile data.

Example files:

- `api/userStatsApi.ts`
- `hooks/useUserStats.ts`
- `types.ts

Use this for things like user score, streak, saved progress, or player stats.

---
Use [lib/](/src/lib/) for shared library setup files like:

- `supabaseClient.ts`

This is where you initialize third-party tools that are used across the app.

---
Use [types/](/src/types/) for glolbal TypeScript types, like:

- `database.ts`

Use this for shared types that are used by many features.

---
Use [utils/](/src/utils/) for general helper functions like:

- `constants.ts`
- `formatters.ts`
- `randomizer.ts`

These should be reusable and not tied to only one page or feature.

---
Use [styles/](/src/styles/) for global stylinig files, like:

- global.css
- variables.css

Use this for app-wide CSS, color variables, font settings, and general layout styling.