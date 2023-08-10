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
    //console.log("!");
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
    //return (<div></div>);
    /*

    if (cellInfo.isOpened)
    {
        if      (cellInfo.state==="exploded")       {return <div>{""}</div>;}
        else if (cellInfo.state==="mistaken")       {return <div>{""}</div>;}
        else if (cellInfo.isBomb)                   {return <div>{"💣"}</div>;}
        else if (cellInfo.bombCount>0)              {return <div>{cellInfo.bombCount}</div>;}
        else                                        {return <div>{""}</div>;}
    }
    else
    {
        if (cellInfo.isFlagged)         {return <div>{"🚩"}</div>;}
        else                            {return <div>{""}</div>;}
    }

=====================




    Cell info
        > state
        > isOpened
        > isFlagged
        > isBomb
        > bombCount
    TEXT: 



// Returns class/classes depending on cell info
export function adjustCellClass(cellInfo)
{
    if (cellInfo.isOpened)
    {
        let className="opened";

        if(!cellInfo.isBomb)
        {
            if      (cellInfo.state==="mistaken")   {className=className+" mistaken";}
            else if (cellInfo.bombCount>0)          {className=className+" digit-"+cellInfo.bombCount;}  
        }
        else
        {
            if      (cellInfo.state==="defused")    {className=className+" defused";}
            else if (cellInfo.state==="triggered")  {className=className+" triggered";}
            else if (cellInfo.state==="exploded")   {className=className+" exploded";}
            
        }
        return className;
    }
    else
    {
        return "closed";
    }
}


// Returns inner HTML element depending on cell info
export function adjustCellContent(cellInfo)
{
    if (cellInfo.isOpened)
    {
        if      (cellInfo.state==="exploded")       {return <div>{"💥"}</div>;}
        else if (cellInfo.state==="mistaken")       {return <div>{"❌"}</div>;}
        else if (cellInfo.isBomb)                   {return <div>{"💣"}</div>;}
        else if (cellInfo.bombCount>0)              {return <div>{cellInfo.bombCount}</div>;}
        else                                        {return <div>{""}</div>;}
    }
    else
    {
        if (cellInfo.isFlagged)         {return <div>{"🚩"}</div>;}
        else                            {return <div>{""}</div>;}
    }
}














    */
