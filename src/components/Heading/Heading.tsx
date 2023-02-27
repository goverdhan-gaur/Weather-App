import React, { FunctionComponent } from 'react'
import * as Styled from './Heading.styled'

/**
 * @component
 * Heading
 * @description
 * A functional component that renders the heading of the Weather App.
 * @param {Props} props - The props object.
 * @example
 * ```
 * <Heading />
 * ```
 * @returns {JSX.Element} A JSX element representing the heading of the Weather App.
 */
export const Heading: FunctionComponent = () => {
  return <Styled.h1>Weather App</Styled.h1>
}
