import React, { useState, useEffect, useRef } from "react";




function Timer()
{
    let [timeSeconds, setTimeSeconds]= useState(0);
    let [isActive, setIsActive]= useState(true);
    let timeInterval = useRef(null); 

    useEffect(() => {
        let intervalId : NodeJS.Timer;
        if (isActive) {
          // setting time from 0 to 1 every 10 millisecond using javascript setInterval method
          intervalId = setInterval(() => setTimeSeconds(timeSeconds + 1), 1000);
        }
        return () => clearInterval(intervalId);
      }, [isActive, timeSeconds]);

    let m = (Math.floor(timeSeconds/60)).toString().padStart(2,"0");
    let s = (timeSeconds%60).toString().padStart(2,"0");
    
    return(
        <div className="time-container">
            <div className="time-icon">
                TIME
            </div>
            <div className="time-value" id="g-timer">
                {m+":"+s}
            </div>
        </div>
    )


}

export default Timer;