/*
    Button action
    > ACTION_INFO
    > ACTION_SETTINGS
    > ACTION_SCORE
    > ACTION_PLAY

    > ACTION_MODE_OPEN
    > ACTION_MODE_FLAG
    > ACTION_END_GAME
    > ACTION_RESTART
    > ACTION_RETURN

    Control info
        > clickMode
            >> CLICK_OPEN
            >> CLICK_FLAG
        > displayMode
            >> DISPLAY_GAME
            >> DISPLAY_SETTINGS
            >> DISPLAY_SCORE
            >> DISPLAY_INFO
        > gameState
            >> STATE_IDLE
            >> STATE_IN_PROGRESS
            >> STATE_END

*/


// Returns class/classes depending on control info and on action of control button
export function adjustControlButtonClass(controlInfo, buttonAction)
{
    let className = "";

    let display=    controlInfo.displayMode;
    let action=     buttonAction;
    let state=      controlInfo.gameState;
    let click=      controlInfo.clickMode;

    if (display==="DISPLAY_GAME")
    {
        if (action==="ACTION_PLAY") {className=className+" hidden";}
        
        else if (state==="STATE_IDLE")
        {
            if ((action==="ACTION_MODE_OPEN") || 
                (action==="ACTION_MODE_FLAG") || 
                (action==="ACTION_RETURN")    || 
                (action==="ACTION_RESTART")   || 
                (action==="ACTION_END_GAME"))
            {className=className+" hidden";}
            else 
            {className=className+" visible";}
        }

        else if (state==="STATE_IN_PROGRESS")
        {
            if ((action==="ACTION_SCORE")     || 
                (action==="ACTION_INFO")      || 
                (action==="ACTION_SETTINGS")  || 
                (action==="ACTION_SCORE"))
            {className=className+" hidden";}
            else 
            {className=className+" visible";}
        }

        else if (state==="STATE_END")
        {
            if ((action==="ACTION_SCORE")     || 
                (action==="ACTION_INFO")      || 
                (action==="ACTION_SETTINGS")  || 
                (action==="ACTION_END_GAME")  ||
                (action==="ACTION_MODE_OPEN") || 
                (action==="ACTION_MODE_FLAG") ||  
                (action==="ACTION_SCORE"))
            {className=className+" hidden";}
            else 
            {className=className+" visible";}
        }

    }

    else if (display==="DISPLAY_SETTINGS")
    {
        if ((action==="ACTION_MODE_OPEN") || 
            (action==="ACTION_MODE_FLAG") || 
            (action==="ACTION_END_GAME")  || 
            (action==="ACTION_RESTART")   ||
            (action==="ACTION_SETTINGS")  ||
            (action==="ACTION_RETURN"))
        {className=className+" hidden";}
        else    
        {className=className+" visible";}
    }

    else if (display==="DISPLAY_SCORE")
    {
        if ((action==="ACTION_MODE_OPEN") || 
            (action==="ACTION_MODE_FLAG") || 
            (action==="ACTION_END_GAME")  || 
            (action==="ACTION_RESTART")   ||
            (action==="ACTION_SCORE")     ||
            (action==="ACTION_RETURN"))
        {className=className+" hidden";}
        else    
        {className=className+" visible";}
    }

    else if (display==="DISPLAY_INFO")
    {
        if ((action==="ACTION_MODE_OPEN") || 
            (action==="ACTION_MODE_FLAG") || 
            (action==="ACTION_END_GAME")  || 
            (action==="ACTION_RESTART")   ||
            (action==="ACTION_INFO")     ||
            (action==="ACTION_RETURN"))
        {className=className+" hidden";}
        else    
        {className=className+" visible";}
    }


    return className;
}


// Returns inner HTML element depending on control button's action
export function adjustControlButtonContent(buttonAction)
{
    switch(buttonAction)
    {
        case "ACTION_INFO":
            return <div>{"ℹ️"}</div>;

        case "ACTION_SETTINGS":
            return <div>{"⚙️"}</div>;

        case "ACTION_SCORE":
            return <div>{"🏆"}</div>;

        case "ACTION_PLAY":
            return <div>{"🕹️"}</div>;

        case "ACTION_MODE_OPEN":
            return <div>{"🎯"}</div>;

        case "ACTION_MODE_FLAG":
            return <div>{"🚩"}</div>;

        case "ACTION_END_GAME":
            return <div>{"✔️"}</div>;

        case "ACTION_RESTART":
            return <div>{"🔄"}</div>;

        case "ACTION_RETURN":
            return <div>{"🔙"}</div>;

        default:     
            return <div>{"x"}</div>;
    }
}


// Returns text for label depending on control button's action
export function adjustControlButtonLabel(buttonAction)
{
    switch(buttonAction)
    {
        case "ACTION_INFO":
            return "Info";

        case "ACTION_SETTINGS":
            return "Settings";

        case "ACTION_SCORE":
            return "Score";

        case "ACTION_PLAY":
            return "Play";

        case "ACTION_MODE_OPEN":
            return "Open";

        case "ACTION_MODE_FLAG":
            return "Flag";

        case "ACTION_END_GAME":
            return "End Game";

        case "ACTION_RESTART":
            return "Restart";

        case "ACTION_RETURN":
            return "Return";

        default:     
            return "None"; 
    }
}