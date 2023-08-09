class FieldSettings
{
    // Properties
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


export {FieldSettings}

