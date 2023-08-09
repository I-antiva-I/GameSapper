import React, {useState} from "react";

import headerIcon from "../../images/icons/arrow-up.svg";



interface SettingsGroupProps
{
    isSubGroup:         boolean,
    isContentVisible:   boolean,
    groupHeader:        String,
    groupClassName:     String,
    children:           React.ReactNode,
}


function SettingsGroup(props: SettingsGroupProps)
{
    let [isContentVisible, setIsContentVisible] = useState(props.isContentVisible);
    let onHeaderClicked = () =>
    {
        setIsContentVisible(!isContentVisible);
    }

    return(
        <div className={"settings-group "+(props.isSubGroup ? "sub-group " : "main-group ")+props.groupClassName}>
            <div className={"settings-group-header"} onClick={()=>{onHeaderClicked()}}>
                <div>
                    <img src={headerIcon} style={{width: "16px", height: "16px"}}/>
                </div>
                {(props.isSubGroup) ?  <h4>{props.groupHeader}</h4> : <h3>{props.groupHeader}</h3>}
            </div>
            <div className={"settings-group-content "+props.groupClassName}
                    style={{display: (isContentVisible) ? "flex" : "none"}}>
                {props.children}
            </div>
        </div>
    )
}


export default SettingsGroup;