/*
    Class GameCell
*/
class ClassCell 
{
    // (?) Coordinates: from 0 to < Cols(X)/Rows(Y)
    constructor(coorX,coorY)
    {
        
        this.coorX=coorX;
        this.coorY=coorY;
    
        this.bombCount=0;
        
        this.isBomb=false;
        this.isOpened=false;
        this.isFlagged=false;
        this.state="idle"; // idle triggered defused mistaken

        this.getCoors = function() {return {coorX: this.coorX, coorY: this.coorY}}
    }

}

export {ClassCell}