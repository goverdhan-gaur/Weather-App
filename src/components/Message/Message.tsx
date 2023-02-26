import React, { FunctionComponent } from 'react'
import * as Styled from './Message.styled'

type Props = {
  type?: string
  message: string
}

export const Message: FunctionComponent<Props> = ({ type, message }) => {
  return (
    <Styled.wrapper>
      <Styled.message type={type}>{message}</Styled.message>
    </Styled.wrapper>
  )
}
