import React, { ChangeEventHandler, FunctionComponent, memo } from 'react'
import * as Styled from './FormInput.styled'
import { BiCurrentLocation, BiCalendar, BiTimeFive } from 'react-icons/bi'
import { Message } from '../Message/Message'

/**
 *
 * @typedef {object} Props
 */
export type Props = {
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

/**
 * Get the icon for the input element.
 * @param {string|null} name - The name of the icon to get.
 * @returns {JSX.Element|boolean} - A React component representing the icon, or false if no icon was found.
 */
export const getIcon = (name: string | null) => {
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

/**
 * @component
 * FormInput
 * @description
 * Represents a form input field with various input types and options.
 *
 * @param {object} Props - The props object that contains the following properties:
 * @param {string} type - The type of input field (e.g. text, number, checkbox).
 * @param {string} error - The error message to display if the input value is invalid.
 * @param {string} icon - The name of the icon to display next to the input field (optional).
 * @param {string} label - The label text to display above the input field.
 * @param {string} value - The current value of the input field.
 * @param {Array} dropDownList - The list of options to display in a dropdown menu (optional).
 * @param {string} defaultValue - The default value of the input field (optional).
 * @param {number} min - The minimum value allowed for number inputs (optional).
 * @param {boolean} isDisabled - Whether the input field should be disabled (optional).
 * @param {number} max - The maximum value allowed for number inputs (optional).
 * @param {function} onChange - The callback function to call when the input value changes.
 * @param {function} onSelect - The callback function to call when an option is selected from the dropdown menu (optional).
 * @param {string} id - The ID of the input field.
 * @param {string} name - The name of the input field.
 * @param {string} placeholder - The placeholder text to display in the input field (optional).
 *
 * @returns {JSX.Element} A React component representing a form input field.
 * @example
 * ```
 *  <FormInput
 *    label="To"
 *    type="datetime-local"
 *    name="dateTo"
 *    icon="date"
 *    error={toDateError}
 *    defaultValue={dateTo}
 *    min={dateFrom}
 *    max={maxDate}
 *    onChange={handleToDateChange}
 *  />
 * ```
 * */
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
    /**
     * Renders a checkbox input field with a label.
     *
     * @returns {JSX.Element} A React component representing a checkbox input field.
     */
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
