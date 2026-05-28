BEGIN;

ALTER TABLE players ENABLE ROW LEVEL SECURITY;
ALTER TABLE game_sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE leaderboard_entries ENABLE ROW LEVEL SECURITY;
ALTER TABLE achievements ENABLE ROW LEVEL SECURITY;
ALTER TABLE player_achievements ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "players_public_select" ON players;
DROP POLICY IF EXISTS "players_guest_insert" ON players;
DROP POLICY IF EXISTS "game_sessions_public_select" ON game_sessions;
DROP POLICY IF EXISTS "game_sessions_public_insert" ON game_sessions;
DROP POLICY IF EXISTS "leaderboard_entries_public_select" ON leaderboard_entries;
DROP POLICY IF EXISTS "leaderboard_entries_public_insert" ON leaderboard_entries;
DROP POLICY IF EXISTS "achievements_public_select" ON achievements;
DROP POLICY IF EXISTS "player_achievements_public_select" ON player_achievements;
DROP POLICY IF EXISTS "player_achievements_public_insert" ON player_achievements;

CREATE POLICY "players_public_select"
ON players
FOR SELECT
TO anon, authenticated
USING (true);

CREATE POLICY "players_guest_insert"
ON players
FOR INSERT
TO anon, authenticated
WITH CHECK (username = 'guest_player');

CREATE POLICY "game_sessions_public_select"
ON game_sessions
FOR SELECT
TO anon, authenticated
USING (true);

CREATE POLICY "game_sessions_public_insert"
ON game_sessions
FOR INSERT
TO anon, authenticated
WITH CHECK (true);

CREATE POLICY "leaderboard_entries_public_select"
ON leaderboard_entries
FOR SELECT
TO anon, authenticated
USING (true);

CREATE POLICY "leaderboard_entries_public_insert"
ON leaderboard_entries
FOR INSERT
TO anon, authenticated
WITH CHECK (true);

CREATE POLICY "achievements_public_select"
ON achievements
FOR SELECT
TO anon, authenticated
USING (true);

CREATE POLICY "player_achievements_public_select"
ON player_achievements
FOR SELECT
TO anon, authenticated
USING (true);

CREATE POLICY "player_achievements_public_insert"
ON player_achievements
FOR INSERT
TO anon, authenticated
WITH CHECK (true);

COMMIT;
