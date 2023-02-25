import React, { FunctionComponent } from 'react'
import * as Styled from './Landing.styled'
// import useDeviceDetect from '@/hooks/useDeviceDetection'
import { Heading } from '../Heading/Heading'
// import useDeviceDetect from '@/hooks/useDeviceDetection'
import { Form } from '../Form/Form'
type Props = {
  //
}
export const Landing: FunctionComponent<Props> = () => {
  return (
    <Styled.wrapper>
      <Heading />
      <Form />
    </Styled.wrapper>
  )

  // Heading

  // Form fields
  // visualization
}
