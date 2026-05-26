type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[]

export type Database = {
  public: {
    Tables: {
      players: {
        Row: {
          id: string
          username: string
          created_at: string | null
        }
        Insert: {
          id?: string
          username: string
          created_at?: string | null
        }
        Update: {
          id?: string
          username?: string
          created_at?: string | null
        }
        Relationships: []
      }
      game_sessions: {
        Row: {
          id: string
          player_id: string | null
          game_mode: string
          score: number
          streak: number
          created_at: string | null
        }
        Insert: {
          id?: string
          player_id?: string | null
          game_mode: string
          score: number
          streak: number
          created_at?: string | null
        }
        Update: {
          id?: string
          player_id?: string | null
          game_mode?: string
          score?: number
          streak?: number
          created_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: 'game_sessions_player_id_fkey'
            columns: ['player_id']
            referencedRelation: 'players'
            referencedColumns: ['id']
          },
        ]
      }
      leaderboard_entries: {
        Row: {
          id: string
          player_id: string | null
          game_mode: string
          score: number
          streak: number
          created_at: string | null
        }
        Insert: {
          id?: string
          player_id?: string | null
          game_mode: string
          score: number
          streak: number
          created_at?: string | null
        }
        Update: {
          id?: string
          player_id?: string | null
          game_mode?: string
          score?: number
          streak?: number
          created_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: 'leaderboard_entries_player_id_fkey'
            columns: ['player_id']
            referencedRelation: 'players'
            referencedColumns: ['id']
          },
        ]
      }
      achievements: {
        Row: {
          id: string
          code: string
          name: string
          description: string
        }
        Insert: {
          id?: string
          code: string
          name: string
          description: string
        }
        Update: {
          id?: string
          code?: string
          name?: string
          description?: string
        }
        Relationships: []
      }
      player_achievements: {
        Row: {
          id: string
          player_id: string | null
          achievement_id: string | null
          unlocked_at: string | null
        }
        Insert: {
          id?: string
          player_id?: string | null
          achievement_id?: string | null
          unlocked_at?: string | null
        }
        Update: {
          id?: string
          player_id?: string | null
          achievement_id?: string | null
          unlocked_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: 'player_achievements_player_id_fkey'
            columns: ['player_id']
            referencedRelation: 'players'
            referencedColumns: ['id']
          },
          {
            foreignKeyName: 'player_achievements_achievement_id_fkey'
            columns: ['achievement_id']
            referencedRelation: 'achievements'
            referencedColumns: ['id']
          },
        ]
      }
    }
    Views: Record<string, never>
    Functions: Record<string, never>
    Enums: Record<string, never>
    CompositeTypes: Record<string, never>
  }
}

export type Tables<T extends keyof Database['public']['Tables']> =
  Database['public']['Tables'][T]['Row']

export type TablesInsert<T extends keyof Database['public']['Tables']> =
  Database['public']['Tables'][T]['Insert']

export type TablesUpdate<T extends keyof Database['public']['Tables']> =
  Database['public']['Tables'][T]['Update']

export type { Json }
