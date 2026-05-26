BEGIN;

WITH ranked_players AS (
  SELECT
    id,
    username,
    first_value(id) OVER (
      PARTITION BY username
      ORDER BY created_at ASC NULLS LAST, id ASC
    ) AS keep_id,
    row_number() OVER (
      PARTITION BY username
      ORDER BY created_at ASC NULLS LAST, id ASC
    ) AS row_number
  FROM players
),
duplicate_players AS (
  SELECT id AS duplicate_id, keep_id
  FROM ranked_players
  WHERE row_number > 1
),
copied_achievements AS (
  INSERT INTO player_achievements (player_id, achievement_id, unlocked_at)
  SELECT d.keep_id, pa.achievement_id, min(pa.unlocked_at)
  FROM duplicate_players d
  JOIN player_achievements pa ON pa.player_id = d.duplicate_id
  GROUP BY d.keep_id, pa.achievement_id
  ON CONFLICT (player_id, achievement_id) DO NOTHING
  RETURNING id
)
DELETE FROM player_achievements
WHERE player_id IN (SELECT duplicate_id FROM duplicate_players);

WITH ranked_players AS (
  SELECT
    id,
    username,
    first_value(id) OVER (
      PARTITION BY username
      ORDER BY created_at ASC NULLS LAST, id ASC
    ) AS keep_id,
    row_number() OVER (
      PARTITION BY username
      ORDER BY created_at ASC NULLS LAST, id ASC
    ) AS row_number
  FROM players
),
duplicate_players AS (
  SELECT id AS duplicate_id, keep_id
  FROM ranked_players
  WHERE row_number > 1
)
UPDATE game_sessions
SET player_id = duplicate_players.keep_id
FROM duplicate_players
WHERE game_sessions.player_id = duplicate_players.duplicate_id;

WITH ranked_players AS (
  SELECT
    id,
    username,
    first_value(id) OVER (
      PARTITION BY username
      ORDER BY created_at ASC NULLS LAST, id ASC
    ) AS keep_id,
    row_number() OVER (
      PARTITION BY username
      ORDER BY created_at ASC NULLS LAST, id ASC
    ) AS row_number
  FROM players
),
duplicate_players AS (
  SELECT id AS duplicate_id, keep_id
  FROM ranked_players
  WHERE row_number > 1
)
UPDATE leaderboard_entries
SET player_id = duplicate_players.keep_id
FROM duplicate_players
WHERE leaderboard_entries.player_id = duplicate_players.duplicate_id;

WITH ranked_players AS (
  SELECT
    id,
    username,
    row_number() OVER (
      PARTITION BY username
      ORDER BY created_at ASC NULLS LAST, id ASC
    ) AS row_number
  FROM players
)
DELETE FROM players
WHERE id IN (
  SELECT id
  FROM ranked_players
  WHERE row_number > 1
);

ALTER TABLE players
ADD CONSTRAINT players_username_key UNIQUE (username);

COMMIT;
