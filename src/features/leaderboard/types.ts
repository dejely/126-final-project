export interface LeaderboardEntry {
  id: string
  playerId: string | null
  username: string
  gameMode: string
  score: number
  streak: number
  createdAt: string | null
  rank: number
}
