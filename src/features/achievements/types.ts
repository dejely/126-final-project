export interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  progress: number;
  target: number;
export interface PlayerAchievement {
  id: string
  code: string
  name: string
  description: string
  unlocked: boolean
  unlockedAt: string | null
}

export interface AchievementResultInput {
  playerId: string
  gameMode: string
  score: number
  streak: number
}
