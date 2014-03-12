/*
* the Army will be created if one of the player in 
* a level attacks or support another building
*/
Army = Main.Image({
	
	speed: 10,
	type: null,
	owner: Constants.players.neutral,
	startPoint: null,
	targetPoint: null,
	direction: null;
	
	// constructor function of Army needs two Vector2D the type of the Army and the owner of the amry
	init: function(startPoint, targetPoint, type, owner)
	{
		this.type = type;
		this.owner = owner;
		this.startPoint = startPoint;
		this.targetPoint = targetPoint;
		
		this.loadImage(owner+"_"+type);
		
		this.direction = getDirection(targetPoint, startPoint);
		this.direction.normalize();
	},
	
	update: function()
	{
		this.move();
	},
	
	// returns a Vector2D with the direction to the selected building
	getDirection: function(targetPoint, startPoint)
	{
		var dirX = targetPoint.x - startPoint.x;
		var dirY = targetPoint.y - startPoint.y; 
		
		return new me.Vector2D(dirX, dirY);
	},
	
	// changes the position of the Army in the selected direction
	move: function()
	{
		// direction
		this.pos += this.direction * this.speed;
	},
	
	// removes the Army if it reaches its destination point
	reachedDestination: function()
	{
		if(this.pos.eqeuls(targetPoint)){
			me.game.remove(this);
		}
	}
});