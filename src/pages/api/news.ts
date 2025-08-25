// pages/api/news.ts
import type { NextApiRequest, NextApiResponse } from "next"

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { category = "general", country = "us" } = req.query

  try {
    const apiRes = await fetch(
     `https://newsapi.org/v2/top-headlines?country=${country}&category=${category}`,
      {
        headers: {
          "X-Api-Key": process.env.NEXT_PUBLIC_NEWS_API_KEY || "",
        },
      }
    )

    if (!apiRes.ok) {
      const text = await apiRes.text()
      return res.status(apiRes.status).json({ error: text })
    }

    const data = await apiRes.json()
    return res.status(200).json(data)
  } catch (err: any) {
    return res.status(500).json({ error: err.message })
  }
}