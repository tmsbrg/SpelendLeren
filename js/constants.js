/* Constants: contains constant values used in the game */
Constants =
{
	upgradeLevels: 1, // feature that never made it in
    screenWidth: 1024,
    screenHeight: 768,
    resizeToBrowser: true, // resize canvas to browser size 
    playerIsAI: false, // if true, player is played by the AI (for testing) 
	disableAI: false, // disable enemy AIs

    players: [
        "neutral",
        "user",
    ],

    actions: [
        "select",
        "takeover",
        "sendarmyfrom",
        "support",
    ],

    textScale : 0.6,
}

/* game engine settings */
me.sys.fps = 60; /* max FPS */
me.sys.pauseOnBlur = true; /* pause the game when out of focus */
me.sys.preRender = true;
