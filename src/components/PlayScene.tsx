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
import { ClickMode, ControlButtonAction, DisplayMode, GameDifficulty, getDifficultySettings } from "../scripts/utility/core";
import { CoordinatePair } from "../scripts/game_logic/logic_cell";


function PlayScene()
{   
    // Default field settings 
    let defaultFieldSettings: FieldSettings;

    // Try to get saved settings from local storage
    let fieldSettingsString = localStorage.getItem("FIELD_SETTINGS");
    if (fieldSettingsString !== null)
    {
        defaultFieldSettings = JSON.parse(fieldSettingsString);
    }
    else
    {
        defaultFieldSettings = getDifficultySettings(GameDifficulty.VERY_EASY);
    }

    // States
    let [fieldSettings, setFieldSettings] =     useState(defaultFieldSettings);
    let [gameState, setGameState] =             useState(new GameState(GamePhase.IDLE, new LogicField(fieldSettings), false));
    let [clickMode, setClickMode] =             useState(ClickMode.OPEN_CELL);
    let [displayMode, setDisplayMode] =         useState(DisplayMode.GAME);
   
    // Refs
    let result =        useRef<any>(undefined);
    let timePassed=     useRef<number>(0);
    // Time passed manipulators
    let increaseTimePassed =    () => {timePassed.current=timePassed.current+1;}
    let nullifyTimePassed =     () => {timePassed.current = 0;}

    // Effects 
    // Change of fieldSettings
    useEffect(() => 
        {
            setGameState(new GameState(GamePhase.IDLE, new LogicField(fieldSettings), false));
            setClickMode(ClickMode.OPEN_CELL);
            localStorage.setItem("FIELD_SETTINGS", JSON.stringify(fieldSettings));
        }, [fieldSettings]);

    // Change of gameState
    useEffect(() => 
        {
            if (gameState.phase === GamePhase.END) 
            {
                setClickMode(ClickMode.OPEN_CELL);
            }
            if (gameState.phase === GamePhase.IDLE)
            {
                setDisplayMode(DisplayMode.GAME);
            }
        }, [gameState]); 

    // Functions
    // Get end score of the game
    let getResult = (victory: boolean, logicField: LogicField) =>
    {
        // Achieved score
        let currentScore = new GameResult(victory, 
                                        logicField.numberOfBombs,
                                        logicField.numberOfBombsFound,
                                        logicField.numberOfRows,
                                        logicField.numberOfColumns, 
                                        timePassed.current, 
                                        new Date());

        // Remember achieved score as LAST_SCORE
        localStorage.setItem("LAST_SCORE", JSON.stringify(currentScore));

        // By default achieved score is the new best score 
        let isNewBestScore = true;

        // Check if achieved score is really the new best score 
        let bestScoreString = localStorage.getItem("BEST_SCORE");
        if (bestScoreString !== null)
        {
            // Try to compare
            try
            {
                let bestScore = JSON.parse(bestScoreString);
                if (currentScore.isGreaterThan(bestScore))
                {
                    localStorage.setItem("BEST_SCORE", JSON.stringify(currentScore));
                }
                else
                {
                    isNewBestScore = false;
                }
            }
            // Unable to compare
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

        return {isNewBestScore: isNewBestScore, currentScore: currentScore};
    }
    
    let onCellClicked = (coordinates: CoordinatePair) =>
    {
        // Current GameState
        let logicField =    gameState.logicField;
        let phase =         gameState.phase;
        let victory =       gameState.victory;

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
                    // Time
                    increaseTimePassed=     {increaseTimePassed}
                    nullifyTimePassed=      {nullifyTimePassed}
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