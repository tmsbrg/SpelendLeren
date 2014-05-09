/* Constants: contains constant values used in the game */
Constants =
{
	upgradeLevels: 2,
    screenWidth: 1024,
    screenHeight: 768,
    resizeToBrowser: false, /* resize canvas to browser size */

    players: [
        "neutral",
        "user",
    ],

    battle_order: [
        "farmer",
        "knight",
        "monk"
    ],

}

/* game engine settings */
me.sys.fps = 60; /* max FPS */
me.sys.pauseOnBlur = false; /* pause the game when out of focus */
me.sys.preRender = true;
