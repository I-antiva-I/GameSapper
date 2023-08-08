import { GameSettings } from "../game_logic/game_settings";

// Default settings for all difficulties
export function getDefaultSettings(difficulty)
{
    let settings=undefined;
    switch(difficulty)
    {
        // EASY
        case "DIFFICULTY_EASY":
            settings=new GameSettings(4,4,2,2,2);
            break;

        // MEDIUM  
        case "DIFFICULTY_MEDIUM":
            settings=new GameSettings(6,6,8,12,2);
            break;

        // HARD     
        case "DIFFICULTY_HARD":
            settings=new GameSettings(8,8,14,18,2);
            break;

        // DEFAULT
        default:
            settings=new GameSettings(6,6,8,12,2);
    }

    return settings;
}