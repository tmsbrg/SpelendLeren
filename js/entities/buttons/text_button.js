/*
 *Text_Button is a clickable Button with a text in it
 the size of the Button is based on the size of the text
*/

Main.TextButton = Main.Button.extend(
{
	text: null, // placeholder Form the textobject whichs disaplys the name of the button
	buttonWidth: 249,
	buttonHeight: 61,
	
	init: function(textinput, onClick, onHover, clickArgs, hoverArgs)
	{
		
		var displayObject = new Main.Image(410, 300, "menu_start_button",
                                        this.getTextWidth(textinput),
                                        this.buttonHeight);
		this.parent(displayObject, onClick, onHover, clickArgs, hoverArgs);
		console.log(Main.font.fontSize.x);
		this.text = new Main.TextObject(this.pos.x, this.pos.y, textinput, Main.font);
		me.game.add(this.text, 50);
	},
	
	getTextWidth: function(textinput)
	{
		var count = 0;
		for(var i = 0 ; i < textinput.length; i++)
		{
			console.log(i);
			count += (Main.font.fontSize.x * 0.4);
		}
		return count;
	},
});