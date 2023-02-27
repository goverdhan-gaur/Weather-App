import React, { FunctionComponent } from 'react'
import * as Styled from './Message.styled'

/**
 *
 * @typedef {object} Props
 * @property {string} [type] - The type of message to display. Possible values are 'error', 'success', and 'warning'.
 * @property {string} message - The message to display.
 */
export type Props = {
  type?: string
  message: string
}

/**
 * @component
 * Message
 *
 * @description
 * React functional component that displays a message.
 *
 * @param {object} Props - The props object for the component.
 * @param {string} [Props.type] - The type of message to display. Possible values are 'error', 'success', and 'warning'.
 * @param {string} Props.message - The message to display.
 * @returns {JSX.Element} - The rendered Message component.
 * @example
 * <Message type="error" message="There was an error processing your request." />
 */
export const Message: FunctionComponent<Props> = ({ type, message }) => {
  return (
    <Styled.wrapper>
      <Styled.message type={type}>{message}</Styled.message>
    </Styled.wrapper>
  )
}
