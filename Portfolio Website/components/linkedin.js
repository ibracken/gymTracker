"use client";
// This is a hook
import React, {useState} from "react";
const TextDisappearingComponent = () => {
    const [isTextVisible, setTextVisible] = useState(true);
  
    const handleButtonClick = () => {
      setTextVisible(false);
    };
 
    const handleButtonClickRev = () => {
        setTextVisible(true);
      };
  
    return (
      <div>
        {isTextVisible && <a href="https://www.linkedin.com/in/ian-bracken-555899245/">Linkedin</a>}
        <button onClick={handleButtonClick}>Click to Hide Linkedin</button>
        <button onClick={handleButtonClickRev}>Click to Show Linkedin</button>
      </div>
    );
  };
  
  export default TextDisappearingComponent;