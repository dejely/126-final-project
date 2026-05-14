BEGIN;

CREATE TABLE IF NOT EXISTS players (
  id uuid primary key default gen_random_uuid(),
  username text not null,
  created_at timestamp default now()
);

CREATE TABLE IF NOT EXISTS game_sessions (
  id uuid primary key default gen_random_uuid(),
  player_id uuid references players(id),
  game_mode text not null,
  score integer not null,
  streak integer not null,
  created_at timestamp default now()
);


CREATE TABLE IF NOT EXISTS leaderboard_entries (
  id uuid primary key default gen_random_uuid(),
  player_id uuid references players(id),
  game_mode text not null,
  score integer not null,
  streak integer not null,
  created_at timestamp default now()
);

CREATE TABLE IF NOT EXISTS achievements (
  id uuid primary key default gen_random_uuid(),
  code text unique not null,
  name text not null,
  description text not null
);

CREATE TABLE IF NOT EXISTS player_achievements (
  id uuid primary key default gen_random_uuid(),
  player_id uuid references players(id),
  achievement_id uuid references achievements(id),
  unlocked_at timestamp default now(),
  unique(player_id, achievement_id)
);

CREATE EXTENSION IF NOT EXISTS pgcrypto;

ALTER TABLE players
ALTER COLUMN id SET DEFAULT gen_random_uuid();

ALTER TABLE game_sessions
ALTER COLUMN id SET DEFAULT gen_random_uuid();

ALTER TABLE leaderboard_entries
ALTER COLUMN id SET DEFAULT gen_random_uuid();

ALTER TABLE achievements
ALTER COLUMN id SET DEFAULT gen_random_uuid();

ALTER TABLE player_achievements
ALTER COLUMN id SET DEFAULT gen_random_uuid();

COMMIT;