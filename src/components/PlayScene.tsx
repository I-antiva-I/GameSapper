import React, { useState, useEffect, useRef } from "react";

// Import: components
import MyHeader from "./other/MyHeader";
import ControlPanel from "./control/ControlPanel";
import GameField from "./game/GameField";
import ScoreTable from "./other/ScoreTable";
import Information from "./other/Information";
import Settings from "./settings/Settings";

// Import: classes, enums and functions
import { GamePhase, GameState, GameResult } from "../scripts/game_logic/game_process";
import { LogicField } from "../scripts/game_logic/logic_field";
import { FieldSettings } from "../scripts/game_logic/game_process"
import { ClickMode, ControlButtonAction, DisplayMode } from "../scripts/utility/core";
import { CoordinatePair } from "../scripts/game_logic/logic_cell";
import Victory from "./other/Victory";
import Timer from "./other/Timer";



function PlayScene()
{   
    // States
    let [fieldSettings, setFieldSettings] = useState(new FieldSettings(5, 3, 3, 3, 1));
    let [gameState, setGameState] = useState(new GameState(GamePhase.IDLE, new LogicField(fieldSettings)));
    let [clickMode, setClickMode] = useState(ClickMode.OPEN_CELL);
    let [displayMode, setDisplayMode] = useState(DisplayMode.GAME);
    let [victory, setVictory] = useState(false);



    useEffect(() => 
    {
        let phase = gameState.phase;    // IDLE
        setGameState(new GameState(phase, new LogicField(fieldSettings)));
    }, 
    [fieldSettings]); 


    let getResult = () =>
    {
        let bombs = gameState.logicField.numberOfBombs;
        let cells = gameState.logicField.numberOfColumns * gameState.logicField.numberOfRows;
        console.log(cells, bombs);
        return new GameResult(bombs, cells, 3600);
        //JSON.stringify(yourObject);
    }
    
    // Functions
    let onCellClicked = (coordinates: CoordinatePair) =>
    {
        console.log("Received", coordinates);

        // Current GameState
        let logicField =    gameState.logicField;
        let phase =         gameState.phase;
        
        // Generate field if the first cell is clicked
        if (phase === GamePhase.IDLE)
        {
            logicField.generateField(coordinates);
            phase= GamePhase.IN_PROGRESS;
        }

        // Interact with clicked cell (Open/Flag)
        if (clickMode === ClickMode.OPEN_CELL)
        {
            if (!logicField.openCell(coordinates))
            {
                let victory = logicField.endGame();
                phase =  GamePhase.END;
                setVictory(victory);
            }
        }
        else
        {
            logicField.flagCell(coordinates);
        }
        
        setGameState(new GameState(phase, logicField));
        console.log(logicField);
    }

    let onControlButtonClicked = (buttonAction: ControlButtonAction) =>
    {
        console.log("CB", ControlButtonAction[buttonAction]);
        switch(buttonAction)
        {
            case ControlButtonAction.INFO:
                setDisplayMode(DisplayMode.INFO)
                break;

            case ControlButtonAction.SETTINGS:
                setDisplayMode(DisplayMode.SETTINGS)
                break;
    
            case ControlButtonAction.SCORE:
                setDisplayMode(DisplayMode.SCORE)
                break;
    
            case ControlButtonAction.PLAY:
                setDisplayMode(DisplayMode.GAME)
                break;
    
            case ControlButtonAction.MODE_OPEN_CELL:
                setClickMode(ClickMode.OPEN_CELL);
                break;
    
            case ControlButtonAction.MODE_FLAG_CELL:
                setClickMode(ClickMode.FLAG_CELL);
                break;
    
            case ControlButtonAction.END_GAME:
                let logicField = gameState.logicField;
                let victory = logicField.endGame();
                console.log(victory);
                setVictory(victory);
                setGameState(new GameState(GamePhase.END, logicField));
                break;
    
            case ControlButtonAction.RESTART:
            case ControlButtonAction.RETURN:
                setClickMode(ClickMode.OPEN_CELL);
                setGameState(new GameState(GamePhase.IDLE, new LogicField(fieldSettings)));
                break;
    
            default:     
                console.log("Unknown action", buttonAction);
        }
    }


    return(
        <div className="play-scene">
            <header>
                <MyHeader/>
                <ControlPanel
                    phase={                 gameState.phase}
                    clickMode=              {clickMode}
                    displayMode=            {displayMode}
                    onControlButtonClicked= {onControlButtonClicked}/>
            </header>

            <main>
                {
                    //"HEADER PLACEHOLDER "+GamePhase[gameState.phase]+" WIN:"+victory
                }

                <Timer></Timer>

                {   
                    // Win
                    ((displayMode === DisplayMode.GAME) && (gameState.phase === GamePhase.END)) &&
                    <Victory 
                        result={getResult()}
                        victory={victory}/>
                }
                {   
                    // GameField
                    (displayMode === DisplayMode.GAME) &&
                    <GameField 
                        logicField=     {gameState.logicField}
                        onCellClicked=  {onCellClicked}/>
                }

                {   
                    // Information
                    (displayMode === DisplayMode.INFO) &&
                    <Information/>
                }

                {   
                    // Settings
                    (displayMode === DisplayMode.SETTINGS) &&
                    <Settings
                        setFieldSettings={setFieldSettings}/>
                }
                
                {   
                    // ScoreTable
                    (displayMode === DisplayMode.SCORE) &&
                    <ScoreTable/>
                }
            </main>

        </div>
    );
}


export default PlayScene;