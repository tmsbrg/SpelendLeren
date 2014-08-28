// Copyright 2014, Thomas van der Berg & Patrick Malissa
//
// This source code is distributed under the terms of the
// GNU General Public License v3 (see GPLv3.txt)

/*
    TODO: comment
*/
Main.Squad = me.AnimationSheet.extend(
{
    speed: 0, // the speed of the army
    collisionRadius: Constants.collisionRadius,
    type: null, // type of the army
    owner: "", // string containing owner of the squad
    target: null, // reference to target building
    startPoint: null, // is the point where the Army will be created
    targetPoint: null, // the point where the amry is going to
    direction: null, // the direction in which the Army is going
    halfUnitWidth: null,
    units: null,
    countText: null,
    textOffset: null,
    buffLevel: 1.0,
    
    init: function(startPoint, target, units, owner, speed, buffLevel)
    {
        this.units = units;
        this.owner = owner;
        this.target = target;
        this.buffLevel = (buffLevel != null) ? buffLevel : 1.0
        var keys = units.keys();
        var key = keys[0];
        this.halfUnitWidth = (GetUnitSize(keys[0]) * 0.5);
        
        this.startPoint = new me.Vector2d(startPoint.x - this.halfUnitWidth, startPoint.y - this.halfUnitWidth);
        
        /*var centerTargetX = target.pos.x + this.target.halfsize - this.halfUnitWidth;
        var centerTargetY = target.pos.y + this.target.halfsize - this.halfUnitWidth;
        */
        
        this.targetPoint = new me.Vector2d(target.pos.x + target.doorLocation.x - this.halfUnitWidth, target.pos.y + target.doorLocation.y - this.halfUnitWidth);
        
        this.speed = speed;
        
        this.direction = this.getDirection(this.targetPoint, this.startPoint);
        this.direction.normalize();
        
        var image = me.loader.getImage(owner+"_"+key+"_"+
                                this.getDirectionName(this.direction)+"_0");
        
        this.textOffset = new me.Vector2d(20, -15);
        this.countText = new Main.TextObject(this.startPoint.x + this.textOffset.x, this.startPoint.y - this.textOffset.y, units.getValue(key)[0], Main.font );
        me.game.add(this.countText, 60);
        
        this.parent(this.startPoint.x , this.startPoint.y, image, GetUnitSize(key));
        var length = image.width / GetUnitSize(key);
        var animationArray = getRange(length);
        this.addAnimation("walk", animationArray, UnitConfig(key, 0,
                          "animationSpeed"));
        this.setCurrentAnimation("walk");

        this.halo = new Main.Image(0, 0, "halo");
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
                                                     
        this.countText.pos = new me.Vector2d(this.pos.x, this.pos.y).add(this.textOffset);
    },
    
    // removes the Army if it reaches its destination point
    reachedDestination: function()
    {
        this.target.arrivingArmy(this.owner, this.units, this.buffLevel);
        me.game.remove(this.countText);
        me.game.remove(this);
        // temporary hack while we have to remember squads
        var player = Main.levelScreen.getPlayer(this.owner);
        player.removeArmy();
    },

    draw: function(ctx)
    {
        if (this.buffLevel > 1.0) {
            ctx.save();
            ctx.translate(this.pos.x, this.pos.y);
            this.halo.draw(ctx);
            ctx.restore();
        }
        this.parent(ctx);
    },
});
