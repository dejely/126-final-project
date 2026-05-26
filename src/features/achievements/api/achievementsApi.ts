import { getSupabaseClient } from '../../../lib/supabase/supabaseClient'
import type { AchievementResultInput, PlayerAchievement } from '../types'

const ACHIEVEMENT_CODES = {
  firstGame: 'FIRST_GAME',
  streakFive: 'STREAK_5',
  scoreHundred: 'SCORE_100',
  topPlayer: 'TOP_PLAYER',
} as const

export async function fetchAchievements(playerId: string): Promise<PlayerAchievement[]> {
  const supabase = getSupabaseClient()
  const { data: achievements, error: achievementsError } = await supabase
    .from('achievements')
    .select('*')
    .order('name', { ascending: true })

  if (achievementsError) {
    throw achievementsError
  }

  const { data: unlockedRows, error: unlockedError } = await supabase
    .from('player_achievements')
    .select('achievement_id, unlocked_at')
    .eq('player_id', playerId)

  if (unlockedError) {
    throw unlockedError
  }

  const unlockedById = new Map(
    (unlockedRows ?? []).map((row) => [row.achievement_id, row.unlocked_at]),
  )

  return (achievements ?? []).map((achievement) => {
    const unlockedAt = unlockedById.get(achievement.id) ?? null

    return {
      id: achievement.id,
      code: achievement.code,
      name: achievement.name,
      description: achievement.description,
      unlocked: unlockedAt !== null,
      unlockedAt,
    }
  })
}

export async function unlockAchievementsForResult(
  input: AchievementResultInput,
): Promise<void> {
  const supabase = getSupabaseClient()
  const achievementCodes = new Set<string>([ACHIEVEMENT_CODES.firstGame])

  if (input.streak >= 5) {
    achievementCodes.add(ACHIEVEMENT_CODES.streakFive)
  }

  if (input.score >= 100) {
    achievementCodes.add(ACHIEVEMENT_CODES.scoreHundred)
  }

  if (await isTopLeaderboardScore(input)) {
    achievementCodes.add(ACHIEVEMENT_CODES.topPlayer)
  }

  const { data: achievements, error: achievementsError } = await supabase
    .from('achievements')
    .select('id, code')
    .in('code', Array.from(achievementCodes))

  if (achievementsError) {
    throw achievementsError
  }

  if (!achievements?.length) {
    return
  }

  const unlockedAt = new Date().toISOString()
  const records = achievements.map((achievement) => ({
    player_id: input.playerId,
    achievement_id: achievement.id,
    unlocked_at: unlockedAt,
  }))

  const { error } = await supabase
    .from('player_achievements')
    .upsert(records, {
      onConflict: 'player_id,achievement_id',
      ignoreDuplicates: true,
    })

  if (error) {
    throw error
  }
}

async function isTopLeaderboardScore(input: AchievementResultInput) {
  if (input.score <= 0) {
    return false
  }

  const supabase = getSupabaseClient()
  const { data, error } = await supabase
    .from('leaderboard_entries')
    .select('score')
    .eq('game_mode', input.gameMode)
    .order('score', { ascending: false })
    .limit(1)
    .maybeSingle()

  if (error) {
    throw error
  }

  return !data || input.score >= data.score
}
