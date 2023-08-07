import GameCell from "./GameCell";


function GameField(props) 
{
    let logicField = props.logicField;

    // Display GameField
    return(
        <div className="game-field">
                {
                    logicField.getCellsAsList().map((cell) => 
                        <GameCell
                            // Display properties
                            key=        {cell.row+"-"+cell.column}
                            id=         {"cell-"+cell.row+"-"+cell.column}
                            style=      {{gridRow:cell.row+1, gridColumn:cell.column+1}}

                            // Gameplay properties
                            isOpened=   {cell.isOpened}
                            isBomb=     {cell.isBomb}
                            isFlagged=  {cell.isFlagged}
                            state=      {cell.state}
                            coors=      {{row: cell.row, column:cell.column}}
                            bombCount=  {cell.bombCount}

                            // Callback function
                            onCellClicked={props.onCellClicked}
                        />
                    )
                }
        </div>
    )
}


export default GameField;

