/* Building: a building in the level, sends armies and can be attacked and
   taken over */
Main.Building = Main.Button.extend(
{
	maxCapacity: 20, // the maximum capacity of the building
    spawnResidentTime: 3000, // miliseconds between spawning new soldiers
	growthRate: 1, // how fast the building's population grows
	timeSinceLastSpawn: 0, // timer since the last resident spawned
	level: 0, // contains upgrade level information
    type: "", // type of building
    unitType: "", // type of unit this building creates
	owner: "neutral", // contains owner information
	flag: null, // contains image object for the flag
	currentCapacity: 20, // capacity of this building
	selected: false, // whether this building is selected
    id: -1, // the id for this building
    selectedImage: null, // contains image object that is drawn when the
                         // building is selected
    imageObject: null, // reference to the image object
    textObject: null, // reference to the text object
    active: true, // whether this building is creating units
	
	init: function(x, y, type, owner, id, capacity)
	{
        this.type = type;
        this.owner = owner;
        this.imageObject = new Main.Image(0, 0, this.getImage(), 64, 64);
        this.id = id;
        if (capacity != null) {
            this.currentCapacity = capacity;
        } else {
            // TODO: Put capacity in a setting for buildings
            this.currentCapacity = (this.owner === "neutral") ? 5 : 20;
        }
        this.selectedImage = me.loader.getImage("building_selection");
        this.textObject = new Main.TextObject(12, -10, "", Main.font);
        var gui = new Main.GUIContainer(x, y, [this.imageObject,
                                               this.textObject]);
        this.parent(gui, this.onClick.bind(this), this.onHover.bind(this));
        this.unitType = Main.UnitConfig.unitForBuilding[type];

        this.setCapacity(this.currentCapacity);
        this.checkActive();
	},

    // returns image string for this building
    getImage: function()
    {
        return this.owner+"_"+this.type;
    },
	
	update: function()
	{
        if (this.active) {
            this.createResident();
        }
		return this.parent();
	},
	
	// creates new residents based on the growthRate rate and the maximum capacity
	createResident: function()
	{
		if( this.currentCapacity < this.maxCapacity){
			this.timeSinceLastSpawn += Main.timer.dt ; // * Main.timer.dt;
			
			if(this.timeSinceLastSpawn > this.spawnResidentTime ){
				this.changeCapacity(this.growthRate);
				this.timeSinceLastSpawn = 0;
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
		this.textObject.setText(this.currentCapacity+"/"+this.maxCapacity);
	},
	
    // attacks a target
	attack: function(target)
	{
		var amount = Math.ceil(this.currentCapacity * 0.5);
		if(amount !== 0){
			
			this.changeCapacity(-amount);
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
			this.defend(owner, type, amount);
		};
	},
	
	// fights with the arriving Army if they losethe building changes from owner
	defend: function(owner, type, amount)
	{
        me.game.add(new Main.Effect(this.pos.x - this.width/2,
                                    this.pos.y - this.height/2),
                    100);
		// TODO: add actually battleResult system;
		var battleResult = this.fight(owner, type, amount);

		if(battleResult < 0){
            battleResult *= -1;
			this.takeOver(owner);
		}
		this.setCapacity(battleResult);
	},
	
	// the amount of the arriving Army getSelection added to the curretn 
	// capacity of the building
	support: function(amount)
	{
		this.changeCapacity(amount);
	},

    // returns the result of a battle between the garrison and the given
    // attacking army
    fight: function(owner, type, amount)
    {
        var attackPower = amount * Main.UnitConfig[type][0].attack;
        var defensePower = this.currentCapacity *
                           Main.UnitConfig[this.unitType][0].defense;

        var result = defensePower - attackPower;
        if (result > 0) {
            return Math.ceil(result /
                             Main.UnitConfig[this.unitType][0].defense);
        } else {
            return Math.ceil(result / Main.UnitConfig[type][0].attack);
        }
    },

    // changes ownership of building to given new owner
    takeOver: function(owner)
    {
        var oldOwner = Main.levelScreen.getComp(this.owner);
        var newOwner = Main.levelScreen.getComp(owner);
        this.owner = owner;
        if (oldOwner) {
            oldOwner.loseBuilding(this);
        }
        if (newOwner) {
            newOwner.gainBuilding(this);
        }
        if (this.selected) {
            this.selected = false;
        }
        this.imageObject.loadImage(this.getImage());
        this.checkActive();
    },

    // sets whether this building is growing units based on whether it is
    // neutral
    checkActive: function()
    {
        this.active = (this.owner === "neutral") ? false : true;
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
        Main.levelScreen.attack(this.id);
    },

    onHover: function(ev)
    {
        if (me.input.isKeyPressed("mouseleft") && this.owner == "user" &&
            !this.selected) {
            this.select();
        }
    },
});
