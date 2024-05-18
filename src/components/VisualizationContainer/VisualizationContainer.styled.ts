import { getRem } from '@/mixins/getRemUnits'
import { colors } from '@/utils/themes'
import { ReactRef } from '@gsap/react'
import { ReactNode } from 'react'
import styled from 'styled-components'
interface BackdropProps{
  onClick?:() => void
  ref?: ReactRef
}
export const backdrop = styled.div<BackdropProps>`
  position: absolute;
  width: 100%;
  height: 100vh;
  background: ${colors.charcoalGray}90;
  z-index: 8;
  top: 0;
  visibility:hidden;
`
interface MobileProp{
  isMobile?:boolean
  ref?: ReactRef
  children?:ReactNode
}
export const close = styled.span<MobileProp>`
  display: ${({ isMobile }) => (isMobile ? 'block' : 'none')};
  position: absolute;
  top: ${getRem(5)};
  right: ${getRem(5)};
  color: black;
  font-size: ${getRem(26)};
`

export const wrapper = styled.div<MobileProp>`
  position: ${({ isMobile }) => (isMobile ? 'absolute' : 'relative')};
  z-index: 10;
  height: 50vh;
  bottom: ${({ isMobile }) => (isMobile ? '-50vh' : '0')};
  padding: 2rem 1rem;

  width: calc(100%);
  background: ${colors.white};
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
  ${({ isMobile }) =>
    !isMobile &&
    `
      border-bottom-left-radius: 10px;
      border-bottom-right-radius: 10px;
      margin: ${getRem(48)} auto;
      width: calc(90%);
      `}
`
