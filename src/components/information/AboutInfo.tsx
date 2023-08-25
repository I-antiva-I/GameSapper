import React from "react";

function AboutInfo()
{   
    return(
        <div className="about-info">
            <p>
                Sapper (Minesweeper) is a logic puzzle game. 
            </p>
            <p>
                The playing field consists from grid, which is divided into clickable cells. Cells can be opened, however some of these cells contain hidden bombs!
            </p>
            <p>
                The objective is to open the board without detonating any mines.
            </p>
        </div>
    )
}

export default AboutInfo;