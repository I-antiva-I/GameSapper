export function isAreaVisible(areaName,sceneState)
{
    //        AREAS: OPTIONS SCORE GAME
    // SCENE STATES: IDLE SETUP SCORE GAME
    let isVisible=false;

    switch(areaName)
    {
        case("OPTIONS"):
            isVisible=(sceneState==="SETUP")
            break;
        case("SCORE"):
            isVisible=(sceneState==="SCORE")
            break;
        case("GAME"):
            isVisible=(sceneState==="GAME")
            break;
        default:
    }
    //console.log(areaName,sceneState,isVisible)
    return isVisible;
}