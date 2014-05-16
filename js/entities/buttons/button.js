/* Button: clickable object that contains a renderable displayObject which it
   draws */
Main.Button = me.Renderable.extend(
{
	mouseEvents: null,
	displayObject: null,

	init: function (displayObject, onClick, onHover, clickArgs, hoverArgs)
	{
		this.mouseEvents = new Main.MouseEvents(this); 
		this.displayObject = displayObject;

        this.parent(this.displayObject.pos, this.displayObject.width,
                    this.displayObject.height);
        // put displayObject's position to 0,0; position is handled by the
        // button object
        this.displayObject.pos = new me.Vector2d(0, 0);

        this.setOnClick(onClick, clickArgs);
        this.setOnHover(onHover, hoverArgs);
	},

    // sets onClick to given value, sets clickable to true unless false is given
    setOnClick: function(onClick, clickable)
    {
        this.onClick = onClick ? onClick : this.onClick;
        this.mouseEvents.setOnClick(this.onClick.bind(this), clickable);
    },

    // sets onHover to given value, sets hoverable to true unless false is given
    setOnHover: function(onHover, hoverable)
    {
        this.onHover = onHover ? onHover : this.onHover;
        this.mouseEvents.setOnHover(this.onHover.bind(this), hoverable);
    },
    
	update: function()
	{
		return this.displayObject.update();
	},

    // draws displayObject at button's position
	draw: function(ctx)
	{
        ctx.save();
        ctx.translate(this.pos.x, this.pos.y)
		this.displayObject.draw(ctx);
        ctx.restore();
	},
	
	destroy: function()
	{
		me.input.releasePointerEvent("mouseup",this);
		me.input.releasePointerEvent("mousemove",this);
	},

	onClick: function(ev)
	{
	},

	onHover: function(ev)
	{
	},
	
	onHoverOut: function(ev)
	{
	},

	onDoubleClick: function(ev)
	{
	}
});
