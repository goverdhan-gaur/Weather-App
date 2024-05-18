import { getRem } from '@/mixins/getRemUnits'
import { ReactNode } from 'react';
import styled from 'styled-components'
interface GridProps{
  children?: ReactNode
  col: number; 
  width: string
}
export const grid = styled.div<GridProps>`
  width: ${({ width }) => (width ? width : '100%')};
  display: grid;
  grid-template-columns: repeat(${({ col }) => col}, 1fr);
  gap: ${getRem(20)};
  place-items: cemter;
  margin: 0 auto;
`

export const wrapper = styled.div``

export const label = styled.h3`
  color: white;
  font-size: ${getRem(14)};
  text-transform: capitalize;
  margin-bottom: ${getRem(10)};
  text-align: left;
`
