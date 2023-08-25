import React, {useState} from "react";
import headerIcon from "../../images/icons/arrow.svg";
import IconSVG from "../IconSVG";
import { IconType } from "../../scripts/utility/managers/icon_manager";

interface InformationGroupProps
{
    isContentVisible:   boolean,
    groupHeader:        String,
    groupClassName:     String,
    
    children:           React.ReactNode,
}

function InformationGroup(props: InformationGroupProps)
{
    let [isContentVisible, setIsContentVisible] = useState(props.isContentVisible);
    let [iconColor, setIconColor] = useState("white");

    return(
        <div className={"information-group group-"+props.groupClassName+((isContentVisible) ? " visible" : " hidden" )}>
            
            <div className={"information-group-header"} 
                onMouseLeave=   {()=>{setIconColor("white")}}
                onMouseEnter=   {()=>{setIconColor("black")}}
                onClick=        {()=>{setIsContentVisible(!isContentVisible)}}>
                <div className="wrapper for-header-icon">
                    <IconSVG iconType={IconType.GROUP_ARROW} iconColor={iconColor}/>
                </div>
                <h3>{props.groupHeader}</h3>
            </div>

            <div className={"information-group-content wrapper for-"+props.groupClassName}>
                {props.children}
            </div>
        </div>
    )
}

export default InformationGroup;