import { colors } from '@/utils/themes'
import styled from 'styled-components'
export const wrapper = styled.div`
  background-color: ${colors.charcoalGray};
  width: 100%;
  height: 100vh;
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
