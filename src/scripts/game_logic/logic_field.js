import {LogicCell} from "./logic_cell";
import {getRandomNumber} from "../utility/core"

class LogicField 
{
    constructor(settings)
    {
        // Cells
        this.cells=[];

        // Parameters
        this.numberOfColumns=   settings.numberOfColumns;
        this.numberOfRows=      settings.numberOfRows;

        // Bombs
        this.numberOfBombs=     getRandomNumber(settings.numberOfBombsMin, settings.numberOfBombsMax);

        // Safe Zone
        this.safeZoneRadius=    settings.safeZoneRadius;

        // In-game information
        this.numberOfRevealedCells= 0;
        this.numberOfFlaggedCells=  0;

        this.prepareField();
    }


    // Get Cell by Coordinates (ROW; COLUMN)
    getCell(row, column)
    {
         return this.cells.at(row).at(column);
    }

    // List of Cells
    getCellsAsList =  function()
    {
        let listOfCells=[]

        for (let row = 0; row < this.numberOfRows; row++) 
        {
            for (let col = 0; col < this.numberOfColumns; col++) 
            {
                    listOfCells.push(this.getCell(row, col));
            }
        }

        return listOfCells;
    }
    
    // Create empty field
    prepareField()
    {
         for (let row = 0; row < this.numberOfRows; row++) 
        {   
            // New empty Row
            this.cells.push([]);
            // Fill Row with LogicCells
            for (let col = 0; col < this.numberOfColumns; col++) 
            {
                this.cells.at(row).push(new LogicCell(row, col));
            }
        }
        // console.log(">>> Field Preparation END",this.cells)
    }


    // Find all COORDINATES by origin (ROW; COLUMN) in given radius (origin included)
    getCoorsInRaduis(radius, origin)
    {
        let coordinates = []

        for (let rowOffset= -radius; rowOffset<radius+1; rowOffset++)
        {
            for (let colOffset= -radius; colOffset<radius+1; colOffset++)
            {
                if ((Math.abs(rowOffset)+Math.abs(colOffset)<=radius)  && 
                    (this.isValidCoordinates(rowOffset+origin.row, colOffset+origin.column) ))
                {
                    coordinates.push({row: rowOffset+origin.row, column: colOffset+origin.column})
                }
            }
        }

        return coordinates;
    }


    // Check if coordinates are valid 
    isValidCoordinates(row, column)
    {
        return  (column >= 0) && 
                (column < this.numberOfColumns) && 
                (row >= 0) && 
                (row < this.numberOfRows);
    }


