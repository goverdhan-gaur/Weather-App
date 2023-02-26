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
import { Message } from '../Message/Message'

type Props = {
  //
}

export const Form: FunctionComponent<Props> = () => {
  const { isTablet } = useDeviceDetect()
  const { loading, getWeatherData } = useMeteoMaticApi()
  const { getAddressPredictions, getCoordinates } = useGoogleAPis()
  const dispatch = useDispatch()

  const [hasValues, setHasValues] = useState(false)
  const [locationError, setLocationError] = useState('')
  const [fromDateError, setFromDateError] = useState('')
  const [toDateError, setToDateError] = useState('')
  const [maxDate, setMaxDate] = useState('')
  const [location, setLocation] = useState('')
  const [coordinates, setCoordinates] = useState<{ lat: number; lng: number }>()
  const currDate = getFormattedDate(new Date().toString(), 0, false)
  const [dateFrom, setDateFrom] = useState(
    getFormattedDate(new Date().toString(), 0, false)
  )
  const [dateTo, setDateTo] = useState(
    getFormattedDate(new Date().toString(), 1, false)
  )
  const [parameters, setParameters] = useState<string[]>([])

  const [predictedLocations, setPredictedLocations] = useState()

  useEffect(() => {
    const maxDate = getFormattedDate(dateFrom.toString(), 1)
    setMaxDate(maxDate)
  }, [dateFrom])

  useEffect(() => {
    if (
      coordinates &&
      dateFrom &&
      !fromDateError &&
      !toDateError &&
      parameters.length > 0
    ) {
      setHasValues(true)
    } else {
      setHasValues(false)
    }
  }, [coordinates, dateFrom, parameters, fromDateError, toDateError])

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
      dateFrom,
      dateTo,
    }

    const data = await getWeatherData(formData)
    dispatch({ type: 'UPDATE_DATA', payload: data })
  }

  const handleFromDateChange: ChangeEventHandler = (event) => {
    const value = _.get(event, 'target.value', '')
    const selectedDate = new Date(value)
    const minDate = new Date(currDate)

    if (selectedDate < minDate) {
      setFromDateError(`Please select ${currDate} and later`)
    } else {
      setFromDateError('')
      setDateFrom(value)
    }
  }

  const handleToDateChange: ChangeEventHandler = (event) => {
    const value = _.get(event, 'target.value', '')

    const selectedDate = new Date(value)
    const min = new Date(dateFrom)
    const max = new Date(maxDate)

    if (!(selectedDate >= min) || !(selectedDate <= max)) {
      setToDateError(`Please select ${dateTo} and earlier`)
    } else {
      setToDateError('')
      setDateTo(value)
    }
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

    !predictions.length && value
      ? setLocationError('Please enter a valid location')
      : setLocationError('')
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
              error={locationError}
              dropDownList={predictedLocations}
              onChange={handleLocationInputChange}
              onSelect={handleItemSelect}
            />

            <FormInput
              label="from"
              type="datetime-local"
              name="dateFrom"
              icon="date"
              error={fromDateError}
              defaultValue={dateFrom}
              min={currDate}
              onChange={handleFromDateChange}
            />
            <FormInput
              label="To"
              type="datetime-local"
              name="dateTo"
              icon="date"
              error={toDateError}
              defaultValue={dateTo}
              min={dateFrom}
              max={dateTo}
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
            <Message message="Please select atleast 1 parameter" />
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
