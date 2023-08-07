import React, { useState, useEffect, useRef } from "react";

function Timer(props)
{
    let [timeSeconds, setTimeSeconds]= useState(0);
    let timeInterval = useRef(null); 

    useEffect(
        () => 
        {
            props.functionGetTimeVal.current = () =>
            {
                return 65757;
            }

            props.functionResetTimeVal.current = () =>
            {
                setTimeSeconds(0);
            }

        },[])

    useEffect(
        () => 
        {
            if(props.state)
            {
                timeInterval.current = setInterval(() => 
                    {setTimeSeconds(prevTS => {return prevTS+1})} ,1000);
            }
            else
            {   
                clearInterval(timeInterval.current);
            }
            
        },[props.state])

    

    function leadingZero(value)
    {
        if(value<10) {return "0"+value;} else {return value;}
    }
    
    return(
        <div className="time-container">
            <div className="time-icon">
                ⏰
            </div>
            <div className="time-value" id="g-timer">
                {leadingZero(Math.floor(timeSeconds/60))+":"+leadingZero(timeSeconds%60)}
            </div>
        </div>
    )


}

export default Timer;