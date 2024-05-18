import type { NextApiRequest, NextApiResponse } from 'next'

/**
 * A Next.js API route that fetches city predictions using the Google Places API autocomplete endpoint.
 * @param {NextApiRequest} req - The incoming request object.
 * @param {NextApiResponse} res - The outgoing response object.
 * @returns {Promise<void>} - A Promise that resolves when the response has been sent.
 *
 * @api {get} `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${req.query.location}&types=(cities)&key=${process.env.GOOGLE_API_KEY}`
 * @apiVariables `{input: req.query.location, key: GOOGLE_API_KEY}`
 * @apiName Google Places API.
 * @apiSuccess {Array} `[predictions] : Array of predictions`
 * @apiFailure {Object} `{ status: 500, message: 'Something went wrong' }`
 * @group one
 */
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    console.log(req.query)
    const url = `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${req.query.location}&types=(cities)&key=${process.env.GOOGLE_API_KEY}`
    const response = await fetch(url)
    console.log(response)
    const data = await response.json()
    console.log(data)
    const predictions = data.predictions
    /**
     * Send a success response to the client.
     */
    res.status(200).json(predictions)
  } catch (err) {
    /**
     * Send an error response to the client if something goes wrong.
     */
    console.log(err)
    res.status(500).json({ message: 'Something went wrong' })
  }
}
