/*
 *Text_Button is a clickable Button with a text in it
 the size of the Button is based on the size of the text
*/

Main.TextButton = Main.Button.extend(
{
	text: null, // placeholder Form the textobject whichs disaplys the name of the button
	font_size: null, // size of the font
	margin_vertical: 60, // verticalAlign margin
	margin_horizontal: 160, // horizontal margin
	
	init: function(x, y, textinput, onClick, onHover, onHoverOut, clickArgs, hoverArgs)
	{
		this.font_size = Main.font.fontSize.x * 0.4;
		
		var displayObject = new Main.Image(x, y, "button",
                                        this.getTextWidth(textinput) + this.margin_horizontal,
                                        this.font_size + this.margin_vertical);
		
		this.parent(displayObject, onClick, onHover, onHoverOut, clickArgs, hoverArgs);
		
		this.text = new Main.TextObject(this.pos.x + (this.margin_horizontal * 0.5), this.pos.y + (this.margin_vertical * 0.5), textinput, Main.font);

		me.game.add(this.text, 50);
	},
	
	getTextWidth: function(textinput)
	{
		var count = 0;
		for(var i = 0 ; i < textinput.length; i++)
		{
			count += this.font_size;
		}
		return count;
	},
});
