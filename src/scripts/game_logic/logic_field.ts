import {CellState, CoordinatePair, LogicCell} from "./logic_cell";
import {getRandomNumber, shuffleArray} from "../utility/core"
import { FieldSettings } from "./game_process";

class LogicField 
{
    cells:                  Array<Array<LogicCell>>;
    numberOfColumns:        number;
    numberOfRows:           number;
    numberOfBombs:          number;
    safeZoneRadius:         number;
    numberOfRevealedCells:  number;
    numberOfFlaggedCells:   number;
    numberOfBombsFound:     number;

    constructor(settings: FieldSettings)
    {
        // Cells
        this.cells= new Array<Array<LogicCell>>;

        // Dimensions
        this.numberOfColumns=       settings.numberOfColumns;
        this.numberOfRows=          settings.numberOfRows;
        this.numberOfBombs=         getRandomNumber(settings.numberOfBombsMin, settings.numberOfBombsMax);
        this.safeZoneRadius=        settings.safeZoneRadius;
        this.numberOfRevealedCells= 0;
        this.numberOfFlaggedCells=  0;
        this.numberOfBombsFound=    0;

        this.prepareField();
    }

    // Create empty field
    prepareField()
    {
        for (let row = 0; row < this.numberOfRows; row++) 
        {   
            // Create new row and fill it with LogicCells
            this.cells.push(new Array<LogicCell>);
            for (let column = 0; column < this.numberOfColumns; column++) 
            {
                this.cells[row].push(new LogicCell(row, column));
            }
        }
    }

    // Get cell by row and column
    getCell(row: number, column: number) : LogicCell | undefined
    {
        try
            {return this.cells[row][column];}
        catch (error: unknown)
        {
            console.log("Error occurred", error)
            return undefined;
        }
    }

    // Get cell by coordinate pair
    getCellByCoordinates(coordinates: CoordinatePair) : LogicCell | undefined
    {
        return this.getCell(coordinates.row, coordinates.column);
    }

    // Mark cell with a flag 
    flagCell(coordinates: CoordinatePair)
    {   
        let foundCell = this.getCellByCoordinates(coordinates);
        if (foundCell)
        {
            foundCell.toggleFlag();
            this.numberOfFlaggedCells += ((-1) ** Number(!foundCell.isFlagged))
        }
    }

    // Open cell with received coors (ROW, COLUMN) 
    openCell(coordinates: CoordinatePair)
    {   
        let openedCells= 0;
        let coordinatesToOpen: CoordinatePair[]= [coordinates];
     
        while(coordinatesToOpen.length>0)
        {
            let currentCoordinates= coordinatesToOpen.pop();
            if (currentCoordinates !== undefined)
            {
                let currentCell=        this.getCellByCoordinates(currentCoordinates);
                if (currentCell !== undefined)
                {   
                    if ((openedCells===0) && (currentCell.isFlagged)) {continue;}
 
                    if (currentCell.isOpened) {continue;}

                    currentCell.isOpened=true;
                    openedCells++;

                    if (currentCell.isFlagged)   {this.flagCell(currentCell.coordinates)}

                    if (currentCell.isBomb)
                    {
                        currentCell.state = CellState.TRIGGERED;
                        this.numberOfRevealedCells += openedCells;
                        return false;
                    }
                    else if (currentCell.bombCount === 0)
                    {
                        let coordinatesToAdd = this.getNeighbors(currentCell.coordinates, true)
                            .filter((pair: CoordinatePair) => 
                            {
                                let cell = this.getCellByCoordinates(pair);
                                if (cell !== undefined) {return !cell.isOpened}
                                else {return false}
                            });

                        coordinatesToOpen=[...coordinatesToOpen, ...coordinatesToAdd]
                    }

                }
            }
        }

        this.numberOfRevealedCells += openedCells;
        return true;
    }

    // List of Cells
    getCellsAsList() : Array<LogicCell>
    {
        let listOfCells= new Array<LogicCell>;

        for (let row = 0; row < this.numberOfRows; row++) 
        {
            for (let column = 0; column < this.numberOfColumns; column++) 
            {
                listOfCells.push(this.cells[row][column]);
            }
        }

        return listOfCells;
    }
    
    // Find all coordinates in given radius, starting from origin (origin is included)
    getCoordinatesInRadius(origin: CoordinatePair, radius: number)
    {
        let coordinates = new Array<CoordinatePair>;

        for (let rowOffset= -radius; rowOffset<radius+1; rowOffset++)
        {
            for (let colOffset= -radius; colOffset<radius+1; colOffset++)
            {
                if ((Math.abs(rowOffset)+Math.abs(colOffset)<=radius)  && 
                    (this.validateCoordinates(rowOffset+origin.row, colOffset+origin.column) ))
                {
                    coordinates.push(new CoordinatePair(rowOffset+origin.row, colOffset+origin.column));
                }
            }
        }

        return coordinates;
    }