    // Randomize order of elements in array
    shuffle(array) 
    {
        let currentIndex = array.length;
        let randomIndex = 0;
        
        while (currentIndex !== 0)
        {
              // (1) Random:        returns a float from 0 to <1
              // (2) Random*Max:    returns a float from 0 to <Max
              // (3) Floor:         returns integer
              randomIndex = Math.floor(Math.random() * currentIndex);
              currentIndex--;
              // (4) Swapping (destructuring assignment)
              [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
        }
        return array;
    }


    //  Get Neighbors
    getNeighbors(origin, includeDiagonals=false)
    {
        /* 
            Directions
                NW NO NE
                WE CE EA
                SW SO SE
        */
        let neighbors = [];
        let directions = [];

        // Main directions
        let NORTH =         {row: origin.row   ,  column: origin.column-1 };
        let EAST  =         {row: origin.row+1 ,  column: origin.column   };
        let SOUTH =         {row: origin.row   ,  column: origin.column+1 };
        let WEST  =         {row: origin.row-1 ,  column: origin.column   };
        directions =        [NORTH, EAST, SOUTH, WEST];

        // Diagonal directions
        if (!includeDiagonals) 
        {
            let NORTH_EAST =    {row: origin.row+1 , column: origin.column-1}
            let NORTH_WEST =    {row: origin.row-1 , column: origin.column-1}
            let SOUTH_EAST =    {row: origin.row+1 , column: origin.column+1}
            let SOUTH_WEST =    {row: origin.row-1 , column: origin.column+1}
            directions =        [NORTH, EAST, SOUTH, WEST, NORTH_EAST, NORTH_WEST, SOUTH_EAST, SOUTH_WEST];
        }


        for (let coors of directions)
        {
            if(this.isValidCoordinates(coors.row, coors.column))
            {
                neighbors.push(coors)
            }
        }

        return neighbors;
    }


    // ?      
    endGame()
    {   
        let victory=true;
        for (let cell of this.getCellsAsList()) 
        {
            if(!cell.isOpened)
            {
                cell.isOpened=true;
                if( cell.isBomb  &&  cell.isFlagged)  {cell.state="defused";}
                if( cell.isBomb  && !cell.isFlagged)  {cell.state="triggered";    victory=false;}
                if(!cell.isBomb  &&  cell.isFlagged)  {cell.state="mistaken";     victory=false;}
            }
        }
        return victory;
    }


    // Fill cells with bombs
    generateField(origin)
    {
        // Get all suitable coordinates for bombs as (ROW, COLUMN) 
        let suitableCoordinates =[];
        for (let row = 0; row < this.numberOfRows; row++) 
        {
            for (let col = 0; col < this.numberOfColumns; col++) 
            {
                suitableCoordinates.push({column: col, row: row});
            }
        }

        // Remember safe coordinates (without bombs) + remove them from suitable coordinates
        let safeCoordinates = this.getCoorsInRaduis(this.safeZoneRadius, origin);
        for (let coorsToRemove of safeCoordinates)
        {   
            for (let coors of suitableCoordinates)
            {
                if((coorsToRemove.row==coors.row) && (coorsToRemove.column==coors.column))
                {
                    suitableCoordinates.splice(suitableCoordinates.indexOf(coors),1);
                    break;
                } 
            }
        }
        
        // Randomize bomb coordinates + remove them from suitable coordinates
        let bombCoordinates= this.shuffle(suitableCoordinates)
                                    .slice(0, Math.min(this.numberOfBombs, suitableCoordinates.length));
        for (let coorsToRemove of bombCoordinates)
        {   
            for (let coors of suitableCoordinates)
            {
                if((coorsToRemove.row==coors.row) && (coorsToRemove.column==coors.column))
                {
                    suitableCoordinates.splice(suitableCoordinates.indexOf(coors),1);
                    break;
                } 
            }
        }
 
        // Placing bombs
        for (let coors of bombCoordinates) {this.getCell(coors.row, coors.column).isBomb=true;}
        
        // Number of neighboring bombs for non-bomb cells
        for (let coors of [...suitableCoordinates, ...safeCoordinates])
            {
                for(let near of this.getNeighbors(coors))
                {
                    if(this.getCell(near.row, near.column).isBomb)
                    {
                        this.getCell(coors.row, coors.column).bombCount++;
                    }
                    
                }
            }
           // console.log(">>> Field Generation END",this.cells)
    }


    // ?
    flagCell(coors)
    {   
        this.getCell(coors.row, coors.column).isFlagged = !(this.getCell(coors.row, coors.column).isFlagged);
        this.numberOfFlaggedCells = this.numberOfFlaggedCells - ((-1)** Number(this.getCell(coors.row, coors.column).isFlagged));
    }


    // Open cell with recieved coors (ROW, COLUMN) 
    openCell(coors)
    {   
        let coorsToOpen=    [coors];
        let counter=        0;

        while(coorsToOpen.length>0)
        {
            let currentCoors=   coorsToOpen.pop();
            let currentCell=    this.getCell(currentCoors.row, currentCoors.column);

            if(currentCell.isOpened) {continue;}
            
            currentCell.isOpened=true;
            counter++;

            if(currentCell.isFlagged)   {this.flagCell({row: currentCoors.row, column: currentCoors.column})}

            if(currentCell.isBomb)
            {
                currentCell.state = "exploded";
                return false;
            }
            
            if (!(currentCell.isBomb) && (currentCell.bombCount==0))
            {
                let coorsToAdd=
                    this.getNeighbors(currentCoors, true).filter((c) => 
                        {return !(this.getCell(c.row, c.column).isOpened)})
                    
                coorsToOpen=[...coorsToOpen, ...coorsToAdd]
            }
         
        }

        this.numberOfRevealedCells= this.numberOfRevealedCells+counter;
        return true;
    }
    

}

export {LogicField};