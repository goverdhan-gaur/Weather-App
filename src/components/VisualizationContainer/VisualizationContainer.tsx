import React, { FunctionComponent, ReactNode } from 'react'
import * as Styled from './VisualizationContainer.styled'
import { IoMdClose } from 'react-icons/io'
import { useDispatch } from 'react-redux'
import useDeviceDetect from '@/hooks/useDeviceDetection'
type Props = {
  //
  children?: ReactNode
}
export const VisualizationContainer: FunctionComponent<Props> = ({
  children,
}) => {
  const { isMobile } = useDeviceDetect()
  const displatch = useDispatch()
  const handleClose = () => {
    displatch({ type: 'UPDATE_DATA', payload: {} })
  }
  return (
    <>
      {isMobile && <Styled.backdrop onClick={handleClose} />}
      <Styled.wrapper isMobile={isMobile}>
        <Styled.close isMobile={isMobile}>
          <IoMdClose onClick={handleClose} />
        </Styled.close>
        {children}
      </Styled.wrapper>
    </>
  )
}
