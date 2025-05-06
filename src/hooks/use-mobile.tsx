
import * as React from "react"

const MOBILE_BREAKPOINT = 768

export function useIsMobile() {
  const [isMobile, setIsMobile] = React.useState<boolean | undefined>(undefined)

  React.useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < MOBILE_BREAKPOINT)
    }
    
    // Initial check
    checkIfMobile()
    
    // Listen for resize events
    const mql = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT - 1}px)`)
    
    // Modern approach using addEventListener
    if (mql.addEventListener) {
      mql.addEventListener("change", checkIfMobile)
    } else {
      // Fallback for older browsers
      window.addEventListener('resize', checkIfMobile)
    }
    
    return () => {
      if (mql.removeEventListener) {
        mql.removeEventListener("change", checkIfMobile)
      } else {
        window.removeEventListener('resize', checkIfMobile)
      }
    }
  }, [])

  // Default to desktop if undefined (during SSR)
  return isMobile === undefined ? false : isMobile
}
