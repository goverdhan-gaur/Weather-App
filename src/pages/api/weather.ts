import { parse } from 'cookie'
import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(
  // eslint-disable-next-line no-unused-vars
  req: NextApiRequest,
  res: NextApiResponse
) {
  // Get a cookie
  const { access_token } = parse(req.headers.cookie || '')
  console.log(access_token)

  try {
    const url = `https://api.meteomatics.com/2023-02-23T00:00:00Z--2023-02-2T00:00:00Z/t_2m:C/52.520551,13.461804/json?access_token=${access_token}`
    console.log(url)
    const response = await fetch(url)
    const data = await response.json()
    console.log(data)
    res.status(200).json(data)
  } catch (err) {
    console.log(err)
    res.status(500).json({ message: 'Something went wrong' })
  }
}
