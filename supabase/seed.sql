-- Simple test seed for Aniguess

INSERT INTO players (username)
VALUES
  ('dejel'),
  ('yuan'),
  ('renz'),
  ('test_player')
ON CONFLICT DO NOTHING;

INSERT INTO achievements (code, name, description)
VALUES
  ('FIRST_GAME', 'First Game', 'Play your first game.'),
  ('SCORE_10', 'Score 10', 'Reach a score of 10 in any game mode.'),
  ('SCORE_20', 'Score 20', 'Reach a score of 20 in any game mode.'),
  ('SCORE_30', 'Score 30', 'Reach a score of 30 in any game mode.'),
  ('STREAK_3', 'Streak', 'Answer 3 questions correctly in a row.'),
  ('STREAK_5', 'Hot Streak', 'Reach a streak of 5.'),
  ('SCORE_100', 'Century Score', 'Reach a score of 100.'),
  ('TOP_PLAYER', 'Top Player', 'Reach the top of the leaderboard.')
ON CONFLICT (code) DO NOTHING;

INSERT INTO game_sessions (player_id, game_mode, score, streak)
SELECT id, 'anime_popularity', 80, 4
FROM players
WHERE username = 'dejel';

INSERT INTO game_sessions (player_id, game_mode, score, streak)
SELECT id, 'anime_rating', 120, 6
FROM players
WHERE username = 'yuan';

INSERT INTO game_sessions (player_id, game_mode, score, streak)
SELECT id, 'character_favorites', 95, 5
FROM players
WHERE username = 'renz';

INSERT INTO leaderboard_entries (player_id, game_mode, score, streak)
SELECT id, 'anime_popularity', 80, 4
FROM players
WHERE username = 'dejel';

INSERT INTO leaderboard_entries (player_id, game_mode, score, streak)
SELECT id, 'anime_rating', 120, 6
FROM players
WHERE username = 'yuan';

INSERT INTO leaderboard_entries (player_id, game_mode, score, streak)
SELECT id, 'character_favorites', 95, 5
FROM players
WHERE username = 'renz';

INSERT INTO player_achievements (player_id, achievement_id)
SELECT p.id, a.id
FROM players p, achievements a
WHERE p.username = 'dejel'
AND a.code = 'FIRST_GAME'
ON CONFLICT (player_id, achievement_id) DO NOTHING;

INSERT INTO player_achievements (player_id, achievement_id)
SELECT p.id, a.id
FROM players p, achievements a
WHERE p.username = 'yuan'
AND a.code = 'STREAK_5'
ON CONFLICT (player_id, achievement_id) DO NOTHING;

INSERT INTO player_achievements (player_id, achievement_id)
SELECT p.id, a.id
FROM players p, achievements a
WHERE p.username = 'renz'
AND a.code = 'SCORE_100'
ON CONFLICT (player_id, achievement_id) DO NOTHING;
