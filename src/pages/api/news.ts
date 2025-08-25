import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { category = "general" } = req.query;
  const apiKey = process.env.NEXT_PUBLIC_NEWS_API_KEY;

  if (!apiKey) {
    return res.status(500).json({ error: "API key missing" });
  }

  try {
    const url = `https://newsapi.org/v2/top-headlines?country=us&category=${category}&apiKey=${apiKey}`;
    const response = await fetch(url);
    const data = await response.json();

    return res.status(200).json(data);
  } catch (err) {
    return res.status(500).json({ error: "Failed to fetch news" });
  }
}