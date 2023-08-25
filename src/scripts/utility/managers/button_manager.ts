import { ReactNode } from "react";
import { GamePhase } from "../../game_logic/game_process";
import { ControlButtonAction, DisplayMode } from "../core";
import React from "react";
import IconSVG from "../../../components/IconSVG";
import { IconType } from "./icon_manager";

// Determines if control button should be displayed
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
                (buttonAction===ControlButtonAction.SCORE))
            {return false;}
            else {return true;}
        }
        else if (phase===GamePhase.END)
        {
            if ((buttonAction===ControlButtonAction.INFO) ||
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
        if (buttonAction===ControlButtonAction.SCORE) {return false;}

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
        else if (phase===GamePhase.END)
        {
            if ((buttonAction===ControlButtonAction.RESTART))
            {return true;}
            else {return false;}
        }

    }

    else if (displayMode===DisplayMode.SETTINGS)
    {
        if (buttonAction===ControlButtonAction.SETTINGS) {return false;}

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
            if ((buttonAction===ControlButtonAction.PLAY))
            {return true;}
            else {return false;}
        }

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

        default:     
            return "None"; 
    }
}

// Returns inner HTML element depending on control button's action
export function adjustControlButtonContent(buttonAction: ControlButtonAction, color: string ="#FFFFFF") : ReactNode
{
    switch(buttonAction)
    {
        case ControlButtonAction.INFO:
            return React.createElement(IconSVG, {iconType: IconType.CIRCLE_INFO, iconColor: color},);

        case ControlButtonAction.SETTINGS:
            return React.createElement(IconSVG, {iconType: IconType.GEAR, iconColor: color} ,);

        case ControlButtonAction.SCORE:
            return React.createElement(IconSVG, {iconType: IconType.STAR, iconColor: color} ,);

        case ControlButtonAction.PLAY:
            return React.createElement(IconSVG, {iconType: IconType.BOMB, iconColor: color} ,);

        case ControlButtonAction.MODE_OPEN_CELL:
            return React.createElement(IconSVG, {iconType: IconType.ARROWS_TO_DOT, iconColor: color} ,);

        case ControlButtonAction.MODE_FLAG_CELL:
            return React.createElement(IconSVG, {iconType: IconType.FLAG, iconColor: color} ,);

        case ControlButtonAction.END_GAME:
            return React.createElement(IconSVG, {iconType: IconType.CIRCLE_CHECK, iconColor: color} ,);

        case ControlButtonAction.RESTART:
            return React.createElement(IconSVG, {iconType: IconType.ARROWS_ROTATE, iconColor: color} ,);

        default:     
            return React.createElement("div", {} , "🔄");
    }
}