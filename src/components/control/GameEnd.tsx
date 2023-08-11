import React from "react";
import { GameResult } from "../../scripts/game_logic/game_process";

interface GameEndProps
{
    result: 
    {
        currentScore: GameResult,
        isNewBestScore: boolean,
    },
}


function GameEnd(props: GameEndProps)
{
    return(
        <div className="wrapper for-game-end">
            <div className="game-end">
                <h2>{(props.result.currentScore.victory) ? "WIN!" : "DEFEAT..."}</h2>
                {
                    (props.result.isNewBestScore) && <h3>New Best Score</h3>
                }
                <div className="game-end-result">
                    <div className="result-label">Bomb found {props.result.currentScore.numberOfBombs}</div>
                    <div className="result-label">Time {props.result.currentScore.time}</div>
                    <div className="result-label">Cells opened* {props.result.currentScore.date.toLocaleDateString()}</div>
                </div>
            </div>
        </div>

    )
}


export default GameEnd;