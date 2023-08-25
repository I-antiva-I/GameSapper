import { FieldSettings } from "../game_logic/game_process";

// Get random number
export function getRandomNumber(minValue: number, maxValue: number) 
{
  let min = Math.ceil(minValue);
  let max = Math.floor(maxValue);

  let randomValue = Math.floor(Math.random()*(max-min+1)+min);

  return randomValue;
}

// Randomize order of elements in array
  // (1) Random:        returns a float from 0 to <1
  // (2) Random*Max:    returns a float from 0 to <Max
  // (3) Floor:         returns integer
  // (4) Swapping (destructuring assignment)
export function shuffleArray(array: any[])
{
  let currentIndex = array.length;
  let randomIndex = 0;

  while (currentIndex !== 0) {

    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;
   
    [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
  }

  return array;

}

export enum ClickMode
{
  OPEN_CELL,
  FLAG_CELL,
}

export enum DisplayMode
{
  GAME,
  SETTINGS,
  SCORE,
  INFO,
}

export enum ControlButtonAction
{
  INFO,
  SETTINGS,
  SCORE,
  PLAY,
  MODE_OPEN_CELL,
  MODE_FLAG_CELL,
  END_GAME,
  RESTART,
  RETURN,
}

export enum GameDifficulty
{
  VERY_EASY,
  EASY,
  MEDIUM,
  HARD,
  VERY_HARD,
}

// Default field settings for all difficulties
export function getDifficultySettings(difficulty: GameDifficulty)
{
  switch(difficulty)
  {
    case GameDifficulty.VERY_EASY:
      return new FieldSettings(5,5,5,5,2);

    case GameDifficulty.EASY:
      return new FieldSettings(7,7,10,12,2);

    case GameDifficulty.MEDIUM:
      return new FieldSettings(15,15,28,32,3);
  
    case GameDifficulty.HARD:
      return new FieldSettings(15,21,40,48,3);

      case GameDifficulty.VERY_HARD:
        return new FieldSettings(15,31,99,99,4);

    default:
      return new FieldSettings(2,2,1,1,1);
  }
}

// Emoji
// ⚙️ 🏆 🕹️ ✔️ 🎯 🚩 🔄 ❌ 💣
