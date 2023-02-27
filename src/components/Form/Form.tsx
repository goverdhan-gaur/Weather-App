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

/**
 * @component
 * Form
 * @description
 * Renders a form component that allows the user to select a location, a date range, and weather parameters to view weather data.
 *
 * @fields
 * The form contains the following fields:
 * - A location input field that uses the Google Maps Places API to provide location predictions.
 * - A "From" date input field that allows the user to select a start date for the weather data range.
 * - A "To" date input field that allows the user to select an end date for the weather data range.
 * - Checkbox inputs that allow the user to select the weather parameters to view.
 * If all required information is provided, the form can be submitted to retrieve weather data for the selected location, date range, and parameters.
 * The form dispatches actions to update the weather data in the Redux store.
 *
 * @hooksUsed
 *  * {@link "hooks/useMeteoMaticApi"}
 *  * {@link "hooks/useGoogleAPis"}
 *  * {@link "hooks/useDeviceDetection"}
 *
 * @example
 * ```
 * <Form />
 * ```
 * @returns A JSX form element.
 */
export const Form: FunctionComponent = () => {
  const dispatch = useDispatch()

  // Using useDeviceDetect hook to get the device type
  const { isTablet } = useDeviceDetect()
  // Using useMeteoMaticApi hook to the loading state and getweather data function
  const { loading, getWeatherData } = useMeteoMaticApi()
  // Using useGoogleAPis hook to the getCoordinates and getAddressPrediction functions
  const { getAddressPredictions, getCoordinates } = useGoogleAPis()

  /**
   * State variables to manage form values, errors, and predictions.
   */
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

  /**
   * @description This useEffect hook sets the maximum date that can be selected in the "To" date input field.
   * It calculates the maximum date based on the "From" date state variable and sets the "maxDate" state variable.
   */
  useEffect(() => {
    // Get the maximum date based on the "From" date state variable
    const maxDate = getFormattedDate(dateFrom.toString(), 1)
    // Set the "maxDate" state variable
    setMaxDate(maxDate)
  }, [dateFrom])

  /**
   * @description This useEffect hook checks if all the required information is available to make the API call.
   * If all the required information is available, it sets the "hasValues" state variable to true.
   * If any of the required information is missing, it sets the "hasValues" state variable to false.
   */
  useEffect(() => {
    // Check if all the required information is available
    if (
      coordinates &&
      dateFrom &&
      !locationError &&
      !fromDateError &&
      !toDateError &&
      parameters.length > 0
    ) {
      // Set the "hasValues" state variable to true if all the required information is available
      setHasValues(true)
    } else {
      // Set the "hasValues" state variable to false if any of the required information is missing
      setHasValues(false)
    }
  }, [
    coordinates,
    dateFrom,
    locationError,
    parameters,
    fromDateError,
    toDateError,
  ])

  /**
   * @public
   * Event handler for checkbox change events.
   * @param {ChangeEventHandler} event - The event object for the checkbox change event.
   * @name handleCheckboxChange
   */
  const handleCheckboxChange: ChangeEventHandler = (event) => {
    // The name of the checkbox parameter.
    const parameter = _.get(event, 'target.name', '')
    // The checked state of the checkbox.
    const checked = _.get(event, 'target.checked', '')
    if (checked) {
      // Add the parameter to the list of selected parameters.
      setParameters([...parameters, parameter])
    } else {
      // Remove the parameter from the list of selected parameters.
      setParameters(parameters.filter((p) => p !== parameter))
    }
  }

  /**
   * Handles form submission and dispatches actions to update weather data.
   * @param {FormEvent} event - The form event.
   */
  const handleFormSubmit = async (event: FormEvent) => {
    event.preventDefault()

    // Dispatch action to update data to initial state.
    dispatch({ type: 'UPDATE_DATA', payload: {} })

    // Construct form data object.
    const formData = {
      coordinates,
      parameters,
      dateFrom,
      dateTo,
    }

    // Fetch weather data using form data.
    const data = await getWeatherData(formData)

    // Dispatch action to update data with fetched weather data.
    dispatch({ type: 'UPDATE_DATA', payload: data })
  }

  /**
   * @description This function handles the change event for the "From" date input field.
   * It checks whether the selected date is later than the current date and sets an error message if not.
   * If the selected date is valid, it sets the "From" date state variable to the selected date.
   * @param {ChangeEventHandler} event - The change event.
   */
  const handleFromDateChange: ChangeEventHandler = (event) => {
    // Get the value of the input field
    const value = _.get(event, 'target.value', '')

    // Convert the selected date to a Date object
    const selectedDate = new Date(value)

    // Get the current date as a Date object
    const minDate = new Date(currDate)

    // Check if the selected date is earlier than the current date
    if (selectedDate < minDate) {
      // Set an error message if the selected date is not valid
      setFromDateError(`Please select ${currDate} and later`)
    } else {
      // Clear the error message and set the "From" date state variable to the selected date
      setFromDateError('')
      setDateFrom(value)
    }
  }

  /**
   * @description This function handles the change event for the "To" date input field.
   * It checks whether the selected date is within the valid range (between the "From" date and the "maxDate").
   * If the selected date is outside the valid range, it sets an error message.0
   * If the selected date is within the valid range, it sets the "To" date state variable to the selected date.
   * @param {ChangeEventHandler} event - The change event.
   */
  const handleToDateChange: ChangeEventHandler = (event) => {
    // Get the value of the input field
    const value = _.get(event, 'target.value', '')

    // Convert the selected date to a Date object
    const selectedDate = new Date(value)

    // Get the minimum and maximum valid dates as Date objects
    const min = new Date(dateFrom)
    const max = new Date(maxDate)

    // Check if the selected date is outside the valid range
    if (!(selectedDate >= min) || !(selectedDate <= max)) {
      // Set an error message if the selected date is not within the valid range
      setToDateError(`Please select ${dateTo} and earlier`)
    } else {
      // Clear the error message and set the "To" date state variable to the selected date
      setToDateError('')
      setDateTo(value)
    }
  }

  /**
   * @description This function handles the selection of a location from the list of predicted locations.
   * It takes in the location name and place ID as parameters, and sets the location state variable to the name of the selected location.
   * It then uses the place ID to get the coordinates of the selected location from the Google Places API using the "getCoordinates" function from the "useGoogleAPIs" hook.
   * If the coordinates are successfully retrieved, it sets the "coordinates" state variable to the coordinates of the selected location.
   * Finally, it clears the list of predicted locations by setting the "predictedLocations" state variable to undefined.
   * @param location - The name of the selected location.
   * @param place_id - The place ID of the selected location.
   */
  const handleItemSelect = async (location: string, place_id: string) => {
    // Get the place ID value
    const value = place_id
    // Get the location address value
    const address = location
    // Get the coordinates of the selected location using the place ID
    const coordinates = value ? await getCoordinates(value) : []
    // Set the "location" state variable to the selected location
    setLocation(address)
    // If the coordinates are successfully retrieved, set the "coordinates" state variable to the coordinates of the selected location
    coordinates.lat && coordinates.lng && setCoordinates(coordinates)
    // Clear the list of predicted locations by setting the "predictedLocations" state variable to undefined
    setPredictedLocations(undefined)
  }

  /**
   * Handles changes to the location input field and updates the state accordingly.
   * @param event - The ChangeEvent object representing the change to the input field.
   * @returns Promise<void>
   */
  const handleLocationInputChange: ChangeEventHandler = async (event) => {
    // Extract the input value from the ChangeEvent object
    const value = _.get(event, 'target.value', '')
    // Update the location state with the input value
    setLocation(value)
    // Retrieve a list of predicted addresses based on the input value
    const predictions = value ? await getAddressPredictions(value) : []
    // Update the predictedLocations state with the list of predicted addresses
    setPredictedLocations(predictions)
    // Set the location error state if there are no predictions and a value was entered
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
              max={maxDate}
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
