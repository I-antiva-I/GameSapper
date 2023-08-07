import React, { useState, useEffect, useRef } from "react";

// COMPONENTS
import GameField from "./game/GameField";
import MyHeader from "./other/MyHeader";

// CLASSES + FUNCTIONS
import { GameState } from "../scripts/game_logic/game_state";
import { LogicField } from "../scripts/game_logic/logic_field";
import { GameSettings } from "../scripts/game_logic/game_settings"
import ControlPanel from "./control/ControlPanel";
import Options from "./other/Options";
import ScoreTable from "./other/ScoreTable";
import InfoPanel from "./other/InfoPanel";


function PlayScene(props)
{   
    // Game field settings
    let [gameSettings, setGameSettings] =      useState(new GameSettings(5, 3, 3, 3, 1));

    // Game state
    // States: STATE_IDLE, STATE_IN_PROGRESS, STATE_END
    let [gameState, setGameState] = 
        useState(new GameState("STATE_IDLE", new LogicField(gameSettings)));  
    
    // Click mode
    // Modes: CLICK_OPEN, CLICK_FLAG
    let [clickMode, setClickMode] = useState("CLICK_OPEN");

    // Display mode
    // Modes: DISPLAY_GAME, DISPLAY_SETTINGS, DISPLAY_SCORE, DISPLAY_INFO
    let [displayMode, setDisplayMode] = useState("DISPLAY_GAME");

    let [victory, setVictoty] = useState(false);

    //
    let onCellClicked = (coors) =>
    {
        console.log("App recieved coordinates: ", coors, clickMode);
        
        let logicField =    gameState.logicField;
        let state =         gameState.currentState;
    
        // Generate field if the first cell is clicked
        if (state == "STATE_IDLE")
        {
            logicField.generateField(coors);
            state= "STATE_IN_PROGRESS";
        }

        // Interact with clicked cell (Open/Flag)
        if (clickMode == "CLICK_OPEN")
        {
            if (!logicField.openCell(coors))
            {
                let victory = logicField.endGame();
                state = "STATE_END";
                console.log(victory);
                setVictoty(victory);
            }
        }
        else
        {
            logicField.flagCell(coors);
        }
        
        setGameState(new GameState(state, logicField));
        console.log(logicField);
    }    

    //
    let changeDifficultySettings= (settings) =>
    {
        console.log(settings);

        setGameSettings(settings);
        setGameState(new GameState("STATE_IDLE", new LogicField(settings), false));
    }

    //
    let onControlButtonClicked= (buttonAction) =>
    {
        console.log("ACT", buttonAction)

        switch(buttonAction)
        {
            case "ACTION_INFO":
                setDisplayMode("DISPLAY_INFO");
                break;

            case "ACTION_SETTINGS":
                setDisplayMode("DISPLAY_SETTINGS");
                break;

            case "ACTION_SCORE":
                setDisplayMode("DISPLAY_SCORE");
                break;

            case "ACTION_PLAY":
                setDisplayMode("DISPLAY_GAME");
                break;

            case "ACTION_MODE_OPEN":
                setClickMode("CLICK_OPEN");
                break;

            case "ACTION_MODE_FLAG":
                setClickMode("CLICK_FLAG");
                break;

            case "ACTION_END_GAME":
                let logicField = gameState.logicField;
                let victory = logicField.endGame();
                console.log(victory);
                setVictoty(victory);
                setGameState(new GameState("STATE_END", logicField));
                break;

            case "ACTION_RETURN":
            case "ACTION_RESTART":
                setClickMode("CLICK_OPEN");
                setGameState(new GameState("STATE_IDLE", new LogicField(gameSettings)));
                break;

            case "ACTION_RETURN":
                break;

            default:     
                console.log("No such action", buttonAction);
        } 
    }


    let controlInfo =
    {
        clickMode:      clickMode,
        displayMode:    displayMode,
        gameState:      gameState.currentState,
    }

    return(
        <div className="play-scene">
            <header>
                <MyHeader/>
                <ControlPanel
                    controlInfo=            {controlInfo}
                    onControlButtonClicked= {onControlButtonClicked}/>
            </header>

            <main>
                {   // Render GameField
                    ((displayMode=="DISPLAY_GAME") && (gameState.currentState==="STATE_END")) &&
                    <div>
                        {victory ? "Victory" : "Defeat"}
                    </div>
                }

                {   // Render GameField
                    (displayMode=="DISPLAY_GAME") &&
                    <GameField 
                        logicField=     {gameState.logicField}
                        onCellClicked=  {onCellClicked}/>
                }

                {   // Render Options
                    (displayMode=="DISPLAY_SETTINGS") &&
                    <Options
                        changeDifficultySettings= {changeDifficultySettings}/>
                }

                {   // Render ScoreTable
                    (displayMode=="DISPLAY_SCORE") &&
                    <ScoreTable/>
                }

                {   // Render Info
                    (displayMode=="DISPLAY_INFO") &&
                    <InfoPanel/>
                }
            </main>

        </div>
    );
}

export default PlayScene;