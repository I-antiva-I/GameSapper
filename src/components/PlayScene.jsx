import React, { useState, useEffect, useRef } from "react";

// COMPONENTS
import Timer from "./Timer";
import GameField from "./GameField";
import ScoreTable from "./ScoreTable";
import GameTitle from "./GameTitle";
import ControlButton from "./ControlButton";
import Options from "./Options";

// SCRIPTS+FUNCTIONS
import {selectDefaultSettings} from "../scripts/DifficultySettings"
import {getButtonState} from "../scripts/ButtonManager"
import { isAreaVisible } from "../scripts/AreaManager";
import { getGoodTime } from "../scripts/DateManager";
import { findBestScore } from "../scripts/ScoreManager";
    //  GAME STATES: AWAIT PLAY OVER WIN
    // SCENE STATES: IDLE SETUP SCORE GAME DEFAULT* FLAG*

function PlayScene()
{   
    // SCENE + GAME STATE
    let [sceneState,setSceneState]=useState("IDLE");    // GAME-SCORE-OPTIONS
    let [gameState,setGameState]=useState("AWAIT");
    let [timerState,setTimerState]=useState(false);

    // SCORE
    let [lastScore,setLastScore]=useState(JSON.parse(localStorage.getItem("last_score")));
    let [bestScore,setBestScore]=useState(JSON.parse(localStorage.getItem("best_score")));
   
    // OPTIONS
    let [gameSettings,setGameSettings]=useState(selectDefaultSettings(1));
   
    // GAME VARS
    let [clickMode,setClickMode]=useState("DEFAULT");
    let [numberOfRevealedCells,setNumberOfRevealedCells]=useState(0);
    let [numberOfFlaggedCells,setNumberOfFlaggedCells]=useState(0);
    
    //   FUNCTIONS
    // FIELD
    let functionRestartGame = useRef(null);
    let functionEndGame = useRef(null);
    // TIMER
    let functionGetTimeVal = useRef(null)
    let functionResetTimeVal = useRef(null)

    function onGameStarted()
    {
        functionResetTimeVal.current();
        setTimerState(true);
    }




    function onGameFinished(victory)
    {
    
        setTimerState(false);
        if(victory)
        {
            setGameState("WIN");
            //console.log("VICTORY!",functionGetTimeVal.current())

            let timeVal=document.getElementById("g-timer").innerHTML;

            // LAST SCORE
            let tempLast=
            {
                  bombs: gameSettings.numberOfBombsMax,
                  size: gameSettings.numberOfCols*gameSettings.numberOfRows,
                  seconds: timeVal,
                  date: getGoodTime(),
            }

            localStorage.setItem("last_score",JSON.stringify(tempLast))
            localStorage.setItem("best_score",JSON.stringify(findBestScore(tempLast,bestScore)))

            //console.log("L>>",localStorage.getItem("last_score"));
            //console.log("B>>",localStorage.getItem("best_score"));

            setBestScore(findBestScore(tempLast,bestScore))
            setLastScore(tempLast);
            
        }
        else
        {
            setGameState("OVER");
        }
        setNumberOfRevealedCells(0);
        setNumberOfFlaggedCells(0);
    }

    function updateGameInfo(info)
    {  
        setGameState("PLAY")
        if(info.isGameOver)
        {
            setGameState("OVER")
        }
        else
        {        
            setNumberOfRevealedCells(info.numberOfRevealedCells);
            setNumberOfFlaggedCells(info.numberOfFlaggedCells);
        }

    }

    function onGameButtonClicked()
    {
        setSceneState("GAME");
        if(gameState==="OVER" || gameState==="WIN")
        {
            setGameState("AWAIT");
            functionRestartGame.current();
        }
    }


    let setCustomSettings = (event) => {
        event.preventDefault()

        let customSettings=
        {
            numberOfCols:event.target[2].value,
            numberOfRows:event.target[3].value,
            numberOfBombsMin:event.target[1].value,
            numberOfBombsMax:event.target[0].value,
            safeZoneRadius:event.target[4].value,
        }

        setGameSettings(customSettings);
      }
    
    

    return (
        <div className="play-scene">
            <GameTitle/>

            <div className="game-controls">

                {/*SETTINGS*/}
                <ControlButton
                    className="control-exit"
                    buttonState={getButtonState("Settings",gameState,sceneState)}
                    labelText="Options"
                    onClickFunction={()=>{setSceneState("SETUP")}}
                />

                {/*SCORE*/}
                <ControlButton
                    className="control-score"
                    buttonState={getButtonState("Score",gameState,sceneState)}
                    labelText="Score"
                    onClickFunction={()=>{setSceneState("SCORE")}}
                />
 
                {/*RESTART+GAMEON*/}
                <ControlButton
                    className="control-game"
                    buttonState={getButtonState("Game",gameState,sceneState)}
                    labelText="Play"
                    onClickFunction={()=>{onGameButtonClicked()}}
                />
 
                {/*TIMER*/}
                <div className="control-item control-timer">
                    <Timer state={timerState}
                            functionGetTimeVal={functionGetTimeVal}
                            functionResetTimeVal={functionResetTimeVal}
                    />
                    <div className="contol-label">Timer</div>
                </div>
                
                {/*END GAME*/}
                <ControlButton
                    className="control-submit"
                    buttonState={getButtonState("Done",gameState,sceneState)}
                    labelText="Finish"
                    onClickFunction={()=>{functionEndGame.current()}}
                />

                {/*CLICK REVEAL*/}
                <ControlButton
                    className="control-click"
                    buttonState={getButtonState("Open",gameState,clickMode)}
                    labelText="Open"
                    onClickFunction={()=>{setClickMode("DEFAULT");}}
                />
                
                {/*CLICK FLAG*/}
                <ControlButton
                    className="control-click"
                    buttonState={getButtonState("Mark",gameState,clickMode)}
                    labelText="Mark"
                    onClickFunction={()=>{setClickMode("FLAG");}}
                />
            </div>

            {/* SCORE AREA*/}
            <ScoreTable
                isVisible={isAreaVisible("SCORE",sceneState)}
                bestScore={bestScore}
                lastScore={lastScore}
            />
         
           {/* OPTIONS AREA */}
            <Options
                isVisible={isAreaVisible("OPTIONS",sceneState)}
                setterGameSettings={setGameSettings}
                functionOnSubmit={setCustomSettings}
            />


           <div className={`game-area ${ isAreaVisible("GAME",sceneState) ? "" : "hidden"}`} >
                <div className="game-info">
                        <div className="info-state">
                            <div>Status: {gameState}</div>
                        </div>

                        <div className="info-flags">
                            <div>Flags: {numberOfFlaggedCells}/{gameSettings.numberOfCols*gameSettings.numberOfRows-numberOfRevealedCells}</div>
                        </div>

                        <div className="info-cells">
                            <div>Opened: {numberOfRevealedCells}/{gameSettings.numberOfCols*gameSettings.numberOfRows}</div>
                        </div>

                        <div className="info-boms">
                            <div>Bombs: {gameSettings.numberOfBombsMin}-{gameSettings.numberOfBombsMax}</div>
                        </div>

                        <div className="info-check">
                            <div>Size: {gameSettings.numberOfCols}x{gameSettings.numberOfRows}</div>
                        </div>
                </div>


                <GameField 
                        settings={gameSettings}
                        clickMode={clickMode}

                        callbackGameStarted={() =>  {onGameStarted()}}
                        callbackGameUpdated={(info) => {updateGameInfo(info)}}
                        callbackGameFinished={(victory) => {onGameFinished(victory)}}
                        callbackGameRestarted={() => {}}

                        state={gameState}
                        functionRestartGame={functionRestartGame}
                        functionEndGame={functionEndGame}
                />



            </div>
        </div>




    );
}

export default PlayScene;