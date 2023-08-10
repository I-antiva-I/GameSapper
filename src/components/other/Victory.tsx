import React from "react";
import { GameResult } from "../../scripts/game_logic/game_process";

interface VictoryProps
{
    victory: boolean,
    result: GameResult,
}


function Victory(props: VictoryProps)
{
    console.log(JSON.stringify(props.result));
    localStorage.setItem("LAST_SCORE", JSON.stringify(props.result));
    localStorage.setItem("BEST_SCORE", JSON.stringify(props.result));

    return(
        <div className="victory">
            <h2>{(props.victory) ? "WIN!" : "DEFEAT..."}</h2>
            <div>{"B: "+props.result.numberOfBombs+" C:"+props.result.numberOfCells+" T:"+props.result.totalTime}</div>
        </div>
    )
}


export default Victory;