/* Building: a building in the level, sends armies and can be attacked and
   taken over */
Main.Building = Main.Button.extend(
{
	maxCapacity: 20, // the maximum capacity of the building
	growthRate: 1, // how fast the building's population grows
	timeSinceLastSpawn: 0, // timer since the last resident spawned
	level: 0, // contains upgrade level information
    type: "", // type of building
    //TODO: unitType should be taken from a building's game settings
    unitType: "farmer", // type of unit this building creates
	owner: Constants.players.neutral, // contains owner information
	flag: null, // contains image object for the flag
	currentCapacity: 17, // capacity of this building
	selected: false, // whether this building is selected
    id: -1, // the id for this building
    selectedImage: null, // contains image object that is drawn when the
                         // building is selected
	
	init: function(x, y, type, owner, id)
	{
        this.type = type;
        this.owner = owner;
        var img = new Main.Image(x, y,
                                 this.getImage(),
                                 64, 64);
        this.id = id;
        this.selectedImage = me.loader.getImage("building_selection");
        this.parent(img, this.onClick.bind(this), this.onHover.bind(this));
	},

    // returns image string for this building
    getImage: function() {
        return Constants.playerStrings[this.owner] + "_" + this.type;
    },
	
	update: function()
	{
        this.createResident();
		return this.parent();
	},
	
	// creates new residents based on the growthRate rate and the maximum capacity
	createResident: function()
	{
		var spawnResidentTime = 3000;
		if( this.currentCapacity < this.maxCapacity){
			this.timeSinceLastSpawn += Main.timer.dt ; // * Main.timer.dt;
			
			if(this.timeSinceLastSpawn > spawnResidentTime ){
				this.currentCapacity += this.growthRate;
				this.timeSinceLastSpawn = 0;
				//console.log(this.currentCapacity);
			}
		}
	},
	
	draw: function(ctx)
	{
        if (this.selected) {
            ctx.drawImage(this.selectedImage, this.pos.x, this.pos.y,
                          this.width, this.height);
        }
        this.parent(ctx);
	},
	
	// changes the amount of the capacity and draws it on the screen
	changeCapacity: function(amount)
	{
		this.setCapacity(this.currentCapacity + amount);
	},
	
	// sets the value of the currentCapacity
	setCapacity: function(amount)
	{
		this.currentCapacity = amount;
		// TODO: draw crurrentcapacity to the screen
	},
	
    // attacks a target
	attack: function(target)
	{
		
		var amount = Math.ceil(this.currentCapacity * 0.5);
		if(amount !== 0){
			
			this.changeCapacity(-amount);
			//console.log(this.currentCapacity);
			me.game.add(new Main.Army(this.pos, target, this.unitType,
									  this.owner, amount),
						20);	
		}
		this.unselect();
	},
	
    // depending of the arriving armies owner the Army either 
	// attack or supports this building
	arrivingArmy: function(owner, type, amount)
	{
		if(owner === this.owner){
			this.support(amount);
		}else{
			this.defend(owner, amount);
		};
	},
	
	// fights with the arriving Army if they losethe building changes from owner
	defend: function(owner, amount)
	{
		// T0Do: add actually battleResult system;
		console.log(amount);
		var battleResult = this.currentCapacity - amount;
		this.changeCapacity(-amount);
		console.log("attack")
		console.log(battleResult);
		if(battleResult < 0){
			
			this.setCapacity(battleResult * (-1));
			//this.changeCapacity(this.currentCapacity);
			this.takeOver(owner);
		}
	},
	
	// the amount of the arriving Army getSelection added to the curretn 
	// capacity of the building
	support: function(amount)
	{
		this.currentCapacity += amount;
			console.log("support")
	},

    // changes ownership of building to given new owner
    takeOver: function(owner)
    {
        this.owner = owner;
        this.displayObject.loadImage(this.getImage());
    },
	
    // turns selected to true
	select: function()
	{
		this.selected = true;
	},

    // turns selected to false
	unselect: function()
	{
		this.selected = false;
	},
	
	drawArrow: function()
	{
		//TODO
	},

    onClick: function(ev)
    {
        if (this.owner == Constants.players.user) {
            if (!this.selected) {
                this.select();
            } else {
                Main.levelScreen.attack(this.id);
            }
        } else {
            Main.levelScreen.attack(this.id);
        }
    },

    onHover: function(ev)
    {
    },
});
