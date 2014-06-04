/*
	* TODO: write comment
*/
Main.ScoreData = Object.extend(
{
    units: null, // array of unit types present in the level
    startLevelTime: null, // the time when the level was started

	init: function(units)
	{
        for (var i=0; i<units.length; i++) {
            this["spawned_" + units[i]] = 0;
            this["lost_" + units[i]] = 0;
            this["killed_" + units[i]] = 0;
        }
		this.units = units;
        this.startLevelTime = me.timer.getTime();
	},
	
	addScore: function(unitType, category, amount)
	{
        if (this[category + "_" + unitType] != undefined) {
            this[category + "_" + unitType] += amount;
        }
	},
	
	getScore: function(unitType, category)
	{
		return this[category + "_" + unitType];
	},
	
});
