import React, { FunctionComponent, ReactNode } from 'react'
import * as Styled from './FormGroup.styled'

interface Props {
  children: ReactNode
  col: number
  groupLabel?: string
  width?: string
}

export const FormGroup: FunctionComponent<Props> = ({
  children,
  col,
  groupLabel,
  width = '',
}) => {
  return (
    <Styled.wrapper>
      {groupLabel && <Styled.label>{groupLabel}</Styled.label>}
      <Styled.grid width={width} col={col}>
        {children}
      </Styled.grid>
    </Styled.wrapper>
  )
}
