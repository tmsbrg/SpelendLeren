/* Constants: contains constant values used in the game */
Constants =
{

    screenWidth: 1024,
    screenHeight: 768,
    resizeToBrowser: true, /* resize canvas to browser size */

    players: [
        "neutral",
        "user",
    ],

}

/* game engine settings */
me.sys.fps = 60; /* max FPS */
me.sys.pauseOnBlur = false; /* pause the game when out of focus */
me.sys.preRender = true;
