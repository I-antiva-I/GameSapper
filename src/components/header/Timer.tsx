import React, { useState, useEffect, useRef } from "react";
import { GamePhase } from "../../scripts/game_logic/game_process";
import { setInterval } from "timers/promises";

interface TimerProps
{
    phase: GamePhase,
    setTimePassed: React.Dispatch<React.SetStateAction<number>>,
    timePassed: number
}

// https://github.com/TypeStrong/atom-typescript/issues/1053
// https://www.kindacode.com/article/react-typescript-setinterval/


function Timer(props: TimerProps)
{
    //console.log(props.phase)

    // Timer
    //let [timePassed, setTimePassed]= useState(0);
    let timePassedInterval = useRef<number | undefined>(undefined);

    

    let startTimer = () =>
    {
        if (timePassedInterval.current !== undefined) {return};
        timePassedInterval.current = window.setInterval(() => {props.setTimePassed((prev) => prev+1)}, 1000);
    }
    let stopTimer = () =>
    {
        if (timePassedInterval.current)
        {
            window.clearInterval(timePassedInterval.current);
            timePassedInterval.current=undefined;
        }
    }

    useEffect(() => 
        {
            return () => 
            {
                if (timePassedInterval.current !== undefined) {window.clearInterval(timePassedInterval.current);}
            };
        }, []);

    useEffect(() => 
        {
            if (props.phase === GamePhase.IDLE)
            {
                stopTimer();
                props.setTimePassed(0);
            }
            else if (props.phase === GamePhase.IN_PROGRESS)
            {
                startTimer();
            }
            else if (props.phase === GamePhase.END)
            {
                stopTimer();
            }

            return ()=> {stopTimer();}
        }, [props.phase]);


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
    let minutes = (Math.floor(props.timePassed/60)).toString().padStart(2,"0");
    let seconds = (props.timePassed%60).toString().padStart(2,"0");
    
    return(
        <div className="time-container">
            <div className="time-icon">
                {time+"-"+date}
            </div>
            <div className="time-value" id="g-timer">
                {
                    minutes+":"+seconds
                }
               
            </div>
       
        </div>
    )


}

export default Timer;