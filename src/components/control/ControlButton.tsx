import React, { useEffect, useRef, useState } from "react";
import { ClickMode, ControlButtonAction } from "../../scripts/utility/core";
import { adjustControlButtonLabelText, adjustControlButtonContent } from "../../scripts/utility/managers/button_manager";

interface ControlButtonProps
{
    buttonAction:               ControlButtonAction,
    onControlButtonClicked:     Function,
    
    isActive?:                  boolean,
}

function ControlButton(props: ControlButtonProps)
{
    let [color, setColor] = useState((props.isActive) ? "dodgerblue" : "white");
    let [isHovering, setIsHovering] = useState(false);
    
    useEffect(() => {
  
            (isHovering) ?  setColor("mediumseagreen") :
            (props.isActive) ? setColor("dodgerblue") 
            : setColor("white");
      }, [props.isActive, isHovering]);

    return(
        <div className={"wrapper for-control-button"}>     
            <button className=  {"control-button"+((props.isActive) ? " active" : "")}
                onClick=        {() => {props.onControlButtonClicked(props.buttonAction)}}
                onMouseEnter=   {() => {setIsHovering(true)}}
                onMouseLeave=   {() => {setIsHovering(false)}}
                >
                    <div className="control-button-content">
                        {adjustControlButtonContent(props.buttonAction, color)}
                    </div>
                    <div className="control-button-label">
                        <div>{adjustControlButtonLabelText(props.buttonAction)}</div>
                    </div>   
            </button>
        </div>
    )
}

export default ControlButton;