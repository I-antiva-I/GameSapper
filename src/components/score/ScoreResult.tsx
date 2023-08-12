import React from "react";
import { GameResult } from "../../scripts/game_logic/game_process";


interface ScoreResultProps
{
    result: GameResult,
}


function ScoreResult(props: ScoreResultProps)
{   
    return(
        <div className="result-content">
            <div className="result-value">{props.result.numberOfBombs}</div>
            <div className="result-value">{props.result.numberOfColumns}</div>
            <div className="result-value">{props.result.numberOfRows}</div>
            <div className="result-value">{props.result.time}</div>
        </div>
    )
}


export default ScoreResult;