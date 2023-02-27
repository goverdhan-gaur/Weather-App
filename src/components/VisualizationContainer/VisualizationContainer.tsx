import React, { FunctionComponent, ReactNode } from 'react'
import * as Styled from './VisualizationContainer.styled'
import { IoMdClose } from 'react-icons/io'
import { useDispatch } from 'react-redux'
import useDeviceDetect from '@/hooks/useDeviceDetection'

/**
 *
 * @typedef {object} Props
 * @property {ReactNode} children - React Elements Children.
 */
export type Props = {
  children?: ReactNode
}

/**
 * @component
 * VisualizationContainer
 *
 * @description
 * A component that wraps its children in a container with a close button.
 * The close button is displayed only on mobile devices and is used to close the container.
 * The container is used to display visualizations in the application.
 *
 * @param {object} Props - The props object for the component.
 * @param {ReactNode} [Props.children] - Props for the VisualizationContainer component.
 * @returns A React component representing the visualization container.
 *
 * @example
 * ```tsx
 * <VisualizationContainer>
 *   <VisualizationChart />
 * </VisualizationContainer>
 * ```
 */
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
