Main.CampaignScreen = me.ScreenObject.extend(
{
	background: null, // ImageObject with the background image
	level_buttons: new Array(),
	buttonWidth: 39,
	buttonHeight: 45,
	
	onResetEvent: function()
	{
		this.background = new Main.Image(0, 0, "bg_map",
                                         Constants.screenWidth,
                                         Constants.screenHeight);
        me.game.add(this.background, 0);
		var levelCount = 5;
		for(var i = 1; i <= levelCount; i++)
		{
			this.level_button = new Main.Image(100+ (50* i), 200 , "level_button",
                                        this.buttonWidth,
                                        this.buttonHeight);
		
			var level_button = new Main.Button(this.level_button, this.start_level.bind(this), null, "level"+i);
			me.game.add(level_button, 20);
			this.level_buttons.push(level_button);
		}
		
	},
	
	start_level: function(level)
	{
		me.state.change(me.state.PLAY, level); 
	},
});