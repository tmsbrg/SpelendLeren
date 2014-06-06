/* TimeObject: Keeps deltaTime between every frame */
Main.TimeObject = Object.extend(
{
	updateWhenPaused: true,
    isPersistent: true,
	dt: 0, // delta time in miliseconds, usable in any update function
    paused: false, // whether the timer is paused
	_currentDate: null,
	_previousDate: null,
	
	init: function()
	{
		this.alwaysUpdate = true;
        this.reset();
	},
 
	update: function() 
	{
        if (this.paused) {
            this.dt = 0;
        } else {
            this.dt = this._currentDate - this._previousDate;
        }
        this._previousDate = this._currentDate;
        this._currentDate = me.timer.getTime();
		return false;
	},

    reset: function()
    {
		this._currentDate = me.timer.getTime();
		this._previousDate = me.timer.getTime();
    },

    pause: function()
    {
        this.paused = true;
    },

    unPause: function()
    {
        this.paused = false;
    },
});

