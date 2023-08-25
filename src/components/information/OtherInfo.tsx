import React from "react";
import { GameResult } from "../../scripts/game_logic/game_process";
import IconSVG from "../IconSVG";
import { IconType } from "../../scripts/utility/managers/icon_manager";

function OtherInfo()
{   
    return(
        <div className="other-info">
            <div className="other-info-item info-github">
                <IconSVG iconType={IconType.GITHUB} iconColor="white"/>
                <div className="info-link">
                    <a href="https://github.com/I-antiva-I/GameSapper">GitHub - Game repository</a>
                </div>
            </div>
            
            <div className="other-info-item info-font-awesome">
                <IconSVG iconType={IconType.FONT_AWESOME} iconColor="white"/>
                <div className="info-link">
                    <a href="https://fontawesome.com">FontAwesome - Icon library</a>
                </div>
            </div>

            <div className="other-info-item info-wiki">
                <IconSVG iconType={IconType.QUESTION_IN_CIRCLE} iconColor="white"/>
                <div className="info-link">
                    <a href="https://en.wikipedia.org/wiki/Minesweeper_(video_game)">Wikipedia - More about the game</a>
                </div>
            </div>
        </div>
    )
}


export default OtherInfo;