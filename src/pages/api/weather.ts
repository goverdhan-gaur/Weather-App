import { parse } from 'cookie'
import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(
  // eslint-disable-next-line no-unused-vars
  req: NextApiRequest,
  res: NextApiResponse
) {
  // Get a cookie
  const { access_token } = parse(req.headers.cookie || '')

  try {
    const url = `https://api.meteomatics.com/${req.query.url}?access_token=${access_token}`

    const response = await fetch(url)
    const data = await response.json()
    res.status(200).json(data)
  } catch (err) {
    console.log(err)
    res.status(500).json({ message: 'Something went wrong' })
  }
}
