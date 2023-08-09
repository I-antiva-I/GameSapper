import React from "react";


function ScoreTable()
{   
    let best = localStorage.getItem("BEST_SCORE");
    let last = localStorage.getItem("LAST_SCORE");

    return(
        <div className="score-table">
            <h2>SCORE PLACEHOLDER</h2>
            {(best) ? best : "NO BEST"}
            {(last) ? last : "NO LAST"}
        </div>
    )
}


export default ScoreTable;