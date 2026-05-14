import { Router } from 'express'

export const apiProxy = Router()

const MAL_API_BASE_URL = 'https://api.myanimelist.net/v2'
const MAL_CLIENT_ID = process.env.MAL_CLIENT_ID

if (!MAL_CLIENT_ID) {
  throw new Error('Missing MAL_CLIENT_ID in environment variables')
}

function getStringQueryParam(value: unknown, fallback: string) {
  return typeof value === 'string' && value.trim() ? value : fallback
}
// Backend route for anime ranking that is connected to /api/animeservice
apiProxy.get('/anime/ranking', async (req, res) => {
  try {
    const params = new URLSearchParams({
      ranking_type: getStringQueryParam(req.query.ranking_type, 'all'),
      limit: getStringQueryParam(req.query.limit, '20'),
      fields: getStringQueryParam(
        req.query.fields,
        'id,title,main_picture,mean,popularity,num_favorites'
      ),
    })

    const response = await fetch(`${MAL_API_BASE_URL}/anime/ranking?${params.toString()}`, {
      headers: {
        'X-MAL-CLIENT-ID': MAL_CLIENT_ID,
      },
    })

    if (!response.ok) {
      return res.status(response.status).json({
        error: 'Failed to fetch anime ranking from MyAnimeList',
      })
    }

    const data = await response.json()
    res.json(data)
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Internal server error' })
  }
})

apiProxy.get('/anime/search', async (req, res) => {
  try {
    const query = req.query.q

    if (!query || typeof query !== 'string') {
      return res.status(400).json({ error: 'Missing search query' })
    }

    const response = await fetch(
      `${MAL_API_BASE_URL}/anime?q=${encodeURIComponent(query)}&limit=10&fields=id,title,main_picture,mean,num_favorites,popularity`,
      {
        headers: {
          'X-MAL-CLIENT-ID': MAL_CLIENT_ID,
        },
      }
    )

    if (!response.ok) {
      return res.status(response.status).json({
        error: 'Failed to fetch anime data from MyAnimeList',
      })
    }

    const data = await response.json()
    res.json(data)
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Internal server error' })
  }
})
