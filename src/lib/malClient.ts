/**
 * Backend API base URL for MAL-related requests.
 * The frontend calls this proxy instead of calling MyAnimeList directly.
 */
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL ?? 'http://localhost:3001/api'

/**
 * Sends a request to the local API proxy and parses the JSON response.
 *
 * @param endpoint API path beginning with "/", for example "/anime/ranking".
 * @returns Parsed response body typed by the caller.
 */
export async function malFetch<T>(endpoint: string): Promise<T> {
  const response = await fetch(`${API_BASE_URL}${endpoint}`)

  if (!response.ok) {
    throw new Error('MAL request failed')
  }

  return response.json()
}
