
/* Main object */
var Main =
{
    // Run on page load.
    onload: function () 
    {
        // Initialize the video.
        if (!me.video.init("screen", Constants.screenWidth,
                                     Constants.screenHeight,
                                     Constants.resizeToBrowser)) {
            alert("Your browser does not support HTML5 canvas.");
            return;
        }
		
		// add "#debug" to the URL to enable the debug Panel
		if (document.location.hash === "#debug") {
			window.onReady(function ()
            {
				me.plugin.register.defer(debugPanel, "debug");
			});
		}

        // Initialize the audio.
        me.audio.init("mp3,ogg");

        // Set a callback to run when loading is complete.
        me.loader.onload = this.loaded.bind(this);
     
        // Load the resources.
        me.loader.preload(resources);

        // Initialize melonJS and display a loading screen.
        me.state.change(me.state.LOADING);
    },

    // Run on game resources loaded.
    loaded: function ()
    {
        this.font = new me.BitmapFont("ugly_font", 32, 0.25);
        this.levelScreen = new Main.LevelScreen();
        me.state.set(me.state.PLAY, this.levelScreen);

        // warning, hack: getting mouse down checking to work without using
        // a key
        me.input.bindKey(1000, "mouseleft");
        me.input.bindMouse(me.input.mouse.LEFT, 1000);

        // Start the game.
        me.state.change(me.state.PLAY, levelData[2]);
    },

    levelScreen: null, // reference to the levelScreen
};
