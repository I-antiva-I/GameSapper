import {getDefaultSettings} from "../../scripts/utility/difficulty_settings"


function Options(props)
{

    return(
        <div className={"options-area"}>
                    
            <div className="difficulty-basic">
                <h3>Difficulty Options:</h3>
                <div className="button-container">
                    <button onClick={()=>{props.changeDifficultySettings(getDefaultSettings("DIFFICULTY_EASY"))}}>Easy</button>
                    <button onClick={()=>{props.changeDifficultySettings(getDefaultSettings("DIFFICULTY_MEDIUM"))}}>Medium</button>
                    <button onClick={()=>{props.changeDifficultySettings(getDefaultSettings("DIFFICULTY_HARD"))}}>Hard</button>
                </div>
            </div>

            <div className="difficulty-custom">
                <h3>Custom Difficulty:</h3>
                <form >
                    <label htmlFor="fieldBombMax">Max Bomb Count</label>
                    <input type="number" id="fieldBombMax" name="fieldBombMax" min="1" max="99" required="required"></input>
                    
                    <label htmlFor="fieldBombMax">Min Bomb Count</label>
                    <input type="number" id="fieldBombMin" name="fieldBombMin" min="1" max="99" required="required"></input>
                
                    <label htmlFor="fieldGameWidth">Field Width</label>
                    <input type="number" id="fieldGameWidth" name="fieldGameWidth" min="1" max="13" required="required"></input>
                    
                    <label htmlFor="fieldGameHeight">Field Height</label>
                    <input type="number" id="fieldGameHeight" name="fieldGameHeight" min="1" max="13" required="required"></input>
                
                    <label htmlFor="saveZoneRadius">Save Zone:</label>
                    <select name="saveZoneRadius" id="saveZoneRadius">
                        <option value="1">Small</option>
                        <option value="2">Normal</option>
                        <option value="3">Large</option>
                    </select>

                    <input className="button-submit" type="submit" value="OK"></input>
    
                </form>
            </div>
        </div>

    )

}


export default Options;