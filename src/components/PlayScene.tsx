import React, { useState, useEffect, useRef } from "react";

// Import: components
import MyHeader from "./header/MyHeader";
import ControlPanel from "./control/ControlPanel";
import GameField from "./game/GameField";
import ScoreTable from "./score/ScoreTable";
import Information from "./information/Information";
import Settings from "./settings/Settings";

// Import: classes, enums and functions
import { GamePhase, GameState, GameResult } from "../scripts/game_logic/game_process";
import { LogicField } from "../scripts/game_logic/logic_field";
import { FieldSettings } from "../scripts/game_logic/game_process"
import { ClickMode, ControlButtonAction, DisplayMode, getDifficultySettings } from "../scripts/utility/core";
import { CoordinatePair } from "../scripts/game_logic/logic_cell";


function PlayScene()
{   
    let fieldSettingsString = localStorage.getItem("FIELD_SETTINGS");
    let defaultFieldSettings: FieldSettings = new FieldSettings(5, 3, 3, 3, 1);
    if (fieldSettingsString !== null)
    {
        defaultFieldSettings = JSON.parse(fieldSettingsString);
    }
    // UseStates
    let [fieldSettings, setFieldSettings] = useState(defaultFieldSettings);
    let [gameState, setGameState] = useState(new GameState(GamePhase.IDLE, new LogicField(fieldSettings), false));
    let [clickMode, setClickMode] = useState(ClickMode.OPEN_CELL);
    let [displayMode, setDisplayMode] = useState(DisplayMode.GAME);
    let [timePassed, setTimePassed]= useState(0);
   
    // UseRefs
    let result = useRef<any>(undefined);

    // UseEffects
    useEffect(() => 
        {
            setGameState(new GameState(GamePhase.IDLE, new LogicField(fieldSettings), false));
            setClickMode(ClickMode.OPEN_CELL);
            localStorage.setItem("FIELD_SETTINGS", JSON.stringify(fieldSettings));
        }, [fieldSettings]); 
  
    useEffect(() => 
        {
            if (gameState.phase === GamePhase.END)
            {
                setClickMode(ClickMode.OPEN_CELL);
            }
        }, [gameState]); 

    // Functions
    let getResult = (victory: boolean, logicField: LogicField) =>
    {
        let currentScore = new GameResult(victory, logicField.numberOfBombs, 
                                        logicField.numberOfRows,
                                        logicField.numberOfColumns, 
                                        timePassed, 
                                        new Date());
        
        localStorage.setItem("LAST_SCORE", JSON.stringify(currentScore));
        let isNewBestScore = true;
        let bestScoreString = localStorage.getItem("BEST_SCORE");

        console.log("GR BS", localStorage.getItem("BEST_SCORE"));

        if (bestScoreString !== null)
        {
            try
            {
                let bestScore = JSON.parse(bestScoreString) as GameResult ;
                if (currentScore.isGreaterThan(bestScore))
                {
                    localStorage.setItem("BEST_SCORE", JSON.stringify(currentScore));
                }
                else
                {
                    isNewBestScore = false;
                }
            }
            catch (error: unknown)
            {
                localStorage.removeItem("BEST_SCORE");
                localStorage.setItem("BEST_SCORE", JSON.stringify(currentScore));
            }
        }
        else
        {
            localStorage.setItem("BEST_SCORE", JSON.stringify(currentScore));
        }

        //renders.current++; ,renders.current
        console.log("R", isNewBestScore, currentScore, localStorage.getItem("BEST_SCORE"));
        return {isNewBestScore: isNewBestScore, currentScore: currentScore};
    }
    
    let onCellClicked = (coordinates: CoordinatePair) =>
    {
        // Current GameState
        let logicField =    gameState.logicField;
        let phase =         gameState.phase;
        let victory =       gameState.victory;
        

        console.log("COORS", coordinates);

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
                victory = false;
                logicField.endGame();
                phase =  GamePhase.END;
                result.current = getResult(victory, logicField);
            
            }
        }
        else
        {
            logicField.flagCell(coordinates);
        }
        
        setGameState(new GameState(phase, logicField, victory));
    }

    let onControlButtonClicked = (buttonAction: ControlButtonAction) =>
    {
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
                result.current = getResult(victory, logicField)
                
                setGameState(new GameState(GamePhase.END, logicField, victory));
                break;
    
            case ControlButtonAction.RESTART:
            case ControlButtonAction.RETURN:
                //setClickMode(ClickMode.OPEN_CELL); (!!!)
                setGameState(new GameState(GamePhase.IDLE, new LogicField(fieldSettings), false));
                break;
    
            default:     
                console.log("Unknown action", buttonAction);
        }
    }


    return(
        <div className="play-scene">
            <header>
                <MyHeader
                    fieldSettings=          {fieldSettings}
                    numberOfRevealedCells=  {gameState.logicField.numberOfRevealedCells}
                    numberOfFlaggedCells=   {gameState.logicField.numberOfFlaggedCells}
                    phase=                  {gameState.phase}
                    setTimePassed=          {setTimePassed}
                    timePassed=             {timePassed}
                />
                <ControlPanel
                    phase=                  {gameState.phase}
                    clickMode=              {clickMode}
                    displayMode=            {displayMode}
                    onControlButtonClicked= {onControlButtonClicked}
                    result=                 {result.current}
                    
                    />
            </header>
            <main>        
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