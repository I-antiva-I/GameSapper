import React from "react";

function AboutInfo()
{   
    return(
        <div className="about-info">
            <p>
                Sapper is a logic puzzle game. 
            </p>
            <p>
                The playing field consists from grid, which is divided into clickable cells and can be opened. Some of these cells contain hidden bombs. If there is no bomb under the open cell, then a number appears in it, displaying how many cells adjacent to the newly opened cell have bomb.
            </p>
            <p>
                The objective is to open the board without detonating any mines.
            </p>
        </div>
    )
}

export default AboutInfo;