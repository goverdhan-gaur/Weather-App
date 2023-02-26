import React, {
  ChangeEventHandler,
  FormEvent,
  FunctionComponent,
  useEffect,
  useState,
} from 'react'
import * as Styled from './Form.styled'
import { FormGroup } from '../FormGroup/FormGroup'
import { FormInput } from '../FormInput/FormInput'
import { getFormattedDate } from '@/utils/getFormattedDate'
import _ from 'lodash'
import useGoogleAPis from '@/hooks/useGoogleAPis'
import useMeteoMaticApi from '@/hooks/useMeteoMaticApi'
import { useDispatch } from 'react-redux'
import useDeviceDetect from '@/hooks/useDeviceDetection'

type Props = {
  //
}

export const Form: FunctionComponent<Props> = () => {
  const { isTablet } = useDeviceDetect()
  const { loading, getWeatherData } = useMeteoMaticApi()
  const { getAddressPredictions, getCoordinates } = useGoogleAPis()
  const dispatch = useDispatch()

  const [hasValues, setHasValues] = useState(false)
  const [location, setLocation] = useState('')
  const [coordinates, setCoordinates] = useState<{ lat: number; lng: number }>()
  const currDate = getFormattedDate(new Date().toString(), 0, false)
  const [timeFrom, setTimeFrom] = useState(
    getFormattedDate(new Date().toString(), 0, false)
  )
  const [timeTo, setTimeTo] = useState(
    getFormattedDate(new Date().toString(), 1, false)
  )
  const [parameters, setParameters] = useState<string[]>([])

  const [predictedLocations, setPredictedLocations] = useState()

  useEffect(() => {
    const timeTo = getFormattedDate(timeFrom.toString(), 1)
    setTimeTo(timeTo)
  }, [timeFrom])

  useEffect(() => {
    if (coordinates && timeFrom && parameters.length > 0) {
      setHasValues(true)
    } else {
      setHasValues(false)
    }
  }, [coordinates, timeFrom, parameters])

  const handleCheckboxChange: ChangeEventHandler = (event) => {
    const parameter = _.get(event, 'target.name', '')
    const checked = _.get(event, 'target.checked', '')
    if (checked) {
      setParameters([...parameters, parameter])
    } else {
      setParameters(parameters.filter((p) => p !== parameter))
    }
  }

  const handleFormSubmit = async (event: FormEvent) => {
    event.preventDefault()
    dispatch({ type: 'UPDATE_DATA', payload: {} })
    const formData = {
      coordinates,
      parameters,
      timeFrom,
      timeTo,
    }

    const data = await getWeatherData(formData)
    dispatch({ type: 'UPDATE_DATA', payload: data })
  }

  const handleFromDateChange: ChangeEventHandler = (event) => {
    const value = _.get(event, 'target.value', '')
    setTimeFrom(value)
  }

  const handleToDateChange: ChangeEventHandler = (event) => {
    const value = _.get(event, 'target.value', '')
    setTimeTo(value)
  }

  const handleItemSelect = async (location: string, place_id: string) => {
    const value = place_id
    const address = location
    const coordinates = value ? await getCoordinates(value) : []
    setLocation(address)
    coordinates.lat && coordinates.lng && setCoordinates(coordinates)
    setPredictedLocations(undefined)
  }

  const handleLocationInputChange: ChangeEventHandler = async (event) => {
    const value = _.get(event, 'target.value', '')
    setLocation(value)
    const predictions = value ? await getAddressPredictions(value) : []
    setPredictedLocations(predictions)
  }

  const parametersList = [
    'Temperature',
    'Min. Temperature',
    'Precipitation',
    'Max. Temperature',
    'Sea Level Pressure',
    'Wind Speed',
  ]

  return (
    <Styled.wrapper>
      <Styled.form onSubmit={handleFormSubmit}>
        <FormGroup col={isTablet ? 2 : 1}>
          <FormGroup col={1}>
            <FormInput
              type="text"
              label="location"
              icon="location"
              value={location}
              dropDownList={predictedLocations}
              onChange={handleLocationInputChange}
              onSelect={handleItemSelect}
            />
            <FormInput
              label="from"
              type="datetime-local"
              name="timefrom"
              icon="date"
              defaultValue={timeFrom}
              min={currDate}
              onChange={handleFromDateChange}
            />
            <FormInput
              label="To"
              type="datetime-local"
              name="timeto"
              icon="date"
              defaultValue={timeTo}
              min={timeFrom}
              max={timeTo}
              onChange={handleToDateChange}
            />
          </FormGroup>
          <FormGroup col={1}>
            <FormGroup groupLabel="Select Parameters" col={2}>
              {parametersList.map((parameter) => {
                return (
                  <FormInput
                    key={parameter}
                    type="checkbox"
                    label={parameter}
                    name={parameter}
                    onChange={handleCheckboxChange}
                  />
                )
              })}
            </FormGroup>
            <FormInput
              type="submit"
              isDisabled={!hasValues}
              value={loading ? 'Loading...' : 'Submit'}
            />
          </FormGroup>
        </FormGroup>
      </Styled.form>
    </Styled.wrapper>
  )
}
