import { ReactNode } from "react";
import { GamePhase } from "../../game_logic/game_state";
import { ControlButtonAction, DisplayMode } from "../core";
import React from "react";

// 
export function isControlButtonDisplayed(buttonAction: ControlButtonAction, 
    displayMode: DisplayMode, phase: GamePhase)
{
    if (displayMode===DisplayMode.GAME)
    {
        if (buttonAction===ControlButtonAction.PLAY) {return false;}

        if (phase===GamePhase.IDLE)
        {
            if ((buttonAction===ControlButtonAction.END_GAME) ||
                (buttonAction===ControlButtonAction.MODE_FLAG_CELL) ||
                (buttonAction===ControlButtonAction.MODE_OPEN_CELL) ||
                (buttonAction===ControlButtonAction.RESTART) ||
                (buttonAction===ControlButtonAction.RETURN))
            {return false;}
            else {return true;}
        }
        else if (phase===GamePhase.IN_PROGRESS)
        {
            if ((buttonAction===ControlButtonAction.INFO) ||
                (buttonAction===ControlButtonAction.SCORE) ||
                (buttonAction===ControlButtonAction.SETTINGS))
            {return false;}
            else {return true;}
        }
        else if (phase===GamePhase.END)
        {
            if ((buttonAction===ControlButtonAction.INFO) ||
                (buttonAction===ControlButtonAction.SCORE) ||
                (buttonAction===ControlButtonAction.MODE_FLAG_CELL) ||
                (buttonAction===ControlButtonAction.MODE_OPEN_CELL) ||
                (buttonAction===ControlButtonAction.END_GAME) ||
                (buttonAction===ControlButtonAction.SETTINGS))
            {return false;}
            else {return true;}
        }
        else {return false;}
    }

    else if (displayMode===DisplayMode.INFO)
    {
        if ((buttonAction===ControlButtonAction.END_GAME) ||
            (buttonAction===ControlButtonAction.MODE_FLAG_CELL) ||
            (buttonAction===ControlButtonAction.MODE_OPEN_CELL) ||
            (buttonAction===ControlButtonAction.RESTART) ||
            (buttonAction===ControlButtonAction.INFO) ||
            (buttonAction===ControlButtonAction.RETURN))
        {return false;}
        else {return true;}
    }
    
    else if (displayMode===DisplayMode.SCORE)
    {
        if ((buttonAction===ControlButtonAction.END_GAME) ||
            (buttonAction===ControlButtonAction.MODE_FLAG_CELL) ||
            (buttonAction===ControlButtonAction.MODE_OPEN_CELL) ||
            (buttonAction===ControlButtonAction.RESTART) ||
            (buttonAction===ControlButtonAction.SCORE) ||
            (buttonAction===ControlButtonAction.RETURN))
        {return false;}
        else {return true;}
    }

    else if (displayMode===DisplayMode.SETTINGS)
    {
        if ((buttonAction===ControlButtonAction.END_GAME) ||
            (buttonAction===ControlButtonAction.MODE_FLAG_CELL) ||
            (buttonAction===ControlButtonAction.MODE_OPEN_CELL) ||
            (buttonAction===ControlButtonAction.RESTART) ||
            (buttonAction===ControlButtonAction.SETTINGS) ||
            (buttonAction===ControlButtonAction.RETURN))
        {return false;}
        else {return true;}
    }

    else {return true;}
}

// Returns text for label depending on control button's action
export function adjustControlButtonLabelText(buttonAction: ControlButtonAction)
{
    switch(buttonAction)
    {
        case ControlButtonAction.INFO:
            return "Info";

        case ControlButtonAction.SETTINGS:
            return "Settings";

        case ControlButtonAction.SCORE:
            return "Score";

        case ControlButtonAction.PLAY:
            return "Play";

        case ControlButtonAction.MODE_OPEN_CELL:
            return "Open";

        case ControlButtonAction.MODE_FLAG_CELL:
            return "Flag";

        case ControlButtonAction.END_GAME:
            return "End Game";

        case ControlButtonAction.RESTART:
            return "Restart";

        case ControlButtonAction.RETURN:
            return "Return";

        default:     
            return "None"; 
    }
}

// Returns inner HTML element depending on control button's action
export function adjustControlButtonContent(buttonAction: ControlButtonAction) : ReactNode
{
    switch(buttonAction)
    {
        case ControlButtonAction.INFO:
            return React.createElement("div", {} , "ℹ️");

        case ControlButtonAction.SETTINGS:
            return React.createElement("div", {} , "⚙️");

        case ControlButtonAction.SCORE:
            return React.createElement("div", {} , "🏆");

        case ControlButtonAction.PLAY:
            return React.createElement("div", {} , "🕹️");

        case ControlButtonAction.MODE_OPEN_CELL:
            return React.createElement("div", {} , "🎯");

        case ControlButtonAction.MODE_FLAG_CELL:
            return React.createElement("div", {} , "🚩");

        case ControlButtonAction.END_GAME:
            return React.createElement("div", {} , "✔️");

        case ControlButtonAction.RESTART:
            return React.createElement("div", {} , "🔄");

        case ControlButtonAction.RETURN:
            return React.createElement("div", {} , "🔙");

        default:     
            return React.createElement("div", {} , "?");
    }
}