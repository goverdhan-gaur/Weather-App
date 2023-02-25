import axios from 'axios'
import { useState } from 'react'
// import { useState } from 'react';

interface FormData {
  coordinates: { lat: number; lng: number } | undefined
  parameters: string[]
  timeFrom: string
  timeTo: string
}

const parametersList = {
  Temperature: 't_2m:C',
  'Min. Temperature': 't_min_2m_24h:C',
  Precipitation: 'precip_1h:mm',
  'Max. Temperature': 't_max_2m_24h:C',
  'Sea Level Pressure': 'msl_pressure:hPa',
  'Wind Speed': 'wind_speed_10m:ms',
}
function useMeteoMaticApi() {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const generateUrl = ({
    coordinates,
    parameters,
    timeFrom,
    timeTo,
  }: FormData) => {
    const params = parameters.map(
      (param: string) => parametersList[param as keyof typeof parametersList]
    )

    const urlParameters = params.join()

    const urlValidateTime = `${timeFrom}Z--${timeTo}Z:PT1H`

    const urlLocation = `${coordinates?.lat},${coordinates?.lng}`

    const finalUrl = `${urlValidateTime}/${urlParameters}/${urlLocation}/json`

    return finalUrl
  }

  // const [weatherData, setWeatherData] = useState();
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
