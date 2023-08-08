import React from "react";
import {adjustCellClass, adjustCellContent } from "../../scripts/utility/managers/cell_manager"


function GameCell(props)
{   
    // Utility info
    let cellInfo=
    {
        state:          props.state,
        isOpened:       props.isOpened,
        isFlagged:      props.isFlagged,
        isBomb:         props.isBomb,
        bombCount:      props.bombCount,
    }
    
    // Display Cell
    return(
        <button
            className=  {"game-cell "+adjustCellClass(cellInfo)}
            style=      {props.style}
            onClick=    {() => {props.onCellClicked(props.coors);}}>
            {adjustCellContent(cellInfo)}
        </button>
    )
}


export default GameCell;