import { getRem } from '@/mixins/getRemUnits'
import { colors } from '@/utils/themes'
import styled from 'styled-components'

export const wrapper = styled.div``

export const message = styled.span<{ type?: string }>`
  display: block;
  color: ${({ type }) =>
    type === 'error' ? colors.accentLightPink : colors.accentLightPurple};
  text-align: left;
  font-size: ${getRem(12)};
  font-style: italic;
`
