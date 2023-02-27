import axios from 'axios'
import { useState } from 'react'

/**
 * Represents the form data required to fetch weather data.
 */
export interface FormData {
  /** The latitude and longitude of the location to fetch weather data for. */
  coordinates: { lat: number; lng: number } | undefined
  /** The parameters to fetch weather data for. */
  parameters: string[]
  /** The start date and time for the weather data, in ISO format. */
  dateFrom: string
  /** The end date and time for the weather data, in ISO format. */
  dateTo: string
}

/**
 * An object that maps parameter names to their corresponding Meteomatics API codes.
 */
const parametersList = {
  Temperature: 't_2m:C',
  'Min. Temperature': 't_min_2m_24h:C',
  Precipitation: 'precip_1h:mm',
  'Max. Temperature': 't_max_2m_24h:C',
  'Sea Level Pressure': 'msl_pressure:hPa',
  'Wind Speed': 'wind_speed_10m:ms',
}

/**
 * A custom React hook for fetching weather data from the Meteomatics API.
 *
 * @returns An object containing the `getWeatherData` function for fetching weather data, as well as
 * the `loading` and `error` state variables.
 */
function useMeteoMaticApi() {
  /** A state variable indicating whether weather data is currently being fetched. */
  const [loading, setLoading] = useState(false)
  /** A state variable containing an error message if an error occurred while fetching weather data. */
  const [error, setError] = useState('')

  /**
   * Generates the URL for fetching weather data from the Meteomatics API based on the provided form data.
   *
   * @param formData - The form data used to generate the URL.
   * @returns The URL for fetching weather data from the Meteomatics API.
   */
  const generateUrl = ({
    coordinates,
    parameters,
    dateFrom,
    dateTo,
  }: FormData) => {
    const params = parameters.map(
      (param: string) => parametersList[param as keyof typeof parametersList]
    )
    const urlParameters = params.join()
    const urlValidateTime = `${dateFrom}Z--${dateTo}Z`
    const urlLocation = `${coordinates?.lat},${coordinates?.lng}`
    const finalUrl = `${urlValidateTime}/${urlParameters}/${urlLocation}/json`
    return finalUrl
  }

  /**
   * Fetches weather data from a Next API /api/weather
   * @async
   * @api `/api/weather`
   * @function
   * @param {FormData} formData - The form data containing the weather parameters and location coordinates.
   * @throws {Error} An error is thrown if there is an issue with fetching the weather data.
   * @returns {Promise<Object|null>} A Promise that resolves with the weather data as an object or null if an error occurred.
   * @see To see the Next Api: {@link "pages/api/weather"}
   * @see {@link https://www.meteomatics.com/en/api/available-parameters/} for available weather parameters.
   * @see {@link https://www.meteomatics.com/en/api/request/} for information on how to use the API.
   * @example
   * const { getWeatherData } = useMeteoMaticApi();
   * const formData = {
   * coordinates: { lat: 47.3769, lng: 8.5417 },
   * parameters: ['Temperature', 'Precipitation'],
   * dateFrom: '2022-02-26T00:00:00',
   * dateTo: '2022-02-27T00:00:00',
   * };
   * const weatherData = await getWeatherData(formData);
   */
  async function getWeatherData(formData: FormData) {
    setLoading(true)
    setError('')

    try {
      const url = generateUrl(formData)
      const response = await axios.get('/api/weather', { params: { url: url } })
      const data = response.data
      setLoading(false)
      return data
    } catch (error) {
      setLoading(false)
      setError('An error occurred while fetching the weather data.')
      return null
    }
  }

  return { getWeatherData, loading, error }
}

export default useMeteoMaticApi
