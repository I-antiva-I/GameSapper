import React from "react";
import { GameResult } from "../../scripts/game_logic/game_process";

interface ScoreResultProps
{
    className:      string,
    header:         string,
    result:         GameResult | undefined,
}

function ScoreResult(props: ScoreResultProps)
{   
    console.log(props.result);

    if (props.result !== undefined)
    {
        // Some weird behavior due to JSON parsing - date is STRING
        // console.log(typeof(props.result.date), props.result.date);
        let fixedDate: Date = new Date(props.result.date);

        return(
            <div className={"score-result "+props.className}>
                <div className={"score-result-header " + (props.result.victory ? "result-victory" : "result-defeat")}>
                    <h3>{props.header}</h3>
                    <h4>{(props.result.victory) ? "Victory" : "Defeat"}</h4>
                </div>

                <div className="score-result-content">
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
        
                    <div className="score-result-icon">💣</div>
                    <div className="score-result-label">Date</div>
                    <div className="score-result-value">{fixedDate.toLocaleString()}</div>
                </div>
            </div>
        )
    }
    else
    {
        return(
            <div className={"score-result "+props.className}>
                <div className="score-result-header result-unknown">
                    <h3>{props.header}</h3>
                    <h4>No information</h4>
                </div>
            </div>
        )
    }

}

export default ScoreResult;