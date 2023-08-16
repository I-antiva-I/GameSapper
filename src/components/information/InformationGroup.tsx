import React, {useState} from "react";
import headerIcon from "../../images/icons/arrow.svg";

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
    let onHeaderClicked = () =>
    {
        setIsContentVisible(!isContentVisible);
    }

    return(
        <div className={"information-group "+props.groupClassName+((isContentVisible) ? " visible" : " hidden" )}>
            
            <div className={"information-group-header"} onClick={()=>{onHeaderClicked()}}>
                <div className="wrapper for-header-icon">
                    <img className="header-icon" src={headerIcon}/>
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