import React, { useState, useEffect, useRef } from "react";


function Clock()
{   
    // Clock
    let [timeNow, setTimeNow] = useState<Date>(new Date());
    let timeNowInterval = useRef<number | undefined>(undefined);

    useEffect(() => 
    {
        timeNowInterval.current = window.setInterval(()=> {setTimeNow(new Date())}, 1000);

        return () => {clearInterval(timeNowInterval.current);};                        
    }, []);

    // Display values
    let time    = timeNow.toLocaleTimeString();
    let date    = timeNow.toLocaleDateString();

    return(
        <div className="wrapper for-clock">
            <div className="clock">
                <div className="clock-upper-part">{date}</div>
                <div className="clock-lower-part">{time}</div>
            </div>
        </div>
    )
}


export default Clock;