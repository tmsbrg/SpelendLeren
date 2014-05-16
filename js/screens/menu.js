/* MenuScreen: the main menu screen, shows diffretn buttons to start or 
 * config the game */
Main.MenuScreen = me.ScreenObject.extend(
{
	background: null, // ImageObject with the background image
	startButtonObject: null, // Image object with the placeholder of the start button
	buttonWidth: 249,
	buttonHeight: 61,
	
	onResetEvent: function()
	{
		this.background = new Main.Image(0, 0, "bg_menu",
                                         Constants.screenWidth,
                                         Constants.screenHeight);
        me.game.add(this.background, 0);
		
		this.startButtonObject = new Main.Image(100, 200, "menu_start_button",
                                        this.buttonWidth,
                                        this.buttonHeight);
		
		var start_game_button = new Main.Button(this.startButtonObject, this.start_game.bind(this));
		me.game.add(start_game_button, 20);
	},
	
	start_game: function()
	{
		me.state.change(me.state.READY); 
	},
});
