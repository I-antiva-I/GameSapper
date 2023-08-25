import { LogicField } from "./logic_field";

class GameState 
{
    phase:          GamePhase;
    logicField:     LogicField;
    victory:        boolean;

    constructor(phase: GamePhase, logicField: LogicField, victory: boolean)
    {
        this.phase  = phase;
        this.logicField = logicField;
        this.victory = victory;
    }
}

class GameResult
{
    victory:            boolean;
    numberOfBombs:      number;
    numberOfBombsFound: number;
    numberOfRows:       number;
    numberOfColumns:    number;
    time:               number;
    date:               Date;

    constructor(victory: boolean, 
        numberOfBombs: number, 
        numberOfBombsFound: number,
        numberOfRows: number, 
        numberOfColumns: number, 
        time: number, 
        date: Date)
    {
        this.victory =              victory;
        this.numberOfBombs  =       numberOfBombs;
        this.numberOfBombsFound =   numberOfBombsFound;
        this.numberOfRows =         numberOfRows;
        this.numberOfColumns =      numberOfColumns;
        this.time =                 time;
        this.date =                 date;
    }

    isGreaterThan(object: GameResult) : boolean
    {
        if      ((this.victory !== object.victory)) 
                {return this.victory;}

        else if (this.numberOfBombs !== object.numberOfBombs)
                {return (this.numberOfBombs>object.numberOfBombs);}

        else if (this.numberOfBombsFound !== object.numberOfBombsFound)
                {return (this.numberOfBombsFound>object.numberOfBombsFound);}

        else if ((this.numberOfRows*this.numberOfColumns) !== (object.numberOfRows*object.numberOfColumns)) 
                {return (this.numberOfRows*this.numberOfColumns) > (object.numberOfRows*object.numberOfColumns);}

        else if (this.time !== object.time)
                {return (this.time<object.time);}

        else    {return (this.date >= object.date);}
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