
/* Main object */
var Main =
{
    levelScreen: null, // reference to the levelScreen
	menuScreen: null, // reference to the menuScreen
	campaignScreen: null, // reference to the campaignScreen
	
	// Run on page load.
    onload: function () 
    {
        // Initialize the video.
        if (!me.video.init("screen", Constants.screenWidth,
                                     Constants.screenHeight,
                                     false,
                                     Constants.resizeToBrowser ?
                                        'auto' : undefined)) {
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
        // this.font = new me.BitmapFont("ubuntu_font", {x:16,y:32}, 0.5);
        this.font = new me.BitmapFont("ugly_font", 32, 0.4);

        this.levelScreen = new Main.LevelScreen();
		this.menuScreen = new Main.MenuScreen();
		this.campaignScreen = new Main.CampaignScreen();
		
        me.state.set(me.state.MENU, this.menuScreen);
		me.state.set(me.state.READY, this.campaignScreen);
		me.state.set(me.state.PLAY, this.levelScreen);

        // me.pool.register("farm", 

        // warning, hack: getting mouse down checking to work without using
        // a key
        me.input.bindKey(1000, "mouseleft");
        me.input.bindMouse(me.input.mouse.LEFT, 1000);

        // Start the game.
        me.state.change(me.state.MENU);
    },
};
