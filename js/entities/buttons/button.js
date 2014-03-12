Main.Button = me.Renderable.extend(
{
	mouseEvents: null,
	displayObject: null,
	
	init: function (displayObject)
	{
		this.mouseEvents = new Main.MouseEvents(this, this.onClick, this.onHover,
											this.onHoverOut, this.onDoubleClick);
		
		this.displayObject = displayObject;
		
	},
	
	draw: function()
	{
		this.displayObject.draw();
	},
	
	update: function()
	{
		this.displayObject.update();
	},
	
	onClick: function(event)
	{
		
	},
	
	onHover: function(event)
	{
		
	},
	
	onHoverOut: function(event)
	{
		
	},
	
	onDoubleClick: function(event)
	{
		
	}
});