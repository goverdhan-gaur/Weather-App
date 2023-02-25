import React, { FunctionComponent } from 'react'
import * as Styled from './VisualizationsContainer.styled'
type Props = {
  //
  data: []
}
export const VisualizationsContainer: FunctionComponent<Props> = () => {
  return <Styled.wrapper>data loaded</Styled.wrapper>
}
