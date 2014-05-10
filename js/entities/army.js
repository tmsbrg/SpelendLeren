/*
* the Army will be created if one of the player in 
* a level attacks or support another building
*/
Main.Army = me.AnimationSheet.extend(
{
	speed: 0, // the speed of the army
    collisionRadius: 32, // radius for checking collision with target building
	type: null, // type of the army
	owner: "neutral", // contans who the owner of the Army is
    target: null, // reference to target building
	startPoint: null, // is the point where the Army will be created
	targetPoint: null, // the point where the amry is going to
	direction: null, // the direction in which the Army is going
    amount: 0, // amount of soldiers in this army
	upgradeLevel: null,
	units: null, // dictionary with all the different value sof the units inside
	
	// constructor function of Army needs two Vector2d the type of the Army and the owner of the amry
	init: function(startPoint, target, owner, units)
	{
		this.units = units;
		this.owner = owner;
        this.target = target;
		this.startPoint = startPoint;
		this.targetPoint = target.pos;
		// TODO: speed should be based on the slowest unit
		console.log(units.keys()[0]);
        this.speed = UnitConfig(units.keys()[0], 0, "speed");
		
		
		this.direction = this.getDirection(this.targetPoint, this.startPoint);
		this.direction.normalize();

		// var image_name = owner +_+ unittype +_+ unitlevel
		this.parent(startPoint.x, startPoint.y, me.loader.getImage(owner+"_"+units.keys()[0]+"_0"), 64);
		// TODO: changes 0 to the current level of the unit
		this.addAnimation("walk", [0,1,2,3], UnitConfig(units.keys()[0], 0, "animationSpeed"));
		this.setCurrentAnimation("walk");
		
	},
	
	update: function()
	{
		this.move();
		this.parent(Main.timer.dt);
        if (this.pos.distance(this.targetPoint) < this.collisionRadius) {
            this.reachedDestination();
        }
	},
	
	// returns a Vector2d with the direction to the selected building
	getDirection: function(targetPoint, startPoint)
	{
		var dirX = targetPoint.x - startPoint.x;
		var dirY = targetPoint.y - startPoint.y; 
		
		return new me.Vector2d(dirX, dirY);
	},
	
	// changes the position of the Army in the selected direction
	move: function()
	{
		// direction
		this.pos.add(new me.Vector2d(this.direction.x * this.speed *
                                                     Main.timer.dt * 0.01,
                                     this.direction.y * this.speed *
                                                     Main.timer.dt * 0.01));
	},
	
	// removes the Army if it reaches its destination point
	reachedDestination: function()
	{
        this.target.arrivingArmy(this.owner, this.units);
        me.game.remove(this);
	}
});
