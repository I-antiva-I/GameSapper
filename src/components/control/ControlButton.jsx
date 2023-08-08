import React from "react";
import { adjustControlButtonLabel, adjustControlButtonContent, adjustControlButtonClass } from "../../scripts/utility/managers/button_manager";


function ControlButton(props)
{
    return(
        <div className={"control-button-wrapper"+adjustControlButtonClass(props.controlInfo, props.buttonAction)}>     
            <button 
                className=  {"control-button"}
                onClick=    {()=>{props.onControlButtonClicked(props.buttonAction)}}>
                {adjustControlButtonContent(props.buttonAction)}
            </button>

            <div className="control-button-label">
                {adjustControlButtonLabel(props.buttonAction)}
            </div>   
        </div>
    )
}


export default ControlButton;