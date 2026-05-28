import { getSupabaseClient } from '../../../lib/supabase/supabaseClient'
import type { Player, UserStats } from '../types'

export const DEFAULT_GAME_MODE = 'anime_rating'
export const GUEST_USERNAME = 'guest_player'

export async function getGuestPlayer(): Promise<Player | null> {
  const supabase = getSupabaseClient()
  const { data, error } = await supabase
    .from('players')
    .select('*')
    .eq('username', GUEST_USERNAME)
    .maybeSingle()

  if (error) {
    throw error
  }

  return data
}

export async function getOrCreateGuestPlayer(): Promise<Player> {
  const supabase = getSupabaseClient()
  const existingPlayer = await getGuestPlayer()

  if (existingPlayer) {
    return existingPlayer
  }

  const { data: createdPlayer, error: insertError } = await supabase
    .from('players')
    .insert({ username: GUEST_USERNAME })
    .select('*')
    .single()

  if (!insertError && createdPlayer) {
    return createdPlayer
  }

  const { data: fallbackPlayer, error: fallbackError } = await supabase
    .from('players')
    .select('*')
    .eq('username', GUEST_USERNAME)
    .single()

  if (fallbackError) {
    throw insertError ?? fallbackError
  }

  return fallbackPlayer
}

export function createEmptyUserStats(
  gameMode = DEFAULT_GAME_MODE,
): UserStats {
  return {
    playerId: '',
    username: GUEST_USERNAME,
    gameMode,
    bestScore: 0,
    bestStreak: 0,
    gamesPlayed: 0,
  }
}

export async function fetchUserStats(
  playerId: string,
  gameMode = DEFAULT_GAME_MODE,
): Promise<UserStats> {
  const supabase = getSupabaseClient()
  const { data: player, error: playerError } = await supabase
    .from('players')
    .select('*')
    .eq('id', playerId)
    .single()

  if (playerError) {
    throw playerError
  }

  const { data: sessions, error: sessionsError } = await supabase
    .from('game_sessions')
    .select('score, streak')
    .eq('player_id', playerId)
    .eq('game_mode', gameMode)

  if (sessionsError) {
    throw sessionsError
  }

  const bestScore = Math.max(0, ...(sessions ?? []).map((session) => session.score))
  const bestStreak = Math.max(0, ...(sessions ?? []).map((session) => session.streak))

  return {
    playerId,
    username: player.username,
    gameMode,
    bestScore,
    bestStreak,
    gamesPlayed: sessions?.length ?? 0,
  }
}

export async function saveGameResult(input: {
  playerId: string
  gameMode: string
  score: number
  streak: number
}): Promise<void> {
  const supabase = getSupabaseClient()
  const entry = {
    player_id: input.playerId,
    game_mode: input.gameMode,
    score: input.score,
    streak: input.streak,
  }

  const { error: sessionError } = await supabase
    .from('game_sessions')
    .insert(entry)

  if (sessionError) {
    throw sessionError
  }

  const { error: leaderboardError } = await supabase
    .from('leaderboard_entries')
    .insert(entry)

  if (leaderboardError) {
    throw leaderboardError
  }
}
