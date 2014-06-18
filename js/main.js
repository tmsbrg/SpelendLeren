
/* Main object */
var Main =
{
    levelScreen: null, // reference to the levelScreen
	menuScreen: null, // reference to the menuScreen
    font: null, // standard game font
	campaignScreen: null, // reference to the campaignScreen
	playerlevel: 1, // holds the progress of the player

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
		me.audio.init("ogg,mp3");
		// Set a callback to run when loading is complete.
		me.loader.onload = this.loaded.bind(this);
		// Load the resources.
		me.loader.preload(resources);
		this.loadingScreen = new Main.LoadingScreen();
		me.state.set(me.state.LOADING, this.loadingScreen);
		// Initialize melonJS and display a loading screen.
		me.state.change(me.state.LOADING);
    },

    // Run on game resources loaded.
    loaded: function ()
    {
        this.font = new me.BitmapFont("luxi_font", {x:20,y:38},
                                      Constants.textScale);
		

		me.save.add({playerlevel : this.playerlevel});
		
		this.playerlevel = me.save.playerlevel;
		
		this.timer = new Main.TimeObject();
		me.game.add(this.timer, 0);
									  
        this.levelScreen = new Main.LevelScreen();
		this.menuScreen = new Main.MenuScreen();
		this.campaignScreen = new Main.CampaignScreen();
		
        me.state.set(me.state.MENU, this.menuScreen);
		me.state.set(me.state.READY, this.campaignScreen);
		me.state.set(me.state.PLAY, this.levelScreen);

        // warning, hack: getting mouse down checking to work without using
        // a key
        me.input.bindKey(1000, "mouseleft");
        me.input.bindMouse(me.input.mouse.LEFT, 1000);
		
		me.input.bindKey(me.input.KEY.M, "mute");
		me.input.bindKey(me.input.KEY.ESC, "pause");
		
		var gui = new Main.GUI();
		me.game.add(gui, 200);
		
        // Start the game.
        me.state.change(me.state.MENU);
    },
};
