/* Constants: contains constant values used in the game */
Constants =
{
	upgradeLevels: 2,
    screenWidth: 1024,
    screenHeight: 768,
    resizeToBrowser: true, /* resize canvas to browser size */
    playerIsAI: false, /* if true, player is played by the AI (for testing) */

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
}

/* game engine settings */
me.sys.fps = 60; /* max FPS */
me.sys.pauseOnBlur = false; /* pause the game when out of focus */
me.sys.preRender = true;
