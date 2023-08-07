//
export function getRandomNumber(min, max) 
{
    min = Math.ceil(min);
    max = Math.floor(max);

    let value = Math.floor(Math.random()*(max-min+1)+min);
    
    //console.log("Random is",value);
    return value;
}


//
export function getGoodTime()
{
    // RJUST
  function leadingZero(value)
             {if(value<10) {return "0"+value;} else {return value;}}

  let currentTime= new Date();
  let date= currentTime.getFullYear()+"/"+
            leadingZero(currentTime.getMonth()+1) +"/"+
            leadingZero(currentTime.getDate())+" "+
            leadingZero(currentTime.getHours())+":"+
            leadingZero(currentTime.getMinutes())
  return date;
}