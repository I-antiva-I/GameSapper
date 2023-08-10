import { LogicField } from "../../scripts/game_logic/logic_field";
import GameCell from "./GameCell";


interface GameFieldProps
{
    logicField:     LogicField,
    onCellClicked:  Function,
}


function GameField(props: GameFieldProps) 
{
    // Display GameField
    return(
        <div className="wrapper for-game-field">
            <div className="game-field">
                {
                    props.logicField.getCellsAsList().map((cell) => 
                        <GameCell
                            // Display properties
                            key=        {cell.coordinates.row+"-"+cell.coordinates.column}
                            id=         {"cell-"+cell.coordinates.row+"-"+cell.coordinates.column}
                            style=      {{gridRow:cell.coordinates.row+1, gridColumn:cell.coordinates.column+1}}

                            // Gameplay properties
                            isOpened=       {cell.isOpened}
                            isBomb=         {cell.isBomb}
                            isFlagged=      {cell.isFlagged}
                            state=          {cell.state}
                            coordinates=    {cell.coordinates}
                            bombCount=      {cell.bombCount}

                            // Callback function
                            onCellClicked=  {props.onCellClicked}
                        />
                    )
                }
            </div>
        </div>
    )
}


export default GameField;

