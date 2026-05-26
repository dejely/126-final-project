import type { Tables } from '../../types/database'

export type Player = Tables<'players'>

export interface UserStats {
  playerId: string
  username: string
  gameMode: string
  bestScore: number
  bestStreak: number
  gamesPlayed: number
}
