import React, { FunctionComponent } from 'react'
import * as Styled from './Landing.styled'
// import useDeviceDetect from '@/hooks/useDeviceDetection'
import { Heading } from '../Heading/Heading'
import { Form } from '../Form/Form'
import { useSelector } from 'react-redux'
import { VisualizationsContainer } from '../VisualizationsContainer/VisualizationsContainer'
type Props = {
  //
}
export const Landing: FunctionComponent<Props> = () => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const weatherData = useSelector((state: any) => state.data)
  const { data } = weatherData
  console.log(data)
  return (
    <Styled.wrapper>
      <Heading />
      <Form />
      {data && <VisualizationsContainer data={data} />}
    </Styled.wrapper>
  )
}
