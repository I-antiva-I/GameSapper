import { ReactNode } from "react";
import { CellState } from "../../game_logic/logic_cell";
import React from "react";

// Returns class/classes depending on cell info
export function adjustCellClass(state: CellState, 
    isOpened:boolean, isFlagged: boolean, isBomb: boolean, bombCount: number) : String
{
    let classes = "";
    if (isOpened)
    {
        classes+= " opened";
        if      (state === CellState.TRIGGERED)         {classes+= " triggered";}
        else if (state === CellState.MISTAKEN)          {classes+= " mistaken";}
        else if (state === CellState.DEFUSED)           {classes+= " defused";}
        else if (state === CellState.EXPLODED)          {classes+= " exploded";}
        else    {{classes+= (" digit-"+bombCount.toString());}}
    }
    else
    {
        classes+= " closed";
    }
    return classes;
}


// Returns inner HTML element for upper part of cell
export function adjustCellUpperPart(isOpened: boolean, isFlagged: boolean) : ReactNode 
{
    if (isFlagged)
    {
        return React.createElement("div", {} , "🚩");
    }
    else
    {
        return React.createElement("div", {} , "");
    }
}

// Returns inner HTML element for lower part of cell
export function adjustCellLowerPart(state: CellState, 
    isOpened:boolean, isFlagged: boolean, isBomb: boolean, bombCount: number) : ReactNode 
{
    if (isOpened)
    {
        if      (state === CellState.TRIGGERED)          {return React.createElement("div", {} , "💥");}
        else if (state === CellState.MISTAKEN)           {return React.createElement("div", {} , "❌");}
        else if (isBomb)              {return React.createElement("div", {} , "💣");}
        else if (bombCount>0)         {return React.createElement("div", {} , bombCount);}
        else                          {return React.createElement("div", {} , "");}
    }
    else
    {
        return React.createElement("div", {} , "?");
    }
}


