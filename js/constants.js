/* Constants: contains constant values used in the game */
Constants = {

    screenWidth: 1060,
    screenHeight: 760,
    resizeToBrowser: false, /* resize canvas to browser size */

    players : {
        neutral: 0,
        user: 1,
        comp1: 2,
        comp2: 3,
        comp3: 4,
    },

}

/* game engine settings */
me.sys.fps = 60; /* max FPS */
me.sys.pauseOnBlur = false; /* pause the game when out of focus */
me.sys.preRender = true;
