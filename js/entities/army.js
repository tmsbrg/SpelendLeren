/*
* the Army will be created if one of the player in 
* a level attacks or support another building
*/
Main.Army = me.Renderable.extend(
{
    amount: 0, // amount of soldiers in this army
	upgradeLevel: null,
	units: null, // dictionary with all the different value sof the units inside
	squadArray: null,
	timeSinceLastSpawn: 500,
	spawnSquadTime:500,
	speed: 0,
	
	// constructor function of Army needs two Vector2d the type of the Army and
    // the owner of the army
	init: function(startPoint, target, owner, units)
	{
		this.units = units;
		this.owner = owner;
		this.startPoint = startPoint;
		this.target = target;
        this.squadArray = [];
		
		// TODO: speed should be based on the slowest unit
		var keys = units.keys();
		
		this.speed = this.getSpeed(keys);
		if(keys.length > 1){
			
			for(var i = 0; i < keys.length; i++)
			{
				var squadDic = new Main.Dictionary();
				squadDic.setValue(keys[i], units.getValue(keys[i]));
				
				this.squadArray.push(squadDic);
				
				//this.createSquad(squadDic, 30-i);
			}
		} else {
			this.createSquad(units, 21);
		}
		
		// var image_name = owner +_+ unittype +_+ unitlevel
		this.parent(startPoint, 0 ,0);
		
	},
	
	getSpeed: function(keys)
	{
		var speed = 30;
		for(var i = 0; i < keys.length; i++)
		{
			if(UnitConfig(keys[i], 0, "speed") < speed ) {
				speed = UnitConfig(keys[i], 0, "speed");
			}
		}
		
		return speed;
	},
	
	
	createSquad: function(dictionary, layer)
	{
		var squad = new Main.Squad(this.startPoint, this.target, dictionary, this.owner, this.speed);
		me.game.add(squad, layer);
	},
	
	update: function()
	{
		if (this.squadArray.length > 0) {
			this.timeSinceLastSpawn += Main.timer.dt; // * Main.timer.dt;
			
			if(this.timeSinceLastSpawn > this.spawnSquadTime) {
				this.createSquad(this.squadArray[this.squadArray.length -1], 30 - (this.squadArray.length -1));
				this.squadArray.pop();
				this.timeSinceLastSpawn = 0;
			}
		} else {
			me.game.remove(this);
		}
	},
	
});
