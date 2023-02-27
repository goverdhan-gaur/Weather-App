import { serialize } from 'cookie'
import type { NextApiRequest, NextApiResponse } from 'next'

/**
 * Handler function for retrieving an access token from the Meteomatics API and setting it as a cookie.
 * @param {NextApiRequest} req - The incoming HTTP request.
 * @param {NextApiResponse} res - The HTTP response that will be sent back to the client.
 * @returns {Promise<void>} - A Promise that resolves when the response has been sent.
 *  
 * @api {get} `https://login.meteomatics.com/api/v1/token`
 * @apiName MeteoMatics API Auth
 * @headers 'Authorization',
        'Basic ' +
        Buffer.from(METEOMATIC_USERNAME + ':' + METEOMATIC_PASSWORD).toString('base64')
 *
 * @apiSuccess {Object} `{ status: 200, message: 'Access Granted'}`
 * @apiFailure {String} `{ status: 500, message: 'Something went wrong' }` 
 * 
 */

export default async function handler(
  // eslint-disable-next-line no-unused-vars
  req: NextApiRequest,
  res: NextApiResponse
) {
  /**
   *Set the Authorization header with the encoded Meteomatics API username and password.
   */
  const headers = new Headers()
  headers.set(
    'Authorization',
    'Basic ' +
      Buffer.from(
        process.env.METEOMATIC_USERNAME + ':' + process.env.METEOMATIC_PASSWORD
      ).toString('base64')
  )

  try {
    /**
     * Send a GET request to the Meteomatics API to retrieve an access token.
     */
    const response = await fetch('https://login.meteomatics.com/api/v1/token', {
      method: 'GET',
      headers: headers,
    })
    const data = await response.json()
    const token = data.access_token

    /**
     * Set the expiration time for the cookie.
     */
    const expires = new Date()
    expires.setHours(expires.getHours() + 1)

    /**
     * Set the cookie containing the access token in the response headers.
     */
    res.setHeader(
      'Set-Cookie',
      serialize('access_token', token, {
        maxAge: 60 * 60 * 24 * 7, // 1 week
        path: '/',
        httpOnly: true,
        sameSite: 'strict',
        secure: process.env.NODE_ENV === 'production', // Use HTTPS in production
      })
    )
    /**
     * Send a success response to the client.
     */
    res.status(200).json({ status: 200, message: 'Access Granted!!' })
  } catch (err) {
    /**
     * Send an error response to the client if something goes wrong.
     */
    console.log(err)
    res.status(500).json({ status: 500, message: 'Something went wrong' })
  }
}
