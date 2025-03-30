
import React from "react";

const MOBILE_BREAKPOINT = 768;

export function useIsMobile() {
  const [isMobile, setIsMobile] = React.useState<boolean>(false);

  React.useEffect(() => {
    // Initial check
    const checkMobile = () => setIsMobile(window.innerWidth < MOBILE_BREAKPOINT);
    
    // Check initially
    checkMobile();
    
    // Set up event listener
    window.addEventListener("resize", checkMobile);
    
    // Clean up
    return () => {
      window.removeEventListener("resize", checkMobile);
    };
  }, []);

  return isMobile;
}
