import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const url = `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${req.query.location}&types=(cities)&key=${process.env.GOOGLE_API_KEY}`
    const response = await fetch(url)
    const data = await response.json()
    const predictions = data.predictions
    res.status(200).json(predictions)
  } catch (err) {
    console.log(err)
    res.status(500).json({ message: 'Something went wrong' })
  }
}
