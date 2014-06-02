Main.CampaignScreen = me.ScreenObject.extend(
{
	background: null, // ImageObject with the background image
	level_buttons: new Array(),
	buttonWidth: 337,
	buttonHeight: 83,
	levelPos: new Array([478, 177],[508, 135],[555, 122],[729, 328],[611, 347],
                        [600, 407]),
	
	onResetEvent: function()
	{
		me.audio.play("campaign", true);
		this.background = new Main.Image(0, 0, "bg_map",
                                         Constants.screenWidth,
                                         Constants.screenHeight);
        me.game.add(this.background, 0);
		console.log("playerlevel " + Main.playerlevel);
		for(var i = 0; i < this.levelPos.length; i++)
		{
			var pos = new me.Vector2d(this.levelPos[i][0], this.levelPos[i][1]);
			
			var level = "level"+(i+1)
			if (i+1 < Main.playerlevel) {
				var level_flag = new Main.FlagButton(pos, "conquered", i+1);
			} else if (i+1 > Main.playerlevel) {
				var level_flag = new Main.FlagButton(pos, "locked", i+1);
			} else if (i+1 == Main.playerlevel) {
				var level_flag = new Main.FlagButton(pos, "unlocked", i+1);
			}

			me.game.add(level_flag, 20);
			this.level_buttons.push(level_flag);
		}
		
		var back_button = new Main.TextButton(790, 680, "back",  this.back_menu.bind(this), null, null, level);
		me.game.add(back_button, 21);
	},
	
	back_menu: function()
	{
		me.audio.stop("campaign");
		me.state.change(me.state.MENU); 
	},
	
	/*start_level: function(level)
	{
		me.audio.stop("campaign");
		me.state.change(me.state.PLAY, level); 
	},*/
});
