import { getRem } from '@/mixins/getRemUnits'
import styled from 'styled-components'
export const grid = styled.div<{ col: number }>`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(${({ col }) => col}, 1fr);
  gap: ${getRem(20)};
  place-items: cemter;
`
export const wrapper = styled.div`
  margin: ${getRem(25)} 0;

  &:last-child {
    margin-bottom: 0;
  }
`
export const label = styled.h3`
  color: white;
  font-size: ${getRem(14)};
  text-transform: capitalize;
  margin-bottom: ${getRem(5)};
`
