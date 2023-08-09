import React from "react";
import ControlButton from "./ControlButton";
import { ClickMode, ControlButtonAction, DisplayMode } from "../../scripts/utility/core";
import { GamePhase } from "../../scripts/game_logic/game_state";
import { isControlButtonDisplayed } from "../../scripts/utility/managers/button_manager";


interface ControlPanelProps
{
    phase:                  GamePhase,
    clickMode:              ClickMode;
    displayMode:            DisplayMode,
    onControlButtonClicked: Function,
}


function ControlPanel(props: ControlPanelProps)
{
    return(
        <div className="wrapper for-control-panel">
            <div className="control-panel">   
                {
                    (isControlButtonDisplayed(ControlButtonAction.INFO, props.displayMode, props.phase)) &&
                    <ControlButton
                        buttonAction=           {ControlButtonAction.INFO}
                        onControlButtonClicked= {props.onControlButtonClicked}/>
                }

                {
                    (isControlButtonDisplayed(ControlButtonAction.SETTINGS, props.displayMode, props.phase)) &&
                    <ControlButton
                        buttonAction=           {ControlButtonAction.SETTINGS}
                        onControlButtonClicked= {props.onControlButtonClicked}/>
                }

                {
                    (isControlButtonDisplayed(ControlButtonAction.SCORE, props.displayMode, props.phase)) &&
                    <ControlButton
                        buttonAction=           {ControlButtonAction.SCORE}
                        onControlButtonClicked= {props.onControlButtonClicked}/>
                }

                {
                    (isControlButtonDisplayed(ControlButtonAction.PLAY, props.displayMode, props.phase)) &&
                    <ControlButton
                        buttonAction=           {ControlButtonAction.PLAY}
                        onControlButtonClicked= {props.onControlButtonClicked}/>
                }       
                
                {
                    (isControlButtonDisplayed(ControlButtonAction.RESTART, props.displayMode, props.phase)) &&
                    <ControlButton
                        buttonAction=           {ControlButtonAction.RESTART}
                        onControlButtonClicked= {props.onControlButtonClicked}/>
                }     

                {
                    (isControlButtonDisplayed(ControlButtonAction.RETURN, props.displayMode, props.phase)) &&
                    <ControlButton
                        buttonAction=           {ControlButtonAction.RETURN}
                        onControlButtonClicked= {props.onControlButtonClicked}/>
                } 

                {
                    (isControlButtonDisplayed(ControlButtonAction.END_GAME, props.displayMode, props.phase)) &&
                    <ControlButton
                        buttonAction=           {ControlButtonAction.END_GAME}
                        onControlButtonClicked= {props.onControlButtonClicked}/>
                }       
                
                {
                    (isControlButtonDisplayed(ControlButtonAction.MODE_OPEN_CELL, props.displayMode, props.phase)) &&
                    <ControlButton
                        buttonAction=           {ControlButtonAction.MODE_OPEN_CELL}
                        onControlButtonClicked= {props.onControlButtonClicked}/>
                }     

                {
                    (isControlButtonDisplayed(ControlButtonAction.MODE_FLAG_CELL, props.displayMode, props.phase)) &&
                    <ControlButton
                        buttonAction=           {ControlButtonAction.MODE_FLAG_CELL}
                        onControlButtonClicked= {props.onControlButtonClicked}/>
                } 
            </div>
        </div>
    )
}


export default ControlPanel;