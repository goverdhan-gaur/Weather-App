import type { NextApiRequest, NextApiResponse } from 'next'

/**
 * A Next.js API route that fetches the coordinates of a location using the Google Places API.
 * @param {NextApiRequest} req - The incoming request object.
 * @param {NextApiResponse} res - The outgoing response object.
 * @returns {Promise<void>} - A Promise that resolves when the response has been sent.
 *
 * @api {get} `https://maps.googleapis.com/maps/api/place/details/json?place_id=${req.query.place_id}&key=${process.env.GOOGLE_API_KEY}`
 * @apiVariables `{place_id: req.query.place_id, key: GOOGLE_API_KEY}`
 * @apiName Google Places API.
 * @apiSuccess {Object} `{ lat, lng }` : Latitude and Longitute
 * @apiFailure {Object} `{ status: 500, message: 'Something went wrong' }`
 * @group one
 */
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    /**
     * Send a GET request to the Google Place API to get the coordinates.
     */
    const response = await fetch(
      `https://maps.googleapis.com/maps/api/place/details/json?place_id=${req.query.place_id}&key=${process.env.GOOGLE_API_KEY}`
    )
    const data = await response.json()
    const coordinates = data.result.geometry.location

    /**
     * Send a success response to the client.
     */
    res.status(200).json(coordinates)
  } catch (err) {
    /**
     * Send an error response to the client if something goes wrong.
     */
    console.log(err)
    res.status(500).json({ message: 'Something went wrong' })
  }
}
