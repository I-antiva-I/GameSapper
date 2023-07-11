/*
    Class GameCell
*/
import {ClassCell} from "./ClassCell";

class ClassField 
{
    constructor(numberOfCols,numberOfRows,numberOfBombs,safeZoneRadius)
    {
        // (?) Grid
        this.cells=[];

        // (?) Settings
        this.numberOfCols=numberOfCols;
        this.numberOfRows=numberOfRows;
        this.numberOfBombs=numberOfBombs;

        // (?) Safe Zone
        this.safeZoneRadius=safeZoneRadius;

        // (?) Mid-game Information
        this.numberOfRevealedCells=0;
        this.numberOfFlaggedCells=0;

        // FUNCTIONS --------------------------------
        
        // (?) Get Cell by Coordinates --------------
        this.getCell = function(coorX, coorY)
        {
            return this.cells.at(coorY).at(coorX);
        }
        // ------------------------------------------


        // (?) Create Empty Cells -------------------
        this.prepareField = function()
        {
            for (let y = 0; y < this.numberOfRows; y++) 
            {
                this.cells.push([])
                for (let x = 0; x < this.numberOfCols; x++) 
                {
                    this.cells.at(y).push(new ClassCell(x,y));
                }
            }
           // console.log(">>> Field Preparation END",this.cells)
        }
        // ------------------------------------------

        // (?) Set Up Cells -------------------
        this.generateField = function(startCoors)
        {
            // (?) Get All Coordinates as (X,Y)
            let workCoorPairs =[]
            for (let y = 0; y < this.numberOfRows; y++) 
            {
                for (let x = 0; x < this.numberOfCols; x++) 
                {
                    workCoorPairs.push({coorX: x, coorY: y});
                }
            }

            // (?) Remove Safe Coors from Work Coors
            let safeCoorPairs =[]
            for (let itemToRemove of this.getCoorsInRaduis(this.safeZoneRadius,startCoors))
            {   
                for (let itemToCheck of workCoorPairs)
                {
                    if((itemToCheck.coorX===itemToRemove.coorX) && (itemToCheck.coorY===itemToRemove.coorY))
                    {
                        safeCoorPairs.push(itemToCheck);
                        workCoorPairs.splice(workCoorPairs.indexOf(itemToCheck),1);
                        break;
                    } 
                }
            }

            // (?) Random Bomb Coors
            let bombCoorPairs=this.shuffle(workCoorPairs).slice(0,Math.min(this.numberOfBombs,workCoorPairs.length));
            // (?) Remove Bombs Coors from Work Coors
            workCoorPairs.splice(0,Math.min(this.numberOfBombs,workCoorPairs.length));
            // (?) Placing Bombs
            for (let bombCoors of bombCoorPairs)
            {
                this.getCell(bombCoors.coorX,bombCoors.coorY).isBomb=true;
            }
            for (let pair of [...workCoorPairs, ...safeCoorPairs])
            {
                for(let near of this.getCoorsNearBy(pair))
                {
                    if(this.getCell(near.coorX,near.coorY).isBomb)
                    {
                        this.getCell(pair.coorX,pair.coorY).bombCount++;
                    }
                    
                }
            }
           // console.log(">>> Field Generation END",this.cells)
        }
        // ------------------------------------------

        // (?) Get Coors in Radius ------------------
        this.getCoorsInRaduis = function(radius, pair)
        {
            let steps = []
            let coors =[]

            for (let i=-radius; i<radius+1; i++)
            {
                steps.push(i);
            }
        
            for(let x of steps)
            {
                for(let y of steps)
                {
                    if ( (Math.abs(x)+Math.abs(y)<=radius) && this.isValidCoordinates(x+pair.coorX,y+pair.coorY) )
                    {
                        coors.push({coorX: x+pair.coorX, coorY:y+pair.coorY})
                    }
                }
            }
            return coors;
        }
        // ------------------------------------------

        // (?) Check if Coors are Valid -------------
        this.isValidCoordinates = function(coorX, coorY)
        {
            return  (coorX >= 0) && (coorX < numberOfCols) && (coorY >= 0) && (coorY < numberOfRows);
        }
        // ------------------------------------------

        // (?) Randomize Order of Elements ----------
        this.shuffle = function(array) 
        {
            let currentIndex = array.length;
            let randomIndex = 0;
        
            while (currentIndex !== 0)
            {
              // (?) Random: returns a float from 0 to <1
              // (?) Random*Max: returns a float from 0 to <Max
              // (?) Floor: returns integer
              randomIndex = Math.floor(Math.random() * currentIndex);
              currentIndex--;
              // (?) Swapping (destructuring assignment)
              [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
            }
            return array;
        }
        // ------------------------------------------

        // (?) Get Neighbors' Coor ------------------
        this.getCoorsNearBy = function(pair, onlyMain=false)
        {
            // (?) Directions
            /*
                NW NO NE
                WE CE EA
                SW SO SE
            */
            let nearCoorPairs = [];

            // (?) Main Directions
            let NORTH =         {coorX: pair.coorX   ,  coorY: pair.coorY-1 }
            let EAST  =         {coorX: pair.coorX+1 ,  coorY: pair.coorY   }
            let SOUTH =         {coorX: pair.coorX   ,  coorY: pair.coorY+1 }
            let WEST  =         {coorX: pair.coorX-1 ,  coorY: pair.coorY  }
            for (let itemToCheck of [NORTH,EAST,SOUTH,WEST])
            {
                if(this.isValidCoordinates(itemToCheck.coorX,itemToCheck.coorY))
                {
                    nearCoorPairs.push(itemToCheck)
                }
            }
            if (onlyMain) {return nearCoorPairs;}

            // (?) Diag Directions
            let NORTH_EAST =    {coorX: pair.coorX+1 , coorY: pair.coorY-1}
            let NORTH_WEST =    {coorX: pair.coorX-1 , coorY: pair.coorY-1}
            let SOUTH_EAST =    {coorX: pair.coorX+1 , coorY: pair.coorY+1}
            let SOUTH_WEST =    {coorX: pair.coorX-1 , coorY: pair.coorY+1}
            for (let itemToCheck of [NORTH_EAST,NORTH_WEST,SOUTH_EAST,SOUTH_WEST])
            {
                if(this.isValidCoordinates(itemToCheck.coorX,itemToCheck.coorY))
                {
                    nearCoorPairs.push(itemToCheck)
                }
            }
            return nearCoorPairs;
        }
        // ------------------------------------------

        // (?) List of Cells ------------------------
        this.getCellsAsList =  function()
        {
            let listOfCells=[]

            for (let y = 0; y < this.numberOfRows; y++) 
            {
                for (let x = 0; x < this.numberOfCols; x++) 
                {
                    listOfCells.push(this.getCell(x,y));
                }
            }

            return listOfCells;

        }
        // ------------------------------------------

        this.openCell = function(pair)
        {   

            let coorsToCheck=[pair]
            let counter=0;

            while(coorsToCheck.length>0)
            {
                
               
                let coors=coorsToCheck.pop()
                let currentCell=this.getCell(coors.coorX,coors.coorY)

                if(currentCell.isOpened) {continue;}

                counter++;
                currentCell.isOpened=true;
                if(currentCell.isFlagged)
                {
                    this.flagCell(currentCell.getCoors())
                }


                if (!(currentCell.isBomb) && (currentCell.bombCount===0))
                {
                    let coorsToAdd=this.getCoorsNearBy(coors,true).filter((c) => 
                        {return !(this.getCell(c.coorX,c.coorY).isOpened)})
                        
                    coorsToCheck=[...coorsToCheck,...coorsToAdd]
                }
             

            }
            this.numberOfRevealedCells=this.numberOfRevealedCells+counter;
        }


        this.revealField = function()
        {   
            for (let cell of this.getCellsAsList()) {cell.isOpened=true;}
        }
        this.revealFieldEndGame = function()
        {   
            let victory=true;
            for (let cell of this.getCellsAsList()) 
            {
                cell.isOpened=true;
                if(cell.isBomb && cell.isFlagged) {cell.state="defused";}
                if(cell.isBomb && !cell.isFlagged) {cell.state="triggered";victory=false;}
                if(!cell.isBomb && cell.isFlagged) {cell.state="mistaken";victory=false;}
            }
            return victory;
        }




        this.flagCell = function(coors)
        {   
            if(this.getCell(coors.coorX,coors.coorY).isFlagged)
            {
                this.getCell(coors.coorX,coors.coorY).isFlagged=false;
                this.numberOfFlaggedCells--;
            }
            else
            {
                this.getCell(coors.coorX,coors.coorY).isFlagged=true;
                this.numberOfFlaggedCells++;
            }

        }

        this.prepareField();
    }
}

export {ClassField}