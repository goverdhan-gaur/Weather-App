import { useState, useEffect } from 'react'
import axios from 'axios'

/**
 * @api `/api/auth/access_token`
 * @method getAuthToken
 * @description Retrieve an authentication token from the server.
 * @returns {Promise<Object>} - A promise containing the response data of the API call.
 */
export async function getAuthToken() {
  const response = await axios.get('/api/auth/access_token')
  const data = await response.data
  return data
}

/**
 *
 * @description Custom React hook that retrieves and refreshes an authentication token from the server.
 * @returns {Object} - An object containing the authentication token.
 * @property {string} authToken - The authentication token.
 * @method {@link "getAuthToken"}
 * @api `/api/auth/access_token`
 */
function useAuthToken() {
  const [authToken, setAuthToken] = useState('null')

  /**
   * Retrieve the authentication token from the server on initial render.
   */
  useEffect(() => {
    const fetchAuthToken = async () => {
      const data = await getAuthToken()
      setAuthToken(data)
    }

    fetchAuthToken()
  }, [])

  /**
   * Refresh the authentication token every hour using an interval.
   */
  useEffect(() => {
    const intervalId = setInterval(async () => {
      const token = await getAuthToken()
      setAuthToken(token)
    }, 3600000)
    return () => clearInterval(intervalId)
  }, [])

  return { authToken }
}

export default useAuthToken
