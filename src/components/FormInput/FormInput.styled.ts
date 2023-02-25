import { getRem } from '@/mixins/getRemUnits'
import { colors } from '@/utils/themes'
import styled from 'styled-components'

export const wrapper = styled.div``
export const icon = styled.span`
  position: relative;
  color: ${colors.charcoalGray};
  line-height: 0;
  padding: ${getRem(2)} ${getRem(12)} ${getRem(2)} 0;
  &:after {
    content: '';
    position: absolute;
    right: 0;
    top: 50%;
    transform: translateY(-50%);
    width: 1px;
    height: calc(100% + ${getRem(2)} + ${getRem(2)});
    background: black;
  }
`

export const inputContainer = styled.div`
  position: relative;
  background: ${colors.lightBlueGray};
  border-radius: ${getRem(5)};
  padding: ${getRem(10)} ${getRem(12)};
  display: flex;
  justify-content: flex-start;
  align-items: center;
`

export const label = styled.label`
  font-weight: bold;
  color: ${colors.white};
  font-size: ${getRem(14)};
  text-transform: capitalize;
`

interface Input {
  icon: boolean
}

export const input = styled.input<Input>`
  padding-left: ${({ icon }) => {
    return icon ? 0 : getRem(12)
  }};
  width: 100%;
  background: transparent;
  border: none;
  font-size: ${getRem(12)};
  outline: none;
  position: relative;
  &[type='time']::-webkit-calendar-picker-indicator {
    display: none;
  }

  &[type='date']::-webkit-calendar-picker-indicator {
    display: none;
  }

  &[type='time'],
  &[type='date'] {
    font-family: 'Open Sans', sans-serif;
    text-transform: uppercase;
    color: ${colors.charcoalGray};
  }

  &[type='checkbox'] {
    appearance: none;
    -webkit-appearance: none;
    -moz-appearance: none;
    width: ${getRem(30)};
    height: ${getRem(30)};
    background: ${colors.lightBlueGray};
    border-radius: ${getRem(5)};
  }

  &[type='checkbox']:checked {
    position: relative;
    background: ${colors.darkBlueGray};
  }

  &[type='checkbox']:checked::after {
    content: '\\2713';
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    text-align: center;
    font-size: ${getRem(24)};
    color: ${colors.lightBlueGray};
  }
`

export const checkboxWrapper = styled.div`
  display: flex;
  justify-content: flex-start;
  gap: ${getRem(10)};
  align-items: center;
  & > label {
    font-weight: 400;
  }
`

export const dropDown = styled.ul`
  position: absolute;
  width: calc(100%- ${getRem(40)});
  list-style-type: none;
  padding: 12px;
  left: ${getRem(40)};
  z-index: 9;
  top: calc(100% + 5px);
  background: ${colors.lightBlueGray};
  border-radius: 5px;
  display: flex;
  backdrop-filter: blur(5px);
  flex-direction: column;
  gap: 5px;
  box-shadow: rgba(0, 0, 0, 0.25) 0px 25px 50px -12px;
`

export const dropDownItem = styled.li`
  background: ${colors.darkBlueGray};
  font-size: ${getRem(14)};
  padding: 10px;
  border-radius: 5px;
`
