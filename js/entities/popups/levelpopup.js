Main.LevelPopup = Main.GUIContainer.extend(
{
	init: function(level)
    {
		this.initBackground();
	},
	
	initBackground: function()
	{
		var img = "popup_" + level;
		this.imageObject = new Main.Image(0, 0, img);
	},
	
	
});