import React, { FunctionComponent, useEffect, useState } from 'react'
import * as Styled from './Landing.styled'
import { Heading } from '../Heading/Heading'
import { useSelector } from 'react-redux'
import { VisualizationsChart } from '../VisualizationsChart/VisualizationsChart'
import { VisualizationContainer } from '../VisualizationContainer/VisualizationContainer'
import { FormGroup } from '../FormGroup/FormGroup'
import useDeviceDetect from '@/hooks/useDeviceDetection'
import { Form } from '../Form/Form'

/**
 * An object that contains the list of available weather parameters and their corresponding API values.
 */
const parametersList = {
  'Temperature(C°)': 't_2m:C',
  'Min. Temperature(C°)': 't_min_2m_24h:C',
  'Precipitation(mm)': 'precip_1h:mm',
  'Max. Temperature(C°)': 't_max_2m_24h:C',
  'Sea Level Pressure(hPa)': 'msl_pressure:hPa',
  'Wind Speed(ms)': 'wind_speed_10m:ms',
}

/**
 * A helper function that retrieves the corresponding weather parameter label given its API value.
 * @param {string }value - The API value of the weather parameter.
 * @returns The label of the weather parameter.
 */
const getKeyFromValue = (value: string): string | undefined => {
  if (!parametersList) {
    return undefined
  }
  for (const [key, val] of Object.entries(parametersList)) {
    if (val === value) {
      return key
    }
  }
  return undefined
}

/**
 * @component Landing
 * @description A component that displays the landing page of the application.
 * @example
 * return (
 *    <Landing />
 * )
 */
export const Landing: FunctionComponent = () => {
  const [data, setData] = useState()
  const [labels, setLabels] = useState<string[]>()
  const { isDesktop, isMobile, isSafari } = useDeviceDetect()

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const weatherData = useSelector((state: any) => state.data)

  useEffect(() => {
    if (weatherData) {
      const { data } = weatherData
      setData(data)
      const labels = data?.map((map: { parameter: string }) =>
        getKeyFromValue(map.parameter)
      )

      setLabels(labels)
    }
  }, [weatherData])

  return (
    <Styled.wrapper isSafari={isSafari} isMobile={isMobile}>
      <Heading />
      <FormGroup col={isDesktop ? 2 : 1} width={isDesktop ? '80%' : '100%'}>
        <Form />
        <VisualizationContainer>
          {data ? (
            <VisualizationsChart labels={labels} data={data} />
          ) : (
            <Styled.info>
              Please select parameters and location to generate the chart.
            </Styled.info>
          )}
        </VisualizationContainer>
      </FormGroup>
    </Styled.wrapper>
  )
}
