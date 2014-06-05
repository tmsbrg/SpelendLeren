/* Constants: contains constant values used in the game */
Constants =
{
	upgradeLevels: 1, // feature that never made it in, RIP
    screenWidth: 1024,
    screenHeight: 768,
    resizeToBrowser: true, // resize canvas to browser size 
    playerIsAI: false, // if true, player is played by the AI (for testing) 
	disableAI: false, // disable enemy AIs

    startMuted: false, // whether the game starts muted

    allLevelsPlayable: true, // if true, all levels start playable

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

    textScale : 0.7,

    difficulties: [
        {
            alwaysInactive : true,
        },
        {
            timeUntilWave : 16000,
            targetLock: true
        },
        {
            timeUntilWave : 12000,
            targetLock: true
        },
        {
            timeUntilWave : 8000,
            wavesToSend : 2,
        },
        {
            timeUntilWave : 6000,
            wavesToSend : 3,
        },
    ],

}

/* game engine settings */
me.sys.fps = 60; /* max FPS */
me.sys.pauseOnBlur = true; /* pause the game when out of focus */
me.sys.preRender = true;
