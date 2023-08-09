import React from "react";
import { Difficulty, getDifficultySettings } from "../../scripts/utility/core";


function Settings(props: {setFieldSettings: Function})
{
    return(
        <div className="settings">
            <h2>SETTINGS PLACEHOLDER</h2>
            <div className="button-container">
                <button onClick={()=>{props.setFieldSettings(getDifficultySettings(Difficulty.EASY))}}>Easy</button>
                <button onClick={()=>{props.setFieldSettings(getDifficultySettings(Difficulty.MEDIUM))}}>Medium</button>
                <button onClick={()=>{props.setFieldSettings(getDifficultySettings(Difficulty.HARD))}}>Hard</button>
            </div>
        </div>
    )
}


export default Settings;