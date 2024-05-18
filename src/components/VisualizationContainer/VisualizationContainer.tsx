import React, { useRef, FunctionComponent, ReactNode, useEffect } from 'react'
import gsap from 'gsap';
import * as Styled from './VisualizationContainer.styled'
import { IoMdClose } from 'react-icons/io'
import { useDispatch, useSelector } from 'react-redux'
import useDeviceDetect from '@/hooks/useDeviceDetection'
import { RootState } from '@/store';
import _ from 'lodash';
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
  const data = useSelector((state: RootState) => state.data);
  const { isMobile } = useDeviceDetect()
  const displatch = useDispatch()
  const container = useRef();
  const backdrop = useRef();

  useEffect(() => {
    if (isMobile) {
      if (_.isEmpty(data)) {
        gsap.to(container.current!, { y: '50vh' });
        gsap.to(backdrop.current!, { autoAlpha: 0 })
      } else {
        gsap.to(container.current!, { y: '-50vh' });
        gsap.to(backdrop.current!, { autoAlpha: 1 })
      }
    }
  }, [data])
  const handleClose = () => {
    displatch({ type: 'UPDATE_DATA', payload: {} })
  }
  return (
    <>
      {isMobile && <Styled.backdrop ref={backdrop} onClick={handleClose} />}
      <Styled.wrapper ref={container} isMobile={isMobile}>
        <Styled.close isMobile={isMobile}>
          <IoMdClose onClick={handleClose} />
        </Styled.close>
        {children}
      </Styled.wrapper>
    </>
  )
}
