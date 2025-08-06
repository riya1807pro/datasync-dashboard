import { getUserFavorites, updateUserFavorites } from '@/utils/clerkFavorites'
import { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { userId } = req.method === 'GET' ? req.query : JSON.parse(req.body)

  if (!userId || typeof userId !== 'string') {
    return res.status(400).json({ error: 'Missing userId' })
  }

  if (req.method === 'GET') {
    const favs = await getUserFavorites(userId)
    return res.status(200).json(favs)
  }

  if (req.method === 'POST') {
    const { favorites } = JSON.parse(req.body)
    if (!favorites) {
      return res.status(400).json({ error: 'Missing favorites' })
    }
    await updateUserFavorites(userId, favorites)
    return res.status(200).json({ success: true })
  }

  return res.status(405).end()
}
