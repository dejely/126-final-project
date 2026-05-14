import { malFetch } from '../lib/malClient'

/**
 * Shape of the MyAnimeList ranking response used by the game.
 * Only the fields requested in getTopAnimeChoices are represented here.
 */
type MalRankingResponse = {
  data: {
    node: {
      id: number
      title: string
      main_picture?: {
        medium?: string
      }
      mean?: number
      popularity?: number
      num_favorites?: number
    }
  }[]
}

/**
 * Fetches top-ranked anime from the backend MAL proxy and converts the API
 * response into the simplified choice data used by the game UI.
 */
export async function getTopAnimeChoices() {
  const result = await malFetch<MalRankingResponse>(
    '/anime/ranking?ranking_type=all&limit=20&fields=id,title,main_picture,mean,popularity,num_favorites'
  )

  return result.data.map((item) => ({
    id: item.node.id,
    title: item.node.title,
    image: item.node.main_picture?.medium,
    rating: item.node.mean,
    popularity: item.node.popularity,
    favorites: item.node.num_favorites,
  }))
}
