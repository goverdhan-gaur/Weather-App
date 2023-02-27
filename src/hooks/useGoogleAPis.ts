import axios from 'axios'

/**
 * A custom hook for making API requests to Google APIs related to location and address prediction.
 * @remarks It uses axios for making the HTTP requests to Next APIs.
 * @returns An object with two methods: getAddressPredictions and getCoordinates.
 */
function useGoogleAPis() {
  /**
   * @api `/api/locationprediction`
   * @description Fetches location predictions from Google Places Autocomplete API based on the user's input.
   * @param location - The user's search query.
   * @returns A Promise that resolves to an array of location predictions in JSON format.
   */
  async function getAddressPredictions(location: string) {
    const response = await axios.get('/api/locationprediction', {
      params: {
        location: location,
      },
    })
    const data = await response.data
    return data
  }

  /**
   * @api `/api/coordinates`
   * @description Fetches the latitude and longitude coordinates of a place based on the place ID returned by the Google Places Autocomplete API.
   * @param place_id - The unique identifier of the place.
   * @returns A Promise that resolves to an object containing the latitude and longitude coordinates of the place.
   */
  async function getCoordinates(place_id: string) {
    const response = await axios.get('/api/coordinates', {
      params: {
        place_id: place_id,
      },
    })
    const data = await response.data
    return data
  }

  return { getAddressPredictions, getCoordinates }
}

export default useGoogleAPis
