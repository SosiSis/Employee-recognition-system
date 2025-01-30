const ConicGradientBackground = () => {
    const gradientStyle = {
      
      background: `conic-gradient(from 180deg at 50% 50%, 
        #CEBBFA -29.12deg, 
        #A7AEF9 30.1deg, 
        #DDCCF8 115deg, 
        #FAF1EE 174.37deg, 
        #F5C9D9 253.03deg, 
        #CEBBFA 330.88deg, 
        #A7AEF9 390.1deg)`,
      gap: "0px", // Currently not relevant to styling
      opacity: "0", // Makes it fully transparent, adjust as needed
    };
  
    return <div style={gradientStyle}></div>;
  };
  
  export default ConicGradientBackground;
  