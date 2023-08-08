import React from "react";
import ControlButton from "./ControlButton";


function ControlPanel(props)
{
    return(
        <div className="control-panel">
            <ControlButton
                buttonAction="ACTION_INFO"
                controlInfo={props.controlInfo}
                onControlButtonClicked={props.onControlButtonClicked}/>

            <ControlButton 
                buttonAction="ACTION_SETTINGS"
                controlInfo={props.controlInfo}
                onControlButtonClicked={props.onControlButtonClicked}/>

            <ControlButton 
                buttonAction="ACTION_SCORE"
                controlInfo={props.controlInfo}
                onControlButtonClicked={props.onControlButtonClicked}/>

            <ControlButton
                buttonAction="ACTION_PLAY" 
                controlInfo={props.controlInfo}
                onControlButtonClicked={props.onControlButtonClicked}/>
            
            <ControlButton
                buttonAction="ACTION_RETURN" 
                controlInfo={props.controlInfo}
                onControlButtonClicked={props.onControlButtonClicked}/>  

            <ControlButton 
                buttonAction="ACTION_RESTART"
                controlInfo={props.controlInfo}
                onControlButtonClicked={props.onControlButtonClicked}/>

            <ControlButton
                buttonAction="ACTION_END_GAME"
                controlInfo={props.controlInfo}
                onControlButtonClicked={props.onControlButtonClicked}/>

            <ControlButton 
                buttonAction="ACTION_MODE_OPEN"
                controlInfo={props.controlInfo}
                onControlButtonClicked={props.onControlButtonClicked}/>

            <ControlButton
                buttonAction="ACTION_MODE_FLAG" 
                controlInfo={props.controlInfo}
                onControlButtonClicked={props.onControlButtonClicked}/>                
        </div>
    )
}


export default ControlPanel;
