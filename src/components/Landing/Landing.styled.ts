import { colors } from '@/utils/themes'
import { ReactNode } from 'react'
import styled from 'styled-components'
interface WrapperProps {
  isSafari?: boolean
  isMobile?: boolean
  children?: ReactNode
}
export const wrapper = styled.div<WrapperProps>`
  position:relative;
  background-color: ${colors.charcoalGray};
  width: 100%;
  height:${({ isSafari, isMobile }) => ((isSafari && isMobile) ? '90vh' : '100vh')};
  overflow: hidden;
  color: ${colors.lightBlueGray};
  text-align: center;
`
export const info = styled.p`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  color: ${colors.charcoalGray};
`
