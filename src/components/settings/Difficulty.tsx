import React from "react";
import { GameResult } from "../../scripts/game_logic/game_process";
import { GameDifficulty, getDifficultySettings } from "../../scripts/utility/core";
import SettingsGroup from "./SettingsGroup";
import FormCustomDifficulty from "./FormCustomDifficulty";

interface BasicDifficultyProps
{
    setFieldSettings: Function,
}

function BasicDifficulty(props: BasicDifficultyProps)
{   
    return(
        <div className="difficulty">

            <div className="basic-difficulty">
                <button onClick={()=>{props.setFieldSettings(getDifficultySettings(GameDifficulty.VERY_EASY))}}>
                    Very Easy
                </button>
                <button onClick={()=>{props.setFieldSettings(getDifficultySettings(GameDifficulty.EASY))}}>
                    Easy
                </button>
                <button onClick={()=>{props.setFieldSettings(getDifficultySettings(GameDifficulty.MEDIUM))}}>
                    Medium
                </button>
                <button onClick={()=>{props.setFieldSettings(getDifficultySettings(GameDifficulty.HARD))}}>
                    Hard
                </button>
                <button onClick={()=>{props.setFieldSettings(getDifficultySettings(GameDifficulty.VERY_HARD))}}>
                    Very Hard
                </button>
            </div>

            <SettingsGroup
                isSubGroup=         {true}
                isContentVisible=   {true}
                groupHeader=        "Custom difficulty"
                groupClassName=     "custom-difficulty">
                <FormCustomDifficulty setFieldSettings={props.setFieldSettings}/>
            </SettingsGroup>

        </div>
    )
}


export default BasicDifficulty;