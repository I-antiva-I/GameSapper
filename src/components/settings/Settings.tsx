import React from "react";
import { Difficulty, getDifficultySettings } from "../../scripts/utility/core";
import SettingsGroup from "./SettingsGroup";
import FormCustomDifficulty from "./FormCustomDifficulty";
import { FieldSettings } from "../../scripts/game_logic/game_process";


function Settings(props: {setFieldSettings: Function})
{


    return(
        <div className="wrapper for-settings">
            <div className="settings">
                <h2>SETTINGS</h2>
                <SettingsGroup
                    isSubGroup={false}
                    isContentVisible={true}
                    groupHeader="Difficulty"
                    groupClassName="difficulty">

                    <button onClick={()=>{props.setFieldSettings(getDifficultySettings(Difficulty.EASY))}}>Easy</button>
                    <button onClick={()=>{props.setFieldSettings(getDifficultySettings(Difficulty.MEDIUM))}}>Medium</button>
                    <button onClick={()=>{props.setFieldSettings(getDifficultySettings(Difficulty.HARD))}}>Hard</button>
                    <SettingsGroup
                        isSubGroup={true}
                        isContentVisible={true}
                        groupHeader="Custom difficulty"
                        groupClassName="custom-difficulty">
                        <FormCustomDifficulty
                            //setFieldSettings={(settings: FieldSettings)=>{props.setFieldSettings(settings)}}
                            setFieldSettings={props.setFieldSettings}
                            />
                    </SettingsGroup>

                </SettingsGroup>
     


            </div>
        </div>

    )
}


export default Settings;