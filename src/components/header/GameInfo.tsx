import React from "react"
import Timer from "./Timer";
import { FieldSettings, GamePhase } from "../../scripts/game_logic/game_process";
import Clock from "./Clock";
import IconSVG from "../IconSVG";
import { IconType } from "../../scripts/utility/managers/icon_manager";

interface GameInfoProps
{
    fieldSettings:              FieldSettings,
    numberOfRevealedCells:      number,
    numberOfFlaggedCells:       number,
    phase:                      GamePhase,

    increaseTimePassed: Function,
    nullifyTimePassed:  Function,
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
                    increaseTimePassed=     {props.increaseTimePassed}
                    nullifyTimePassed=      {props.nullifyTimePassed}
                    phase=                  {props.phase}
                    />
                }
             
                <div className="game-info-icon"><IconSVG iconType={IconType.ARROWS_UDLR}/></div>
                <div className="game-info-label">Size</div>
                <div className="game-info-value">
                    {props.fieldSettings.numberOfRows+"x"+props.fieldSettings.numberOfColumns}
                </div>

                <div className="game-info-icon"><IconSVG iconType={IconType.BOMB}/></div>
                <div className="game-info-label">Bombs</div>
                <div className="game-info-value">
                    {
                        (props.fieldSettings.numberOfBombsMax === props.fieldSettings.numberOfBombsMin) ?
                         props.fieldSettings.numberOfBombsMax :
                         props.fieldSettings.numberOfBombsMin+"-"+props.fieldSettings.numberOfBombsMax
                    }
                </div>
                    
      
                <div className="game-info-icon"><IconSVG iconType={IconType.EYE}/></div>
                <div className="game-info-label">Opened</div>
                <div className="game-info-value">
                    {props.numberOfRevealedCells+"/"+props.fieldSettings.numberOfRows*props.fieldSettings.numberOfColumns}
                </div>
                


                <div className="game-info-icon"><IconSVG iconType={IconType.FLAG}/></div>
                <div className="game-info-label">Flags</div>
                <div className="game-info-value">
                    {props.numberOfFlaggedCells}
                </div>
            </div>
        </div>
        
    )
}

export default GameInfo;