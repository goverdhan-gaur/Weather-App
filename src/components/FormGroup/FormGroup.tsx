import React, { FunctionComponent, ReactNode } from 'react'
import * as Styled from './FormGroup.styled'

/**
 * @typedef {object} Props
 */
export interface Props {
  /** React children. */
  children: ReactNode
  /** Number of columns */
  col: number
  /** Group Label */
  groupLabel?: string
  /** Width */
  width?: string
}

/**
 * @component
 * FormGroup
 * @description
 * FormGroup component represents a group of form elements.
 * It arranges its children in a grid-like layout based on the number of columns.
 * It also accepts an optional label for the group and a custom width.
 * @param children - The React nodes to be rendered as form elements.
 * @param col - The number of columns to display the form elements.
 * @param (Optional) groupLabel - An optional label for the form group.
 * @param (Optional) width - An optional custom width for the form group.
 * @returns A React component representing a group of form elements.
 * @example
 *
 * <FormGroup col={2} groupLabel="Personal Information">
 * <Input label="Name" type="text" name="name" />
 * <Input label="Phone Number" type="text" name="phone" />
 * </FormGroup>
 *
 */
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
