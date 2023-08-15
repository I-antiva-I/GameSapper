import React, { useState, useEffect, useRef } from "react";
import { FieldSettings } from "../../scripts/game_logic/game_process";

interface FormData
{
    numberOfColumns:       number;
    numberOfRows:          number;
    numberOfBombsMin:      number;
    numberOfBombsMax:      number;
    safeZoneRadius:        number;
}

interface FormCustomDifficultyProps
{
    setFieldSettings: Function,
}

function FormCustomDifficulty(props : FormCustomDifficultyProps)
{
    
    let [formData, setFormData] = useState<FormData>({
        numberOfColumns:    2,
        numberOfRows:       2,
        numberOfBombsMin:   1,
        numberOfBombsMax:   1,
        safeZoneRadius:     1,
    });

    let onFormSubmit = (event: React.FormEvent<HTMLFormElement>) => 
    {
        event.preventDefault();
        console.log("Form submitted", event);

        props.setFieldSettings(new FieldSettings(
            formData.numberOfColumns, 
            formData.numberOfRows, 
            formData.numberOfBombsMin,
            formData.numberOfBombsMax,
            formData.safeZoneRadius));
    }

    let onInputValueChange = (event: React.ChangeEvent<HTMLInputElement>) =>
    {
        console.log(event);
        console.log(event.target);
        console.log(event.target.value);

        let value = event.target.value;
        let name =  event.target.name;
    
        setFormData({...formData, [name]: value});
    }

    return(
        <div className="custom-difficulty">
            <form onSubmit={onFormSubmit}>

                <label htmlFor="rows">Number of rows</label>
                <input type="number" id="number-of-rows" min="1" max="8" 
                        name="numberOfRows"
                        value={formData.numberOfRows} 
                        onChange={onInputValueChange}/>

                <label htmlFor="number-of-columns">Number of columns</label>
                <input type="number" id="number-of-columns" min="1" max="8"
                        name="numberOfColumns"
                        value={formData.numberOfColumns}
                        onChange={onInputValueChange}/>

                <label htmlFor="a">Minimum number of bombs</label>
                <input type="number" id="number-of-bombs-min" min="1" max="8"
                        name="numberOfBombsMin"
                        value={formData.numberOfBombsMin}
                        onChange={onInputValueChange}/>

                <label htmlFor="cols">Maximum number of bombs</label>
                <input type="number" id="number-of-bombs-max" min="1" max="8" 
                        name="numberOfBombsMax"
                        value={formData.numberOfBombsMax}
                        onChange={onInputValueChange}/>

                <label htmlFor="cols">Safe zone radius</label>
                <input type="number" id="safe-zone-radius" min="1" max="8" 
                        name="safeZoneRadius"
                        value={formData.safeZoneRadius}
                        onChange={onInputValueChange}/>

                <input type="submit" value="Submit" />
            </form>
        </div>

    )
}


export default FormCustomDifficulty;