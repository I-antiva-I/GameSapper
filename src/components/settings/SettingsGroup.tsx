import React, {useState} from "react";
import headerIcon from "../../images/icons/arrow.svg";

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
        <div className={"settings-group"+
                        ((props.isSubGroup) ? " sub-group" : " main-group")+
                        " group-"+props.groupClassName+
                        ((isContentVisible) ? " visible" : " hidden" )}>

            <div className={"settings-group-header"+((props.isSubGroup) ? " sub-group" : " main-group")} onClick={()=>{onHeaderClicked()}}>
                <div className="wrapper for-header-icon">
                    <img className="header-icon" src={headerIcon}/>
                </div>
                {(props.isSubGroup) ?  <h4>{props.groupHeader}</h4> : <h3>{props.groupHeader}</h3>}
            </div>

            <div className={"settings-group-content"+((props.isSubGroup) ? " sub-group" : " main-group")+" wrapper for-"+props.groupClassName}>
                {props.children}
            </div>
        </div>
    )
}


export default SettingsGroup;