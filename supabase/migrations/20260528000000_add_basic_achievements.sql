BEGIN;

INSERT INTO achievements (code, name, description)
VALUES
  ('SCORE_10', 'Score 10', 'Reach a score of 10 in any game mode.'),
  ('SCORE_20', 'Score 20', 'Reach a score of 20 in any game mode.'),
  ('SCORE_30', 'Score 30', 'Reach a score of 30 in any game mode.'),
  ('STREAK_3', 'Streak', 'Answer 3 questions correctly in a row.')
ON CONFLICT (code) DO UPDATE
SET
  name = EXCLUDED.name,
  description = EXCLUDED.description;

COMMIT;
