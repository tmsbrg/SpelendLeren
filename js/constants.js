// Copyright 2014, Thomas van der Berg & Patrick Malissa
//
// This source code is distributed under the terms of the
// GNU General Public License v3 (see GPLv3.txt)

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

    allLevelsPlayable: false, // if true, all levels start playable

    defaultParTime: 100, // default time to defeat levels in, in seconds

    collisionRadius: 48,  // radius for checking collision with target building

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

    indicator_size : 48, // size of the arrow that's shown when you have to
                         // select a building, and the exclamation mark when
                         // you have to take over a building
}

/* game engine settings */
me.sys.fps = 60; /* max FPS */
me.sys.pauseOnBlur = true; /* pause the game when out of focus */
me.sys.preRender = true;
