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

class GameResult
{
    numberOfBombs:  number;
    numberOfCells:  number;
    totalTime:      number;

    constructor(numberOfBombs: number, numberOfCells: number, totalTime: number)
    {
        this.numberOfBombs  = numberOfBombs;
        this.numberOfCells = numberOfCells;
        this.totalTime = totalTime;
    }
}

class FieldSettings
{
    numberOfColumns:       number;
    numberOfRows:          number;
    numberOfBombsMin:      number;
    numberOfBombsMax:      number;
    safeZoneRadius:        number;

    constructor(numberOfColumns: number, numberOfRows: number,
                numberOfBombsMin: number, numberOfBombsMax: number,
                safeZoneRadius: number)
    {
        this.numberOfColumns=       numberOfColumns;
        this.numberOfRows=          numberOfRows;
        this.numberOfBombsMin=      numberOfBombsMin;
        this.numberOfBombsMax=      numberOfBombsMax;
        this.safeZoneRadius=        safeZoneRadius;
    }  
}


enum GamePhase
{
    IDLE,       
    IN_PROGRESS,
    END,
}



export {GameState, GamePhase, GameResult, FieldSettings}