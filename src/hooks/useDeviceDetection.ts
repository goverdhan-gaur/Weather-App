import { useState, useEffect } from 'react'

/**
 * This hook is used to detect the current device and its screen size.
 * It returns an object containing booleans for whether the device is mobile, tablet or desktop,
 * as well as the current window size.
 * @returns Object with properties for isMobile, isTablet, isDesktop, windowSize.
 */
const useDeviceDetect = () => {
  // State variables for detecting the current device
  const [isMobile, setIsMobile] = useState(false)
  const [isTablet, setIsTablet] = useState(false)
  const [isDesktop, setIsDesktop] = useState(false)
  const [isSafari, setIsSafari] = useState(false)

  // State variable for detecting the window size
  const [windowSize, setWindowSize] = useState<{
    width: number
    height: number
  }>()
  useEffect(() => {
    /**
     * Event handler function to handle window resize event.
     * It sets the window size and updates the device type.
     */
    const handleResize = () => {
      setWindowSize({ width: window.innerWidth, height: window.innerHeight })

      if (window.innerWidth <= 768) {
        setIsMobile(true)
        setIsTablet(false)
        setIsDesktop(false)
      } else if (window.innerWidth <= 834 && window.innerWidth >= 768) {
        setIsTablet(true)
        setIsMobile(false)
        setIsDesktop(false)
      } else if (window.innerWidth >= 834) {
        setIsDesktop(true)
        setIsMobile(false)
        setIsTablet(false)
      }
    }
    // Attach event listener to window resize event
    window.addEventListener('resize', handleResize)

    // Call handleResize function once on initial render
    handleResize()

    const ua = navigator.userAgent;
    setIsSafari(ua.includes('Safari') && !ua.includes('Chrome'));

    // Detach event listener when component is unmounted
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  // Return an object with current device and window size information
  return { isMobile, isTablet, isDesktop, windowSize, isSafari }
}

export default useDeviceDetect
