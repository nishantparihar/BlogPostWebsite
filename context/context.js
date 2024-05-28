import { createContext, useEffect, useState } from "react";

export const Window_Width = createContext(null);

export default function Context({ children }){
    const [isSmallerDevice, setIsSmallerDevice] = useState(false);

    useEffect(() => {
      const handleResize = () => {
        const width = window.innerWidth;
        setIsSmallerDevice(width < 500);
      };
  
      handleResize();
      window.addEventListener('resize', handleResize);
  
      return () => {
        window.removeEventListener('resize', handleResize);
      };
    }, []);

    return (
        <Window_Width.Provider value={{ isSmallerDevice }}>
            {children}
        </Window_Width.Provider> 
    );
}