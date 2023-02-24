import React, { FunctionComponent } from 'react'
import * as Styled from './Heading.styled'
type Props = {
  //
}
export const Heading: FunctionComponent<Props> = () => {
  return <Styled.h1>Weather App</Styled.h1>
}
