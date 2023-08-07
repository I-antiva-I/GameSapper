class GameSettings
{
    constructor(numberOfColumns, numberOfRows, numberOfBombsMin, numberOfBombsMax, safeZoneRadius)
    {
        this.numberOfColumns=       numberOfColumns;
        this.numberOfRows=          numberOfRows;
        this.numberOfBombsMin=      numberOfBombsMin;
        this.numberOfBombsMax=      numberOfBombsMax;
        this.safeZoneRadius=        safeZoneRadius;
        
    }  
}


export {GameSettings}

