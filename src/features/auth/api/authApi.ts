import { getSupabaseClient } from '../../../lib/supabase/supabaseClient'

export interface AuthCredentials {
  email: string
  password: string
}

export async function registerWithEmail({ email, password }: AuthCredentials) {
  const supabase = getSupabaseClient()
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
  })

  if (error) {
    throw error
  }

  return data
}

export async function loginWithEmail({ email, password }: AuthCredentials) {
  const supabase = getSupabaseClient()
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  })

  if (error) {
    throw error
  }

  return data
}

export async function logout() {
  const supabase = getSupabaseClient()
  const { error } = await supabase.auth.signOut()

  if (error) {
    throw error
  }
}
