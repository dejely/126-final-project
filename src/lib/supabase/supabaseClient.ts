import { createClient, type SupabaseClient } from '@supabase/supabase-js'
import type { Database } from '../../types/database'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabasePublishableKey = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY
let supabaseClient: SupabaseClient<Database> | null = null

export function getSupabaseClient() {
  if (supabaseClient) {
    return supabaseClient
  }

  if (!supabaseUrl || !supabasePublishableKey) {
    throw new Error('Missing Supabase environment variables')
  }

  if (!supabaseUrl.startsWith('http://') && !supabaseUrl.startsWith('https://')) {
    throw new Error('VITE_SUPABASE_URL must be a Supabase HTTP API URL, not a PostgreSQL connection string')
  }

  supabaseClient = createClient<Database>(supabaseUrl, supabasePublishableKey)
  return supabaseClient
}
