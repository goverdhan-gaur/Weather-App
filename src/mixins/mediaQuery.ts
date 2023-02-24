import { css } from 'styled-components'

const sizes = {
    Mobile: '576px',
    Tablet: '820px',
    Desktop: '992px',
    LargeDesktop: '1200px',
}

export const mediaQuery = (label: keyof typeof sizes, content: string) => css`
  @media (max-width: ${sizes[label]}) {
    ${content}
  }
`