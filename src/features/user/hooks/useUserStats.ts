import { useCallback, useEffect, useState } from 'react'
import {
  DEFAULT_GAME_MODE,
  createEmptyUserStats,
  fetchUserStats,
  getGuestPlayer,
} from '../api/userStatsApi'
import type { UserStats } from '../types'

export function useUserStats(gameMode = DEFAULT_GAME_MODE) {
  const [data, setData] = useState<UserStats | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const loadStats = useCallback(async () => {
    const player = await getGuestPlayer()

    if (!player) {
      return createEmptyUserStats(gameMode)
    }

    return fetchUserStats(player.id, gameMode)
  }, [gameMode])

  const refetch = useCallback(async () => {
    setLoading(true)
    setError(null)

    try {
      const stats = await loadStats()
      setData(stats)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Could not load user stats')
    } finally {
      setLoading(false)
    }
  }, [loadStats])

  useEffect(() => {
    let active = true

    const loadInitialStats = async () => {
      try {
        const stats = await loadStats()
        if (active) {
          setData(stats)
        }
      } catch (err) {
        if (active) {
          setError(err instanceof Error ? err.message : 'Could not load user stats')
        }
      } finally {
        if (active) {
          setLoading(false)
        }
      }
    }

    void loadInitialStats()

    return () => {
      active = false
    }
  }, [loadStats])

  return { data, loading, error, refetch }
}
