import { getUserLocalFavorites, setUserLocalFavorites } from "@/utils/userFavorites"
import { NextApiRequest, NextApiResponse } from "next"

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { userId } = req.method === 'GET' ? req.query : JSON.parse(req.body)

    if (!userId || typeof userId !== 'string') {
      res.status(400).json({ error: 'Missing userId' })
      return
    }

    if (req.method === 'GET') {
      const favs = await getUserLocalFavorites(userId)
      res.status(200).json(favs)
      return
    }

    if (req.method === 'POST') {
      const { favorites } = JSON.parse(req.body)
      if (!favorites) {
        res.status(400).json({ error: 'Missing favorites' })
        return
      }
      await setUserLocalFavorites(userId, favorites)
      res.status(200).json({ success: true })
      return
    }

    res.status(405).end()
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Internal Server Error' })
  }
}