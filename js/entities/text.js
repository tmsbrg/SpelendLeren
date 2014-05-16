// TextObject: Draws a text
Main.TextObject = me.Renderable.extend(
{
    init: function(x, y, text, font)
    {
        this.parent(new me.Vector2d(x, y), font.height, font.height);
        this.text = text;
        this.font = font;
        this.floating = true;
    },
    text: null,
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
