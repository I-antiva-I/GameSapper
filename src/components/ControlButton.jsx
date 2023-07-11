import React from "react";

function ControlButton(props)
{
    return(
        <div className={"control-item "+props.className}>     
            <button 
                className={`control-button ${(props.buttonState.isActive)? "" : "unclickable"}`}
                onClick={props.onClickFunction}
                >
                {props.buttonState.text}
            </button>
            <div className="contol-label">
                {props.labelText}
            </div>   
        </div>
    )
}
export default ControlButton;