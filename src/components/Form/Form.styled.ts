import { getRem } from '@/mixins/getRemUnits'
import { FormEvent, ReactNode } from 'react'

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
interface FormProps{
  onSubmit:(arg0: FormEvent) => void,
  children? : ReactNode
}
export const form = styled.form<FormProps>`
  width: 100%;
`
export const instructions = styled.p``
