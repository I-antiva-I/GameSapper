import React from "react";
import { GameDifficulty, getDifficultySettings } from "../../scripts/utility/core";
import SettingsGroup from "./SettingsGroup";
import FormCustomDifficulty from "./FormCustomDifficulty";
import { FieldSettings } from "../../scripts/game_logic/game_process";
import Difficulty from "./Difficulty";

function Settings(props: {setFieldSettings: Function})
{


    return(
        <div className="wrapper for-settings">
            <div className="settings">
                <div className="settings-header">
                    <h2>SETTINGS</h2>
                </div>
              
                <div className="settings-content">
                    <SettingsGroup
                            isSubGroup=         {false}
                            isContentVisible=   {true}
                            groupHeader=        "Difficulty"
                            groupClassName=     "difficulty">
                                
                            <Difficulty setFieldSettings={props.setFieldSettings}/>

                        </SettingsGroup>
                </div>
            </div>
        </div>

    )
}

export default Settings;