import { parse } from 'cookie'
import type { NextApiRequest, NextApiResponse } from 'next'

/**
 * Retrieve weather data from MeteoMatics APi using a stored access token.
 * @param {NextApiRequest} req - The incoming request object.
 * @param {NextApiResponse} res - The outgoing response object.
 * @returns {Promise<void>} - A Promise that resolves when the response has been sent.
 *
 * @api {get} `https://api.meteomatics.com/${req.query.url}?access_token=${access_token}`
 * @apiVariables `{access_token: access_token, url: req.query.url}`
 * @apiName MeteoMatic API.
 * @apiSuccess {Object} `{data} : Weather Data`
 * @apiFailure {Object} `{ status: 500, message: 'Something went wrong' }`
 * @group one
 */
export default async function handler(
  // eslint-disable-next-line no-unused-vars
  req: NextApiRequest,
  res: NextApiResponse
) {
  /**
   * Get access_token from cookie
   */
  const { access_token } = parse(req.headers.cookie || '')

  try {
    const url = `https://api.meteomatics.com/${req.query.url}?access_token=${access_token}`
    const response = await fetch(url)
    const data = await response.json()

    /**
     * Send a success response to the client.
     */
    res.status(200).json(data)
  } catch (err) {
    /**
     * Send an error response to the client if something goes wrong.
     */
    console.log(err)
    res.status(500).json({ message: 'Something went wrong' })
  }
}
