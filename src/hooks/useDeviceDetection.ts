import { useState, useEffect } from 'react';

const useDeviceDetect = () => {
    const [isMobile, setIsMobile] = useState(false);
    const [isTablet, setIsTablet] = useState(false);
    const [isDesktop, setIsDesktop] = useState(false);
    const [windowSize, setWindowSize] = useState<{ width: number, height: number }>()
    useEffect(() => {
        const handleResize = () => {
            setWindowSize({ width: window.innerWidth, height: window.innerHeight });

            if (window.innerWidth <= 768) {
                setIsMobile(true);
                setIsTablet(false);
                setIsDesktop(false);
            } else if (window.innerWidth <= 820 && window.innerWidth >= 768) {
                setIsTablet(true);
                setIsMobile(false);
                setIsDesktop(false);
            } else if (window.innerWidth >= 820) {
                setIsDesktop(true)
                setIsMobile(false);
                setIsTablet(false);
            }
        };
        window.addEventListener('resize', handleResize);
        handleResize();

        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return { isMobile, isTablet, isDesktop, windowSize };
};

export default useDeviceDetect;