export function selectDefaultSettings(difficulty)
{
    let settings=undefined;
    switch(difficulty)
    {
        // EASY
        case 1:
            settings=
            {
                numberOfCols:4,
                numberOfRows:4,
                numberOfBombsMin:2,
                numberOfBombsMax:4,
                safeZoneRadius:2,
            }
            break;
        // MEDIUM  
        case 2:
            settings=
            {
                numberOfCols:6,
                numberOfRows:6,
                numberOfBombsMin:8,
                numberOfBombsMax:12,
                safeZoneRadius:2,
            }
            break;
        // HARD     
        case 3:
            settings=
            {
                numberOfCols:8,
                numberOfRows:8,
                numberOfBombsMin:12,
                numberOfBombsMax:18,
                safeZoneRadius:2,
            }
            break;
        default:
            settings=
            {
                numberOfCols:5,
                numberOfRows:5,
                numberOfBombsMin:1,
                numberOfBombsMax:1,
                safeZoneRadius:2,
            }
    }
    return settings;
}