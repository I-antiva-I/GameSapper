import { LogicField } from "./logic_field";

class GameState 
{
    phase:          GamePhase;
    logicField:     LogicField

    constructor(phase: GamePhase, logicField: LogicField)
    {
        this.phase  = phase;
        this.logicField = logicField;
    }
}

enum GamePhase
{
    IDLE,       
    IN_PROGRESS,
    END,
}



export {GameState, GamePhase}