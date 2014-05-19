/* Button: clickable object that contains a renderable displayObject which it
   draws */
Main.Button = me.Renderable.extend(
{
	mouseEvents: null,
	displayObject: null,
    isHovered: false,

	init: function (displayObject, onClick, onHover, onHoverOut, clickArgs,
                    hoverArgs, hoverOutArgs)
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
        this.setOnHoverOut(onHoverOut, hoverOutArgs);
	},

    // sets onClick to given value, sets clickable to true unless false is given
    setOnClick: function(onClick, args, clickable)
    {
        this.onClick = onClick ? onClick : this.onClick;
        this.mouseEvents.setOnClick(this.onClick.bind(this), args, clickable);
    },

    // sets onHover to given value, sets hoverable to true unless false is given
    setOnHover: function(onHover, args, hoverable)
    {
        this.onHover = onHover ? onHover : this.onHover;
        this.mouseEvents.setOnHover(this.onHoverWrapper.bind(this), args,
                                    hoverable);
    },

    setOnHoverOut: function(onHoverOut, args)
    {
        this.onHoverOut = onHoverOut ? onHoverOut : this.onHoverOut;
        this.onHoverOutArgs = args;
    },
    
	update: function()
	{
        // onHoverOut hack
        if (this.isHovered && 
            !this.containsPoint(me.input.mouse.pos.x, me.input.mouse.pos.y)) {
            this.isHovered = false;
            this.onHoverOut(this.onHoverOutArgs);
        }
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

	onClick: function(args)
	{
	},

    onHoverWrapper: function(args)
    {
        this.isHovered = true;
        this.onHover(args);
    },

	onHover: function(args)
	{
	},
	
	onHoverOut: function(args)
	{
	},
});
