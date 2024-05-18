import { getRem } from '@/mixins/getRemUnits'
import { colors } from '@/utils/themes'
import  { ReactNode } from 'react'
import styled from 'styled-components'

export const wrapper = styled.div``

interface MessageProps{
  type?:string
  children?:ReactNode
}

export const message = styled.span<MessageProps>`
  display: block;
  color: ${({ type }) =>
    type === 'error' ? colors.accentLightPink : colors.accentLightPurple};
  text-align: left;
  font-size: ${getRem(12)};
  font-style: italic;
`
