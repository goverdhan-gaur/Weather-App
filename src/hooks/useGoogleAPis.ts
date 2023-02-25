import axios from 'axios'

function useGoogleAPis() {
  async function getAddressPredictions(location: string) {
    const response = await axios.get('/api/locationprediction', {
      params: {
        location: location,
      },
    })
    const data = await response.data
    return data
  }

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
