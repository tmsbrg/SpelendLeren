/*
	* TODO: write comment
*/
Main.ScoreData = Object.extend(
{
	spawned_farmer: 0,
	lost_farmer: 0,
	killed_farmer: 0,
	
	spawned_knight: 0,
	lost_knight: 0,
	killed_knight: 0,
	
	spawned_monk: 0,
	lost_monk: 0,
	killed_monk: 0,
	
	init: function()
	{
		
	},
	
	addScore: function(unitType, category, amount)
	{
		this[category + "_" + unitType] += amount;
		console.log(unitType + " " + category + " " + this.getScore(unitType, category));
	},
	
	getScore: function(unitType, category)
	{
		return this[category + "_" + unitType];
	},
	
});
