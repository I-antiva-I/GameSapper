import React from "react";

function ScoreTable(props)
{
    
    function getBest()
    {
        if(props.bestScore!=null)
        {
            return(
                <div className="labels">
                    <div className="score-label">MaxBombs</div>
                    <div className="score-label">{}</div>
                    <div className="score-label">Cells</div>
                    <div className="score-label">{}</div>
                    <div className="score-label">Time</div>
                    <div className="score-label">{}</div>
                    <div className="score-label">Date</div>
                    <div className="score-label">{}</div>
                </div>
            )
        }
    }

    function getLast()
    {
        if(props.lastScore!=null)
        {
            return(
                <div className="labels">
                    <div className="score-label">MaxBombs</div>
                    <div className="score-label">{props.lastScore["bombs"]}</div>
                    <div className="score-label">Cells</div>
                    <div className="score-label">{props.lastScore["size"]}</div>
                    <div className="score-label">Time</div>
                    <div className="score-label">{props.lastScore["seconds"]}</div>
                    <div className="score-label">Date</div>
                    <div className="score-label">{props.lastScore["date"]}</div>
                </div>
            )
        }
    }







    return(
        <div className={`score-area`}>
            <div className="best-score">
                <h3>Best Score</h3>
                {}
            </div>
            
            <div className="last-score">
                <h3>Last Score</h3>
                {}
            </div>
        </div>
    )



}

export default ScoreTable;