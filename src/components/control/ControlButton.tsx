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
            <button className=  "control-button"
                onClick=    {() => {props.onControlButtonClicked(props.buttonAction)}}>

                    <div className="control-button-content">
                        {adjustControlButtonContent(props.buttonAction)}
                    </div>
                    <div className="control-button-label">
                        <div>{adjustControlButtonLabelText(props.buttonAction)}</div>
                    </div>   
            </button>
        </div>
    )
}

export default ControlButton;