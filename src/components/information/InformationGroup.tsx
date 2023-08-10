import React, {useState} from "react";

import headerIcon from "../../images/icons/arrow-up.svg";



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
        <div className={"information-group "+props.groupClassName}>
            <div className={"information-group-header"} onClick={()=>{onHeaderClicked()}}>
                <div>
                    <img src={headerIcon} style={{width: "16px", height: "16px"}}/>
                </div>
                <h3>{props.groupHeader}</h3>
            </div>
            <div className={"information-group-content "+props.groupClassName}
                    style={{display: (isContentVisible) ? "flex" : "none"}}>
                {props.children}
            </div>
        </div>
    )
}


export default InformationGroup;