import React from "react";

function GameCell(props)
{   
    function adjustClassName()
    {
        let classFix=""
        if(props.isOpened)
        {
            classFix=classFix+" opened";
            if(!props.isBomb)
            {
                if(props.state==="mistaken")
                {
                    classFix=classFix+" mistaken";
                }
                else
                if(props.bombCount)
                {
                    classFix=classFix+" digit-"+props.bombCount;
                }  
            }
            else
            {
                if(props.state=="defused")   {classFix=classFix+" defused";}
                if(props.state=="triggered") {classFix=classFix+" triggered";}
            }
        }
        else
        {
            classFix=classFix+" closed";
            if(props.isFlagged)
            {
            }

        }
        return classFix
    }

    function adjustButtonText()
    {
        let text="";
        if(props.isOpened)
        {
            if(props.isBomb)
            {
                text="💣";
            }
            else
            if(props.state==="mistaken")
            {
                text="❌";
            }
            else
            if(props.bombCount)
            {
                text=props.bombCount;
            }
            
        }
        else if (props.isFlagged)
        {
            text="🚩";
        }

        return text;
    }



    return(
        <button
            className={props.className+adjustClassName()}
            style={props.style}
            onClick={() => 
            {
                if(!props.isOpened) {props.callback(props.coors, props.isBomb);} else
                {console.log("Button is Already Opened!")}
            }}>
            { 
               adjustButtonText()
            }
        </button>
    )
}



GameCell.defaultProps = 
{
    className: "Empty",
    callback: () => 
        {console.log("This button doesn't have assigned callback function!")},
};

export default GameCell;