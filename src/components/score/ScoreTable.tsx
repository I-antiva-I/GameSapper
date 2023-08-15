import React from "react";
import { GameResult } from "../../scripts/game_logic/game_process";
import ScoreResult from "./ScoreResult";

function ScoreTable()
{   
    let bestString = localStorage.getItem("BEST_SCORE");
    let lastString = localStorage.getItem("LAST_SCORE");
    
    let bestScore: GameResult | undefined = undefined;
    let lastScore: GameResult | undefined = undefined;

    if (bestString !== null)
    {
        bestScore = JSON.parse(bestString) as GameResult;
    }
    if (lastString !== null)
    {
        lastScore = JSON.parse(lastString) as GameResult;
    }

    //console.log(bestScore, bestString) ;
    //console.log(bestScore, bestString) ;


    return(
        <div className="wrapper for-score-table">
            <div className="score-table">
                <h2>SCORE</h2>

                <div className="last-score">
                    <h3>Last Score</h3>
                    {
                        (lastScore !== undefined) ? <ScoreResult result={lastScore}/> : 
                        <div>No information about last score</div>
                        }
                </div>

                <div className="best-score">
                    <h3>Best Score</h3>
                    {
                        (bestScore !== undefined) ? <ScoreResult result={bestScore}/> :
                        <div>No information about best score</div>
                    }
                </div>
            </div>
        </div>
    )
}

export default ScoreTable;