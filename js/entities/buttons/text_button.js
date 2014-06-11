/*
 *Text_Button is a clickable Button with a text in it
 *the size of the Button is based on the size of the text
*/

Main.TextButton = Main.Button.extend(
{
	text: null, // placeholder Form the textobject whichs disaplys the name of the button
	font_size: null, // size of the font
	margin_vertical: 60, // verticalAlign margin
	margin_horizontal: 160, // horizontal margin
	
	init: function(x, y, textinput, onClick, onHover, onHoverOut, clickArgs, hoverArgs)
	{
		this.font_size = Main.font.fontSize.x * Constants.textScale;
		
		
		var image = new Main.Image(0, 0, "button",
                          this.getTextWidth(textinput) + this.margin_horizontal,
                                        this.font_size + this.margin_vertical);

        var text = new Main.TextObject((this.margin_horizontal * 0.5),
                                       (this.margin_vertical * 0.5),
                                       textinput, Main.font);
		
		this.parent(new Main.GUIContainer(x, y, [image, text]),
                         onClick, onHover, onHoverOut, clickArgs, hoverArgs);
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
