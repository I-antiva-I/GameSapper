import GameCell from "./GameCell";
import React, { useState, useEffect, useRef } from "react";

import {ClassField} from "../scripts/ClassField"



function useForceUpdate()
{
    const [value, setValue] = useState(0); // integer state
    return () => setValue(value => value + 1); // update state to force render
    // A function that increment 👆🏻 the previous state like here 
    // is better than directly setting `setValue(value + 1)`
}


function GameField(props) 
{
    // SETTINGS
    let numberOfCols =  props.settings.numberOfCols;
    let numberOfRows =  props.settings.numberOfRows;
    function getRandomNumber(min, max) 
    {
        min = Math.ceil(min);
        max = Math.floor(max);
        let val = Math.floor(Math.random() * (max - min + 1) + min);
        //console.log("Random is",val);

        return val;
    }
    let safeZoneRadius = props.settings.safeZoneRadius;
    // -------------------------

    let forceUpdate = useForceUpdate() 
    let field = useRef(new ClassField(0,0,0,0));

    let [fieldState, setFieldState] = useState(props.state);

    useEffect(() => 
    {
        // props.functionToRun.current =  () => {console.log("HELLO");return "GOOD TO SEE YOU"} ;
        props.functionRestartGame.current = () => 
        {
            field.current=new ClassField(
                numberOfCols,
                numberOfRows,
                getRandomNumber(props.settings.numberOfBombsMin,props.settings.numberOfBombsMax),
                safeZoneRadius);
            setFieldState("PREPARED");
            forceUpdate()
        };

        props.functionEndGame.current =  () =>
        {
            let victory=field.current.revealFieldEndGame();
            forceUpdate();
            props.callbackGameFinished(victory);
        };
    },
    []);

    useEffect(() => 
    {
        field.current=new ClassField(
            numberOfCols,
            numberOfRows,
            getRandomNumber(props.settings.numberOfBombsMin,props.settings.numberOfBombsMax),
            safeZoneRadius);
        setFieldState("PREPARED")

    },[props.settings]);




   


    function onCellClicked(coors,isBomb)
    {
            //console.log(">>>> Cell at X",coors.coorX,"Y",coors.coorY,"pressed, bomb?",isBomb,props.clickMode)

            if(fieldState==="PREPARED")
            {
                props.callbackGameStarted();
                field.current.generateField(coors) // [!] new ClassField value will be ignored by useRefs 
                setFieldState("GENERATED") 
                field.current.openCell(coors)
            }
            else
            {   
                if(props.clickMode==="FLAG")
                {
                    field.current.flagCell(coors);
                }
                else
                {
                    field.current.openCell(coors);
                    if(isBomb) 
                    {
                        //console.log("KABOOOM!")
                        props.callbackGameFinished();
                        field.current.getCell(coors.coorX,coors.coorY).state="triggered";
                        field.current.revealField();
                    }      
                }
                forceUpdate()
            }
            sendInfo(isBomb && props.clickMode==="DEFAULT" );    
    }

    function sendInfo(isGameOver)
    {
        let info=
        {
            numberOfRevealedCells: field.current.numberOfRevealedCells,
            numberOfFlaggedCells: field.current.numberOfFlaggedCells,
            isGameOver: isGameOver,
        }

        props.callbackGameUpdated(info);
    }


    return(
        <div>
            <div className="game-field">
                {
                    field.current.getCellsAsList().map((cell) => 
                        <GameCell
                            key={cell.coorX+"-"+cell.coorY}
                            id={"cell-"+cell.coorX+"-"+cell.coorY}
                            className={"game-cell"}
                            style={{gridRow:cell.coorY+1, gridColumn:cell.coorX+1}}

                            isOpened={cell.isOpened}
                            isBomb={cell.isBomb}
                            isFlagged={cell.isFlagged}
                            state={cell.state}
                            coors={{coorX: cell.coorX, coorY:cell.coorY}}
                            bombCount={cell.bombCount}

                            callback={onCellClicked}
                        />
                    )
                }
            </div>
            {/* <button onClick={()=>{console.log(field.current.cells)}}>???</button> */}
            
        </div>
    )

}

export default GameField;