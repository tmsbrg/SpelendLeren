/*
* the Army will be created if one of the player in 
* a level attacks or support another building
*/
Main.Army = Main.Image.extend(
{
	speed: 0, // the speed of the army
    collisionRadius: 1, // radius for checking collision with target building
	type: null, // type of the army
	owner: Constants.players.neutral, // contans who the owner of the Army is
    target: null, // reference to target building
	startPoint: null, // is the point where the Army will be created
	targetPoint: null, // the point where the amry is going to
	direction: null, // the direction in which the Army is going
    amount: 0, // amount of soldiers in this army
	
	// constructor function of Army needs two Vector2d the type of the Army and the owner of the amry
	init: function(startPoint, target, type, owner, amount)
	{
		this.type = type;
		this.owner = owner;
        this.target = target;
        this.amount = amount;
		this.startPoint = startPoint;
		this.targetPoint = target.pos;
        this.speed = Main.UnitConfig[type][0].speed;
		
		this.direction = this.getDirection(this.targetPoint, this.startPoint);
		this.direction.normalize();

        this.parent(startPoint.x, startPoint.y,
                    Constants.playerStrings[owner]+"_"+type, 64, 64);
	},
	
	update: function()
	{
		this.move();
        if (this.distanceFromTarget() < this.collisionRadius) {
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
        this.target.arrivingArmy(this.owner, this.type, this.amount);
        me.game.remove(this);
	},

    // returns the difference between the army and target
    distanceFromTarget: function() {
        return Math.sqrt((this.targetPoint.x - this.pos.x) *
                         (this.targetPoint.x - this.pos.x) +
                         (this.targetPoint.y - this.pos.y) *
                         (this.targetPoint.y - this.pos.y));
    }
});
