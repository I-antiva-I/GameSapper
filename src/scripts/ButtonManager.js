export function getButtonState(buttonType,gameState,sceneState)
{
    let state=
    {
        text: "?",
        isActive: false,
    }
    //         TEXT: ⚙️ 🏆 🕹️ ✔️ 🎯 🚩 🔄 ❌
    //  GAME STATES: AWAIT PLAY OVER
    // SCENE STATES: IDLE SETUP SCORE GAME DEFAULT* FLAG*
    switch(buttonType)
    {
        case "Settings":
            state.text="⚙️";
            state.isActive= ((gameState==="AWAIT")&&!(sceneState==="SETUP"));
            break;
        case "Score":
            state.text="🏆";
            state.isActive= ((gameState==="AWAIT")&&!(sceneState==="SCORE"));
            break;
        case "Open":
            state.text="🎯";
            state.isActive= ((gameState==="PLAY")&&!(sceneState==="DEFAULT"));
            break;
        case "Mark":
            state.text="🚩";
            state.isActive= ((gameState==="PLAY")&&!(sceneState==="FLAG"));
            break;
        case "Done":
            state.text="✔️";
            state.isActive= ((gameState==="PLAY"));
            break;
        case "Game":
            state.text= (gameState==="AWAIT") ? "🕹️" : "🔄"
            state.isActive= ((gameState==="AWAIT")&&(sceneState!=="GAME")) || (gameState!=="AWAIT" && gameState!=="PLAY") 
            break;
        default:
    }
    //
    return state;
}