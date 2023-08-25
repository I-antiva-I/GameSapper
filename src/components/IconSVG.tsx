import { IconType, getIconOffsetSVG, getIconPathSVG, getIconViewBoxSVG } from "../scripts/utility/managers/icon_manager";

interface IconSVGProps
{
    iconType:       IconType,
    iconColor?:     string,
}

function IconSVG(props: IconSVGProps)
{   
    return(
        <div className="wrapper for-icon-svg">
            <svg 
                className="icon-svg"
                xmlns="http://www.w3.org/2000/svg"
                viewBox={"0 0 "+getIconViewBoxSVG(props.iconType)}>

                <g fill={(props.iconColor) ? props.iconColor : "black"}transform={getIconOffsetSVG(props.iconType)}>
                    <path d={getIconPathSVG(props.iconType)}/>
                </g>

            </svg>
        </div>
    )
}


export default IconSVG;