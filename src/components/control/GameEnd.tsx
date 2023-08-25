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
                <div className="game-end-header">
                    <h2>{(props.result.currentScore.victory) ? "WIN!" : "DEFEAT"}</h2>
                    {
                        (props.result.isNewBestScore) && <h3>New Best Score</h3>
                    }
                </div>
            </div>
        </div>

    )
}

export default GameEnd;