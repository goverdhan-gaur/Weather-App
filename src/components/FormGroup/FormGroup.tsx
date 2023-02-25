import React, { FunctionComponent, ReactNode } from 'react'
import * as Styled from './FormGroup.styled'

interface Props {
  children: ReactNode
  col: number
  groupLabel?: string
}

export const FormGroup: FunctionComponent<Props> = ({
  children,
  col,
  groupLabel,
}) => {
  return (
    <Styled.wrapper>
      {groupLabel && <Styled.label>{groupLabel}</Styled.label>}
      <Styled.grid col={col}>{children}</Styled.grid>
    </Styled.wrapper>
  )
}
