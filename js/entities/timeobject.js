/* TimeObject: Keeps deltaTime between every frame */
Main.TimeObject = Object.extend(
{
	updateWhenPaused: true,
	dt: 0, // delta time, usable in any update function
	_currentDate: null,
	_previousDate: null,
	
	init: function()
	{
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
});

