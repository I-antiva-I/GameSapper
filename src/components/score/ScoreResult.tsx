import React from "react";
import { GameResult } from "../../scripts/game_logic/game_process";
import IconSVG from "../IconSVG";
import { IconType } from "../../scripts/utility/managers/icon_manager";

interface ScoreResultProps
{
    className:      string,
    header:         string,
    result:         GameResult | undefined,
}

function ScoreResult(props: ScoreResultProps)
{   
    if (props.result !== undefined)
    {
        // [!] Some weird behavior due to JSON parsing - date is STRING
        let fixedDate: Date = new Date(props.result.date);
        
        // Display values
        let time    = fixedDate.toLocaleTimeString();
        let date    = fixedDate.toLocaleDateString();

        return(
            <div className={"score-result "+props.className}>
                <div className={"score-result-header " + (props.result.victory ? "result-victory" : "result-defeat")}>
                    <h3>{props.header}</h3>
                    <h4>{(props.result.victory) ? "Victory" : "Defeat"}</h4>
                </div>

                <div className="score-result-content">
                    <div className="score-result-icon"><IconSVG iconType={IconType.BOMB} iconColor="black"/></div>
                    <div className="score-result-label">Bombs Total</div>
                    <div className="score-result-value">{props.result.numberOfBombs}</div>

                    <div className="score-result-icon"><IconSVG iconType={IconType.EYE} iconColor="black"/></div>
                    <div className="score-result-label">Bombs Found</div>
                    <div className="score-result-value">{props.result.numberOfBombsFound}</div>
        
                    <div className="score-result-icon"><IconSVG iconType={IconType.ARROWS_UDLR} iconColor="black"/></div>
                    <div className="score-result-label">Columns</div>
                    <div className="score-result-value">{props.result.numberOfColumns}</div>
        
                    <div className="score-result-icon"><IconSVG iconType={IconType.ARROWS_UDLR} iconColor="black"/></div>
                    <div className="score-result-label">Rows</div>
                    <div className="score-result-value">{props.result.numberOfRows}</div>
        
                    <div className="score-result-icon"><IconSVG iconType={IconType.HOURGLASS} iconColor="black"/></div>
                    <div className="score-result-label">Time</div>
                    <div className="score-result-value">{props.result.time}</div>
        
                    <div className="score-result-icon"><IconSVG iconType={IconType.CALENDAR} iconColor="black"/></div>
                    <div className="score-result-label">Date (Day)</div>
                    <div className="score-result-value">{date}</div>

                    <div className="score-result-icon"><IconSVG iconType={IconType.CLOCK} iconColor="black"/></div>
                    <div className="score-result-label">Date (Time)</div>
                    <div className="score-result-value">{time}</div>
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