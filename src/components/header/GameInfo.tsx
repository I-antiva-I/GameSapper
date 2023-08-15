import React from "react"
import Timer from "./Timer";
import { FieldSettings, GamePhase } from "../../scripts/game_logic/game_process";
import Clock from "./Clock";

interface GameInfoProps
{
    fieldSettings: FieldSettings,
    numberOfRevealedCells: number,
    numberOfFlaggedCells: number,
    phase: GamePhase,
    setTimePassed: React.Dispatch<React.SetStateAction<number>>,
    timePassed: number,
}

function GameInfo(props : GameInfoProps)
{
    return(
        <div className="wrapper for-game-info">
            <div className="game-info">
                {
                    (props.phase === GamePhase.IDLE) ?
                    <Clock/>
                    :
                    <Timer
                    setTimePassed=      {props.setTimePassed}
                    phase=              {props.phase}
                    timePassed=         {props.timePassed}
                    />
                }
             
                <div className="game-info-icon">❌</div>
                <div className="game-info-label">Size</div>
                <div className="game-info-value">
                    {props.fieldSettings.numberOfRows+"x"+props.fieldSettings.numberOfColumns}
                </div>

                <div className="game-info-icon">💣</div>
                <div className="game-info-label">Bombs</div>
                <div className="game-info-value">
                    {
                        (props.fieldSettings.numberOfBombsMax === props.fieldSettings.numberOfBombsMin) ?
                         props.fieldSettings.numberOfBombsMax :
                         props.fieldSettings.numberOfBombsMin+"-"+props.fieldSettings.numberOfBombsMax
                    }
                </div>
                    
      
                <div className="game-info-icon">✔️</div>
                <div className="game-info-label">Opened</div>
                <div className="game-info-value">
                    {props.numberOfRevealedCells+"/"+props.fieldSettings.numberOfRows*props.fieldSettings.numberOfColumns}
                </div>
                


                <div className="game-info-icon">🚩</div>
                <div className="game-info-label">Flags</div>
                <div className="game-info-value">
                    {props.numberOfFlaggedCells}
                </div>
            </div>
        </div>
        
    )
}

export default GameInfo;