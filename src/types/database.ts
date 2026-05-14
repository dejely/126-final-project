type GenericRow = Record<string, unknown>

export type Database = {
  public: {
    Tables: {
      [tableName: string]: {
        Row: GenericRow
        Insert: GenericRow
        Update: GenericRow
        Relationships: []
      }
    }
    Views: {
      [viewName: string]: {
        Row: GenericRow
        Relationships: []
      }
    }
    Functions: {
      [functionName: string]: {
        Args: Record<string, unknown>
        Returns: unknown
      }
    }
  }
}
