/*
    Cell info
        > state
        > isOpened
        > isFlagged
        > isBomb
        > bombCount
    TEXT: ⚙️ 🏆 🕹️ ✔️ 🎯 🚩 🔄 ❌ 💣
*/


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