import React, { useState, useEffect, useRef } from "react";
import { GamePhase } from "../../scripts/game_logic/game_process";
import { setInterval } from "timers/promises";

interface TimerProps
{
    phase: GamePhase,

    increaseTimePassed: Function,
    nullifyTimePassed:  Function,
}

function Timer(props: TimerProps)
{
    // Timer
    let [timeNow, setTimeNow] = useState<number>(0);
    let timePassedInterval = useRef<number | undefined>(undefined);

    let startTimer = () =>
    {
        props.nullifyTimePassed();
        setTimeNow(0);
        if (timePassedInterval.current !== undefined) {return};
        timePassedInterval.current = window.setInterval(() => 
        {
            props.increaseTimePassed();
            setTimeNow((prev) => prev+1);
        }, 1000);
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


    // Display values
    let minutes = (Math.floor(timeNow/60)).toString().padStart(2,"0");
    let seconds = (timeNow%60).toString().padStart(2,"0");
    
    return(
        <div className="wrapper for-timer">
            <div className="timer">
                <div className="timer-upper-part">Time</div>
                <div className="timer-lower-part">{minutes+":"+seconds}</div>
            </div>
        </div>
    )
}

export default Timer;

// + More info here +
// https://github.com/TypeStrong/atom-typescript/issues/1053
// https://www.kindacode.com/article/react-typescript-setinterval/
// https://www.youtube.com/watch?v=26ogBZXeBwc&ab_channel=DaveGray


