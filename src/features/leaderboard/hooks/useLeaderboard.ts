import { useCallback, useEffect, useState } from 'react'
import { DEFAULT_GAME_MODE } from '../../user/api/userStatsApi'
import { fetchLeaderboard } from '../api/leaderboardApi'
import type { LeaderboardEntry } from '../types'

export function useLeaderboard(gameMode = DEFAULT_GAME_MODE, limit = 10) {
  const [data, setData] = useState<LeaderboardEntry[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const loadLeaderboard = useCallback(() => {
    return fetchLeaderboard(gameMode, limit)
  }, [gameMode, limit])

  const refetch = useCallback(async () => {
    setLoading(true)
    setError(null)

    try {
      const leaderboard = await loadLeaderboard()
      setData(leaderboard)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Could not load leaderboard')
    } finally {
      setLoading(false)
    }
  }, [loadLeaderboard])

  useEffect(() => {
    let active = true

    const loadInitialLeaderboard = async () => {
      try {
        const leaderboard = await loadLeaderboard()
        if (active) {
          setData(leaderboard)
        }
      } catch (err) {
        if (active) {
          setError(err instanceof Error ? err.message : 'Could not load leaderboard')
        }
      } finally {
        if (active) {
          setLoading(false)
        }
      }
    }

    void loadInitialLeaderboard()

    return () => {
      active = false
    }
  }, [loadLeaderboard])

  return { data, loading, error, refetch }
}
