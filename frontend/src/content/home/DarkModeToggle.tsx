type DarkModeToggleProps = {
    setDarkmode: (darkmode: boolean) => void,
    darkmode: boolean
}


export default function DarkModeTuggle({setDarkmode, darkmode} : DarkModeToggleProps) {

   
    return (
      
        <svg
            onClick={() => setDarkmode(!darkmode)}
            fill="currentColor" className="h-[1.5rem] w-[1.5rem] sm:w-[2rem] sm:h-[2rem] cursor-pointer text-gray-verydark hover:text-gray-dark" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg">
            <g id="SVGRepo_bgCarrier" strokeWidth="0"/>
            <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"/>
            <g id="SVGRepo_iconCarrier">
            <title>ionicons-v5-j</title>
            <path d="M152.62,126.77c0-33,4.85-66.35,17.23-94.77C87.54,67.83,32,151.89,32,247.38,32,375.85,136.15,480,264.62,480c95.49,0,179.55-55.54,215.38-137.85-28.42,12.38-61.8,17.23-94.77,17.23C256.76,359.38,152.62,255.24,152.62,126.77Z"/>
            </g>
        </svg>
   
    


      
    )
  }