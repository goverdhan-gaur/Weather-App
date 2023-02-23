const tsxTemplate = (name) => `import React, { FunctionComponent } from 'react'
import * as Styled from './${name}.styled'
type Props = {
  //
}
export const ${name}: FunctionComponent<Props> = () => {
  return <Styled.wrapper></Styled.wrapper>
}`

module.exports = tsxTemplate
