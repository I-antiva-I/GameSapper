enum CellState
{
    DEFAULT,            // Default state
    //SAFE,               // opened AND NOT with bomb
    TRIGGERED,          // Opened AND with bomb
    DEFUSED,            // Opened AND with bomb AND with flag
    MISTAKEN,           // Opened AND NOT with bomb AND with flag
    EXPLODED,           // Last opened by player AND with bomb
}


class CoordinatePair
{
    // Properties
    row:            number;
    column:         number;

    /**
     * 
     * @param row   
     * @param column 
     */
    constructor(row: number, column: number)
    {
        this.row=       row;
        this.column=    column;
    }

    equals(object: CoordinatePair) : boolean 
    { 
        return ((this.row === object.row) && (this.column === object.column));
    } 
}


class LogicCell 
{
    // Properties
    coordinates:    CoordinatePair;
    bombCount:      number;
    isBomb:         boolean;
    isOpened:       boolean;
    isFlagged:      boolean;
    state:          CellState; 

    /**
     * 
     * @param row   
     * @param column 
     */
    constructor(row: number, column: number)
    {
        this.coordinates=   new CoordinatePair(row, column);
        this.bombCount=     0;
        this.isBomb=        false;
        this.isOpened=      false;
        this.isFlagged=     false;
        this.state=         CellState.DEFAULT; 
    }

    toggleFlag()
    {
        this.isFlagged= !this.isFlagged;
    }
}


export {LogicCell, CellState, CoordinatePair};