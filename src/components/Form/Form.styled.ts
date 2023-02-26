import { getRem } from '@/mixins/getRemUnits'

import styled from 'styled-components'
export const wrapper = styled.div`
  position: relative;
  padding: 0 ${getRem(30)};
  max-width: 1000px;
  margin: 0 auto;
  display: grid;
  place-items: center;
  height: 100%;
`
export const form = styled.form`
  width: 100%;
`
export const instructions = styled.p``
