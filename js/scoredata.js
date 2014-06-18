// Copyright 2014, Thomas van der Berg & Patrick Malissa
//
// This source code is distributed under the terms of the
// GNU General Public License v3 (see GPLv3.txt)

// ScoreData: keeps information about the score received in a level
Main.ScoreData = Object.extend(
{
    units: null, // array of unit types present in the level
    startLevelTime: null, // the time when the level was started
	score: 0, // score the player getScore for playing a level
	endTime: 0, // time the userAgent needed to complete the level
	parTime: null,
	beginScore: 1000,
	timeScore: 0,

	init: function(units, parTime)
	{
        for (var i = 0; i < units.length; i++) {
            this["spawned_" + units[i]] = 0;
            this["lost_" + units[i]] = 0;
            this["killed_" + units[i]] = 0;
        }
		this.units = units;
        this.startLevelTime = me.timer.getTime();
        this.parTime = parTime;
	},
	
	calculateScore: function()
	{
		this.score += this.beginScore;
		for (var i = 0; i < this.units.length; i++) {
			this.score += this.getScore(this.units[i], "spawned") * 5;
            this.score -=  this.getScore(this.units[i], "lost")* 15;
            this.score += this.getScore(this.units[i], "killed")* 10;
		}
		this.timeScore = (this.parTime - this.endTime) * 25;
		this.score += this.timeScore;
	},
	
	setEndTime: function(time)
	{
		this.endTime = time;
	},
	// changes the amount of the given category from the given unittype by the value of the given amount
	addScore: function(unitType, category, amount)
	{
        if (this[category + "_" + unitType] != undefined) {
            this[category + "_" + unitType] += amount;
        }
	},
	// returns the value of the given category and unittype
	getScore: function(unitType, category)
	{
		return this[category + "_" + unitType];
	},
	
});
