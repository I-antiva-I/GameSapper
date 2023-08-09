import React from "react";
import { ControlButtonAction } from "../../scripts/utility/core";
import { adjustControlButtonLabelText, adjustControlButtonContent } from "../../scripts/utility/managers/button_manager";


interface ControlButtonProps
{
    buttonAction:           ControlButtonAction,
    onControlButtonClicked: Function,
}


function ControlButton(props: ControlButtonProps)
{
    return(
        <div className={"wrapper for-control-button"}>     
            <button 
                className=  {"control-button"}
                onClick=    {() => {props.onControlButtonClicked(props.buttonAction)}}>
                {adjustControlButtonContent(props.buttonAction)}
            </button>

            <div className="control-button-label">
                {adjustControlButtonLabelText(props.buttonAction)}
            </div>   
        </div>
    )
}


export default ControlButton;