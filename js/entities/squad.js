/*
	TODO: comment
*/
Main.Squad = me.AnimationSheet.extend(
{
	speed: 0, // the speed of the army
	collisionRadius: 32, // radius for checking collision with target building
	type: null, // type of the army
	owner: "neutral", // contans who the owner of the Army is
    target: null, // reference to target building
	startPoint: null, // is the point where the Army will be created
	targetPoint: null, // the point where the amry is going to
	direction: null, // the direction in which the Army is going
	units: null,
	
	init: function(startPoint, target, units, owner, speed)
	{
		this.units = units;
		this.owner = owner;
		this.target = target;
		var keys = units.keys();
		
		var width = GetUnitSize(keys[0]);
		
		
		this.startPoint = new me.Vector2d(startPoint.x - ( width* 0.5), startPoint.y - (width * 0.5));
		this.targetPoint = /*new me.Vector2d(target.pos.x);*/target.pos;
		
		this.speed = speed;
		
		this.direction = this.getDirection(this.targetPoint, this.startPoint);
		this.direction.normalize();
		
		var key = keys[0];
		var image = me.loader.getImage(owner+"_"+key+"_"+this.getDirectionName(this.direction)+"_0");
		
		
		this.parent(this.startPoint.x , this.startPoint.y, image, 64);
		
		this.addAnimation("walk", [0,1,2,3], UnitConfig(key, 0,
                          "animationSpeed"));
		this.setCurrentAnimation("walk");
		//console.log(units);
	},
	
	
	
	// returns the name of the direction the suqad is curretnly moving in
	getDirectionName: function(dir)
	{
		if (dir.x >= 0 && dir.y >= 0) {
			return "downright";
		} else if (dir.x >= 0 && dir.y <= 0) {
			return "topright";
		} else if (dir.x <= 0 && dir.y <= 0) {
			return "topleft";
		} else if (dir.x <= 0 && dir.y >= 0) {
			return "downleft";
		}
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
	},
});