    // Checks if coordinates are valid 
    validateCoordinates(row: number, column: number)
    {
        return  ((column >= 0) && (column < this.numberOfColumns)) && 
                ((row >= 0)    && (row < this.numberOfRows));
    }

    // Reveal field
    endGame()
    {   
        let victory=true;

        for (let cell of this.getCellsAsList()) 
        {
            if(!cell.isOpened)
            {
                cell.isOpened=true;
                if      ( cell.isBomb  &&  cell.isFlagged)  {cell.state= CellState.DEFUSED;  this.numberOfBombsFound++;}
                else if ( cell.isBomb  && !cell.isFlagged)  {cell.state= CellState.EXPLODED; victory=false;}
                else if (!cell.isBomb  &&  cell.isFlagged)  {cell.state= CellState.MISTAKEN; victory=false;}
            }
        }

        return victory;
    }

    //  Get Neighbors
    getNeighbors(origin :CoordinatePair, includeDiagonals: boolean=false)
    {
        /* 
            Directions
                NW NO NE
                WE CE EA
                SW SO SE
        */
        let neighbors:  CoordinatePair[] = [];
        let directions: CoordinatePair[] = [];

        // Main directions
        let NORTH =  new CoordinatePair(origin.row,   origin.column-1);
        let EAST =   new CoordinatePair(origin.row+1, origin.column  );
        let SOUTH =  new CoordinatePair(origin.row,   origin.column+1);
        let WEST =   new CoordinatePair(origin.row-1, origin.column  );
        directions = [NORTH, EAST, SOUTH, WEST];

        // Diagonal directions
        if (!includeDiagonals) 
        {
            let NORTH_EAST = new CoordinatePair(origin.row+1, origin.column-1);
            let NORTH_WEST = new CoordinatePair(origin.row-1, origin.column-1);
            let SOUTH_EAST = new CoordinatePair(origin.row+1, origin.column+1);
            let SOUTH_WEST = new CoordinatePair(origin.row-1, origin.column+1);
            directions =     [NORTH, EAST, SOUTH, WEST, NORTH_EAST, NORTH_WEST, SOUTH_EAST, SOUTH_WEST];
        }


        for (let coordinatePair of directions)
        {
            if (this.validateCoordinates(coordinatePair.row, coordinatePair.column))
            {
                neighbors.push(coordinatePair);
            }
        }

        return neighbors;
    }

    // Fill cells with bombs
    generateField(origin: CoordinatePair)
    {
        // Get all suitable coordinates for bombs as (ROW, COLUMN) 
        let suitableCoordinates: CoordinatePair[]= [];
        for (let row = 0; row < this.numberOfRows; row++) 
        {
            for (let column = 0; column < this.numberOfColumns; column++) 
            {
                suitableCoordinates.push(new CoordinatePair(row, column));
            }
        }
        
        // Remember safe coordinates (without bombs) + remove them from suitable coordinates
        let safeCoordinates: CoordinatePair[] = this.getCoordinatesInRadius(origin, this.safeZoneRadius);
        for (let coorsToRemove of safeCoordinates)
        {   
            for (let coorsToCheck of suitableCoordinates)
            {
                //console.log(coorsToRemove,coorsToCheck ,coorsToRemove == coorsToCheck);
                if (coorsToRemove.equals(coorsToCheck))
                {
                    suitableCoordinates.splice(suitableCoordinates.indexOf(coorsToCheck),1);
                    break;
                } 
            }
        }

        // Randomize bomb coordinates + remove them from suitable coordinates
        let bombCoordinates= shuffleArray(suitableCoordinates)
                                .slice(0, Math.min(this.numberOfBombs, suitableCoordinates.length));
        for (let coorsToRemove of bombCoordinates)
        {   
            for (let coorsToCheck of suitableCoordinates)
            {
                if (coorsToRemove.equals(coorsToCheck))
                {
                    suitableCoordinates.splice(suitableCoordinates.indexOf(coorsToCheck),1);
                    break;
                } 
            }
        } ;
 
        // Placing bombs
        for (let coors of bombCoordinates) 
        {   
            let bombCell = this.getCellByCoordinates(coors);
            if (bombCell !== undefined) {bombCell.isBomb = true;}
        }
        
        // Number of neighboring bombs for non-bomb cells
        for (let coors of [...suitableCoordinates, ...safeCoordinates])
        {
            let cell = this.getCellByCoordinates(coors);
            
            for(let near of this.getNeighbors(coors))
            {
                let possibleBomb = this.getCellByCoordinates(near);
                
                if ((possibleBomb !== undefined) && (cell !== undefined))
                {
                    if (possibleBomb.isBomb) {cell.bombCount++;}
                }
            }

        }
    }


}

export {LogicField};