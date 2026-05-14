BEGIN;

CREATE TABLE IF NOT EXISTS players (
  id uuid primary key,
  username text not null,
  created_at timestamp default now()
);

CREATE TABLE IF NOT EXISTS game_sessions (
  id uuid primary key,
  player_id uuid references players(id),
  game_mode text not null,
  score integer not null,
  streak integer not null,
  created_at timestamp default now()
);


CREATE TABLE IF NOT EXISTS leaderboard_entries (
  id uuid primary key,
  player_id uuid references players(id),
  game_mode text not null,
  score integer not null,
  streak integer not null,
  created_at timestamp default now()
);

CREATE TABLE IF NOT EXISTS achievements (
  id uuid primary key,
  code text unique not null,
  name text not null,
  description text not null
);

CREATE TABLE IF NOT EXISTS player_achievements (
  id uuid primary key,
  player_id uuid references players(id),
  achievement_id uuid references achievements(id),
  unlocked_at timestamp default now(),
  unique(player_id, achievement_id)
);


COMMIT;