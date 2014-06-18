// Copyright 2014, Thomas van der Berg & Patrick Malissa
//
// This source code is distributed under the terms of the
// GNU General Public License v3 (see GPLv3.txt)

// TextObject: Draws a text
Main.TextObject = me.Renderable.extend(
{
    text: null,

    init: function(x, y, text, font)
    {
        this.parent(new me.Vector2d(x, y), font.size, font.size);
        this.text = text;
        this.font = font;
        this.floating = true;
    },
    /* setText: sets the text */
    setText: function(text)
    {
        this.text = text;
    },
    /* setPos: sets the counter's position to the desired x and y values and
     * updates its text */
    setPos: function(x, y)
    {
        this.pos = new me.Vector2d(x, y);
    },
	
	// handles the alignmetn of the textobject
	setAlignment: function(alignment)
	{
		this.font.set(alignment);
	},
	
    update: function()
    {
        return true;
    },
	
    draw: function(ctx)
    {
        this.font.draw(ctx, this.text, this.pos.x, this.pos.y);
    }
});
