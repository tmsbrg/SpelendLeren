/* TimeObject: Keeps deltaTime between every frame */
Main.TimeObject = me.Renderable.extend(
{
	updateWhenPaused: true,
	dt: 0,
	_currentDate: null,
	_previousDate: null,
	
	init: function()
	{
		this.parent(new me.Vector2d(0, 0), 0, 0);
		this.alwaysUpdate = true;
		this._currentDate = me.timer.getTime();
		this._previousDate = me.timer.getTime();
	},
 
	update: function() 
	{
		this.dt = this._currentDate - this._previousDate;
		this._previousDate = this._currentDate;
		this._currentDate = me.timer.getTime();
		return false;
	},
	
	draw: function()
	{
		
	}
});

