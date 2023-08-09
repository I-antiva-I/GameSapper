import React from "react";
import { adjustCellClass, adjustCellLowerPart, adjustCellUpperPart } from "../../scripts/utility/managers/cell_manager"
import { CellState, CoordinatePair } from "../../scripts/game_logic/logic_cell";


interface GameCellProps
{
    id:             String,
    style:          React.CSSProperties,

    coordinates:    CoordinatePair,
    state:          CellState,
    isOpened:       boolean,
    isFlagged:      boolean,
    isBomb:         boolean,
    bombCount:      number,

    onCellClicked:  Function,
}


function GameCell(props: GameCellProps)
{   
    // Display Cell
    return(
        <button
            className=  {"game-cell"+adjustCellClass(props.state, props.isOpened, props.isFlagged, props.isBomb, props.bombCount)}
            style=      {props.style}
            onClick=    {() => {props.onCellClicked(props.coordinates);}}>
            <div className="cell-upper-part">
                {adjustCellUpperPart(props.isOpened, props.isFlagged)}
            </div>
            <div className="cell-lower-part">
                {adjustCellLowerPart(props.state, props.isOpened, props.isFlagged, props.isBomb, props.bombCount)}
            </div>
        </button>
    )
}


export default GameCell;