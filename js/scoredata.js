/*
	* TODO: write comment
*/
Main.ScoreData = Object.extend(
{
	init: function(units)
	{
        for (var i=0; i<units.length; i++) {
            this["spawned_" + units[i]] = 0;
            this["lost_" + units[i]] = 0;
            this["killed_" + units[i]] = 0;
        }
		
	},
	
	addScore: function(unitType, category, amount)
	{
		this[category + "_" + unitType] += amount;
		//console.log(unitType + " " + category + " " + this.getScore(unitType, category));
	},
	
	getScore: function(unitType, category)
	{
		return this[category + "_" + unitType];
	},
	
});
