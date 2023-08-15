import React from "react";
import { GameResult } from "../../scripts/game_logic/game_process";

interface ScoreResultProps
{
    result: GameResult,
}

function ScoreResult(props: ScoreResultProps)
{   
    return(
        <div className="score-result-content">
            <div className={"score-result-value result-"+((props.result.victory) ? "victory" : "defeat")}>
                {
                    (props.result.victory) ? "Victory" : "Defeat"
                }
            </div>

            <div className="score-result-icon">💣</div>
            <div className="score-result-label">Number Of Bombs</div>
            <div className="score-result-value">{props.result.numberOfBombs}</div>

            <div className="score-result-icon">💣</div>
            <div className="score-result-label">Number Of Columns</div>
            <div className="score-result-value">{props.result.numberOfColumns}</div>

            <div className="score-result-icon">💣</div>
            <div className="score-result-label">Number Of Rows</div>
            <div className="score-result-value">{props.result.numberOfRows}</div>

            <div className="score-result-icon">💣</div>
            <div className="score-result-label">Time</div>
            <div className="score-result-value">{props.result.time}</div>
        </div>
    )
}

export default ScoreResult;