import React from "react";
import Timer from "./Timer";
import GameInfo from "./GameInfo";
import { FieldSettings, GamePhase } from "../../scripts/game_logic/game_process";

interface MyHeaderProps
{
    fieldSettings: FieldSettings,
    numberOfRevealedCells: number,
    numberOfFlaggedCells: number,
    phase: GamePhase,

    increaseTimePassed: Function,
    nullifyTimePassed:  Function,
}

function MyHeader(props: MyHeaderProps)
{
    return(
        <div className="wrapper for-my-header">
            <div className="my-header">
                <div className="wrapper for-game-title">
                    <div className="game-title">
                        <h1>SAPPER</h1>
                    </div>
                </div>
                <GameInfo
                    fieldSettings=          {props.fieldSettings}
                    numberOfRevealedCells=  {props.numberOfRevealedCells}
                    numberOfFlaggedCells=   {props.numberOfFlaggedCells}
                    phase=                  {props.phase}
                    increaseTimePassed=     {props.increaseTimePassed}
                    nullifyTimePassed=      {props.nullifyTimePassed}
                    />
            </div>
        </div>
    )
}

export default MyHeader;