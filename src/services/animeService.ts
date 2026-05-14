import { malFetch } from '../lib/malClient'

export async function getTopAnimeChoices() {
  const result = await malFetch(
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