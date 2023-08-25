import React from "react";
import { GameResult } from "../../scripts/game_logic/game_process";
import IconSVG from "../IconSVG";
import { IconType } from "../../scripts/utility/managers/icon_manager";

function HowToInfo()
{   
    return(
        <div className="how-to-info">
            <div className="how-to-item">
                <h4>Cells and Bombs</h4>
                <div className="how-to-item-text">
                    <p>After a cell was opened, it will display a digit, which indicates the number of bombs adjacent to cell.</p>
                </div>

                <div className="example-grid">
                    <div className="example-cell bomb">💣</div>
                    <div className="example-cell digit-2">2</div>
                    <div className="example-cell bomb">💣</div>
                    <div className="example-cell digit-2">2</div>
                    <div className="example-cell digit-3">3</div>
                    <div className="example-cell digit-2">1</div>
                    <div className="example-cell bomb">💣</div>
                    <div className="example-cell digit-1">1</div>
                    <div className="example-cell"></div>
                </div>
            </div>

            <div className="how-to-item">
                <h4>Safe Zone</h4>
                <div className="how-to-item-text">
                    <p>The first opened cell (blue) is guaranteed to be empty.</p>
                    <p>There are also additional empty cells (green), number of which depends on "Safe Zone Radius" parameter.</p>
                    <p>In this example "Safe Zone Radius" equals to one.</p>
                </div>

                <div className="example-grid">
                    <div className="example-cell">?</div>
                    <div className="example-cell safe">OK</div>
                    <div className="example-cell">?</div>
                    <div className="example-cell safe">OK</div>
                    <div className="example-cell start">OK</div>
                    <div className="example-cell safe">OK</div>
                    <div className="example-cell">?</div>
                    <div className="example-cell safe">OK</div>
                    <div className="example-cell">?</div>
                </div>
            </div>

            <div className="how-to-item">
                <h4>Modes</h4>
                <div className="how-to-item-text">
                    <p>There are two modes: OPEN and FLAG</p>
                    <p className="p-with-margin">When OPEN mode is active, click will open the cell.</p>
                    <p className="p-with-margin">When FLAG mode is active, click will flag the cell.</p>
                </div>
            </div>

            <div className="how-to-item">
                <h4>Victory</h4>
                <div className="how-to-item-text"></div>
                <p>Click "End Game" button in order to check, if you have correctly flagged the cells.</p>
                <p>Victory is achieved if the following two conditions are true:</p>
                <p className="p-with-margin">1. All cells, which contain bombs, are flagged.</p>
                <p className="p-with-margin">2. Only cells, which contain bombs, are flagged.</p>
            </div>
        </div>
    )
}

export default HowToInfo;