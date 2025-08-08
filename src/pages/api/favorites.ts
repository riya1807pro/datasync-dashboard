import { getUserLocalFavorites, setUserLocalFavorites } from '@/utils/userFavorites'
import { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { userId } = req.method === 'GET' ? req.query : JSON.parse(req.body)

  if (!userId || typeof userId !== 'string') {
    return res.status(400).json({ error: 'Missing userId' })
  }

  if (req.method === 'GET') {
    const favs = await getUserLocalFavorites(userId)
    return res.status(200).json(favs)
  }

  if (req.method === 'POST') {
    const { favorites } = JSON.parse(req.body)
    if (!favorites) {
      return res.status(400).json({ error: 'Missing favorites' })
    }
    await setUserLocalFavorites(userId, favorites)
    return res.status(200).json({ success: true })
  }

  return res.status(405).end()
}
