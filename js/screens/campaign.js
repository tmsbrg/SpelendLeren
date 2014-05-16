Main.CampaignScreen = me.ScreenObject.extend(
{
	background: null, // ImageObject with the background image
	level_buttons: new Array(),
	buttonWidth: 337,
	buttonHeight: 83,
	levelPos: new Array([100, 200],[200, 10],[300, 464],[234, 607],[434, 123]),
	
	onResetEvent: function()
	{
		me.audio.play("campaign", true);
		this.background = new Main.Image(0, 0, "bg_map",
                                         Constants.screenWidth,
                                         Constants.screenHeight);
        me.game.add(this.background, 0);
		
		for(var i = 0; i < this.levelPos.length; i++)
		{
			var xPos = this.levelPos[i][0];
			var yPos = this.levelPos[i][1];
			this.level_button = new Main.Image(xPos, yPos, "level_button",
                                        this.buttonWidth,
                                        this.buttonHeight);
			var textObject = new Main.TextObject(xPos + 100, yPos + (this.buttonHeight * 0.5), "", Main.font);
			var text = "LEVEL "+(i+1);
			
			me.game.add(textObject, 30);
			textObject.setText(text);
			
			var level_button = new Main.Button(this.level_button, this.start_level.bind(this), null, "level"+(i+1));
			me.game.add(level_button, 20);
			this.level_buttons.push(level_button);
		}
	},
	
	start_level: function(level)
	{
		me.audio.stop("campaign");
		me.state.change(me.state.PLAY, level); 
	},
});