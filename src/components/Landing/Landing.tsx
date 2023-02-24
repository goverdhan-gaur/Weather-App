import React, { FunctionComponent } from 'react'
import * as Styled from './Landing.styled'
// import useDeviceDetect from '@/hooks/useDeviceDetection'
import { Heading } from '../Heading/Heading'
type Props = {
  //
}
export const Landing: FunctionComponent<Props> = () => {
  // const { isMobile } = useDeviceDetect()
  return (
    <Styled.wrapper>
      <Heading />
    </Styled.wrapper>
  )

  // Heading

  // Form fields
  // visualization
}
