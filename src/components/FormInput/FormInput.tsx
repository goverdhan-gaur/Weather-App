import React, { ChangeEventHandler, FunctionComponent, memo } from 'react'
import * as Styled from './FormInput.styled'
import { BiCurrentLocation, BiCalendar, BiTimeFive } from 'react-icons/bi'
import { Message } from '../Message/Message'

type Props = {
  type: 'text' | 'datetime-local' | 'checkbox' | 'submit'
  onChange?: ChangeEventHandler<HTMLInputElement>
  onSelect?: (location: string, place_id: string) => void
  label?: string
  placeholder?: string
  icon?: string | null
  id?: string
  value?: string
  name?: string
  defaultValue?: string
  min?: string
  max?: string
  error?: string
  isDisabled?: boolean
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  dropDownList?: any
}

const getIcon = (name: string | null) => {
  switch (name) {
    case 'location':
      return <BiCurrentLocation />
    case 'date':
      return <BiCalendar />
    case 'time':
      return <BiTimeFive />
    default:
      return false
  }
}

const FormInput: FunctionComponent<Props> = memo(
  ({
    type,
    error,
    icon = '',
    label,
    value,
    dropDownList,
    defaultValue,
    min,
    isDisabled = false,
    max,
    onChange,
    onSelect,
    id,
    name,
    placeholder = 'Placeholder',
  }) => {
    const renderCheckbox = () => {
      return (
        <Styled.checkboxWrapper>
          <Styled.input
            type={type}
            icon={icon === ''}
            id={id}
            name={name}
            onChange={onChange}
          />
          <Styled.label>{label}</Styled.label>
        </Styled.checkboxWrapper>
      )
    }

    const iconEl = getIcon(icon)
    return (
      <Styled.wrapper>
        {type !== 'checkbox' ? (
          <>
            <Styled.label htmlFor={label}>{label}</Styled.label>
            <Styled.inputContainer disabled={isDisabled}>
              {iconEl && <Styled.icon>{iconEl}</Styled.icon>}
              <Styled.input
                icon={icon === ''}
                placeholder={placeholder}
                type={type}
                id={id}
                name={name}
                value={value}
                defaultValue={defaultValue}
                min={min}
                max={max}
                disabled={isDisabled}
                onChange={onChange}
              />
              {dropDownList && dropDownList.length > 0 && (
                <Styled.dropDown>
                  {dropDownList.map(
                    (
                      item: { description: string; place_id: string },
                      i: number
                    ) => (
                      <Styled.dropDownItem
                        key={i}
                        onClick={() =>
                          onSelect?.(item.description, item.place_id)
                        }
                      >
                        {item.description}
                      </Styled.dropDownItem>
                    )
                  )}
                </Styled.dropDown>
              )}
            </Styled.inputContainer>
            {error && <Message type="error" message={error} />}
          </>
        ) : (
          renderCheckbox()
        )}
      </Styled.wrapper>
    )
  }
)
FormInput.displayName = 'FormInput'
export { FormInput }
