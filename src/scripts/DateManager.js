export function getGoodTime()
{
  function leadingZero(value)
  {
      if(value<10) {return "0"+value;} else {return value;}
  }
  //----------
  let currentTime= new Date();
  let date= currentTime.getFullYear()+"/"+
            leadingZero(currentTime.getMonth()+1) +"/"+
            leadingZero(currentTime.getDate())+" "+
            leadingZero(currentTime.getHours())+":"+
            leadingZero(currentTime.getMinutes())
  return date;
}