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
        bestScore = JSON.parse(bestString);
    }
    if (lastString !== null)
    {
        lastScore = JSON.parse(lastString);
    }

    return(
        <div className="wrapper for-score-table">
            <div className="score-table">
                <div className="score-table-header">
                    <h2>SCORE</h2>
                </div>

                <div className="score-table-content">
                    <ScoreResult header="Last Score" className="score-last" result={lastScore}/> 
                    <ScoreResult header="Best Score" className="score-best" result={bestScore}/> 
                </div>
            </div>
        </div>
    )
}

export default ScoreTable;