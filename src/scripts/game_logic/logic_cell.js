class LogicCell 
{
    constructor(row, column)
    {
        // Coordinates
        this.row=       row;
        this.column=    column;

        // Gameplay attributes
        this.bombCount=     0;
        this.isBomb=        false;
        this.isOpened=      false;
        this.isFlagged=     false;
        this.state=         "default"; 
        /*
            All possible states:
                > default       - default state
                > safe          - opened AND NOT with bomb
                > triggered     - opened AND with bomb
                > defused       - opened AND with bomb AND with flag
                > mistaken      - opened AND NOT with bomb AND with flag
                > exploded      - last opened by player AND with bomb
        */
    }

    getCoors() {return {row: this.row, column: this.column}}
}


export {LogicCell};