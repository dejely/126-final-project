import { getSupabaseClient } from '../../../lib/supabase/supabaseClient'
import { DEFAULT_GAME_MODE } from '../../user/api/userStatsApi'
import type { LeaderboardEntry } from '../types'

type LeaderboardRow = {
  id: string
  player_id: string | null
  game_mode: string
  score: number
  streak: number
  created_at: string | null
  players: { username: string } | null
}

export async function fetchLeaderboard(
  gameMode = DEFAULT_GAME_MODE,
  limit = 10,
): Promise<LeaderboardEntry[]> {
  const supabase = getSupabaseClient()
  const { data, error } = await supabase
    .from('leaderboard_entries')
    .select('id, player_id, game_mode, score, streak, created_at, players(username)')
    .eq('game_mode', gameMode)
    .order('score', { ascending: false })
    .order('streak', { ascending: false })
    .order('created_at', { ascending: true })
    .limit(Math.max(limit * 3, limit))
    .returns<LeaderboardRow[]>()

  if (error) {
    throw error
  }

  const bestByPlayer = new Map<string, LeaderboardRow>()

  for (const row of data ?? []) {
    const key = row.player_id ?? row.id
    if (!bestByPlayer.has(key)) {
      bestByPlayer.set(key, row)
    }
  }

  return Array.from(bestByPlayer.values())
    .slice(0, limit)
    .map((row, index) => ({
      id: row.id,
      playerId: row.player_id,
      username: row.players?.username ?? 'Guest',
      gameMode: row.game_mode,
      score: row.score,
      streak: row.streak,
      createdAt: row.created_at,
      rank: index + 1,
    }))
}
