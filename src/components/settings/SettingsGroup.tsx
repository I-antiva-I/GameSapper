import React, {useState} from "react";
import headerIcon from "../../images/icons/arrow.svg";
import IconSVG from "../IconSVG";
import { IconType } from "../../scripts/utility/managers/icon_manager";

interface SettingsGroupProps
{
    isContentVisible:   boolean,
    groupHeader:        String,
    groupClassName:     String,
    children:           React.ReactNode,
}

function SettingsGroup(props: SettingsGroupProps)
{
    let [isContentVisible, setIsContentVisible] = useState(props.isContentVisible);
    let [iconColor, setIconColor] = useState("white");
    let onHeaderClicked = () =>
    {
        setIsContentVisible(!isContentVisible);
    }

    return(
        <div className={"settings-group group-"+props.groupClassName+((isContentVisible) ? " visible" : " hidden" )}>

            <div className={"settings-group-header"} 
                onMouseLeave=   {()=>{setIconColor("white")}}
                onMouseEnter=   {()=>{setIconColor("black")}}
                onClick={()=>{onHeaderClicked()}}>
                <div className="wrapper for-header-icon">
                    <IconSVG iconType={IconType.GROUP_ARROW} iconColor={iconColor}/>
                </div>
                {<h3>{props.groupHeader}</h3>}
            </div>

            <div className={"settings-group-content wrapper for-"+props.groupClassName}>
                {props.children}
            </div>
        </div>
    )
}


export default SettingsGroup;