import { useCallback, useEffect, useState } from 'react'
import { getOrCreateGuestPlayer } from '../../../user/api/userStatsApi'
import { fetchAchievements } from '../achievementsApi'
import type { PlayerAchievement } from '../../types'

export function useAchievements() {
  const [data, setData] = useState<PlayerAchievement[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const loadAchievements = useCallback(async () => {
    const player = await getOrCreateGuestPlayer()
    return fetchAchievements(player.id)
  }, [])

  const refetch = useCallback(async () => {
    setLoading(true)
    setError(null)

    try {
      const achievements = await loadAchievements()
      setData(achievements)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Could not load achievements')
    } finally {
      setLoading(false)
    }
  }, [loadAchievements])

  useEffect(() => {
    let active = true

    const loadInitialAchievements = async () => {
      try {
        const achievements = await loadAchievements()
        if (active) {
          setData(achievements)
        }
      } catch (err) {
        if (active) {
          setError(err instanceof Error ? err.message : 'Could not load achievements')
        }
      } finally {
        if (active) {
          setLoading(false)
        }
      }
    }

    void loadInitialAchievements()

    return () => {
      active = false
    }
  }, [loadAchievements])

  return { data, loading, error, refetch }
}
