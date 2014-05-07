/* Building: a building in the level, sends armies and can be attacked and
   taken over */
Main.Building = Main.Button.extend(
{
	units:  new Array(),
	maxCapacity: 20, // the maximum capacity of the building
    spawnResidentTime: 3000, // miliseconds between spawning new soldiers
	growthRate: 1, // how fast the building's population grows
	timeSinceLastSpawn: 0, // timer since the last resident spawned
	maxLevel: 2, // value of the the current maxium level a building can have
	level: 0, // contains upgrade level information
    type: "", // type of building
    unitType: "", // type of unit this building creates
	owner: "neutral", // contains owner information
    size: 0, // contains size of building
	flag: null, // contains image object for the flag
	selected: false, // whether this building is selected
    id: -1, // the id for this building
    selectedImage: null, // contains image object that is drawn when the
                         // building is selected
    imageObject: null, // reference to the image object
	farmer_icon: null,
	icons: new Array,
    textObjects: new Array, // reference to the text object
    active: true, // whether this building is creating units
	unitCount: 0, // curretn count of the units who are curretnly in this building
	knight_icon: null,
	
	
	init: function(x, y, type, owner, id, capacity)
	{
        this.type = type;
        this.owner = owner;
        this.size = GetBuildingSize(type);
		
        this.imageObject = new Main.Image(0, 0, this.getImage(), this.size,
                                          this.size);
										  
		
        this.id = id;
        if(capacity == null)
		{
            // TODO: Put capacity in a setting for buildings
            capacity = (this.owner === "neutral") ? 5 : 20;
        }
		this.unitType = UnitForBuilding(type);
        this.selectedImage = me.loader.getImage("building_selection");
		
		this.icons.push(this.imageObject);
		
		
        var gui = new Main.GUIContainer(x, y, this.icons);
        this.parent(gui, this.onClick.bind(this), this.onHover.bind(this));
		
        this.setCapacity(capacity, this.unitType, this.level);
		
        this.checkActive();
	},
	
	currentCapacity: function()
	{
		var unitArray = this.values(this.units);
		var value = 0;
		
		for(var i = 0; i < unitArray.length; i++)
		{
			for(var j = 0; j < this.maxLevel; j++)
			{
				value += unitArray[i][j]
			}
		}
		return value;
	},
	
	addUnitUI: function(type)
	{
		switch(type)
		{
			case "farmer":
			{	
				
				if(this.farmer_icon == null)
				{
					
					this.unitCount ++;
					this.farmer_icon = new Main.Image(12, -30, "farmer_icon", 16, 16);
					
					var textObject = new Main.TextObject(14, -10, "", Main.font);
					this.textObjects[type] = textObject;
					
					this.displayObject.addGUIObjects([this.farmer_icon, textObject]);
				}
			}
			break;
			
			case "knight":
			{	
				if(this.knight_icon == null)
				{
					
					this.unitCount ++;
					this.knight_icon = new Main.Image(57, -30, "knight_icon", 16, 16);
					
					
					var textObject = new Main.TextObject( 49, -10, "", Main.font);
					this.textObjects[type] = textObject;
					
					this.displayObject.addGUIObjects([this.knight_icon, textObject]);
					
				}
			}
			break;
		}
	},
	// add a unknow unit to the dictionary
	addUnits: function(type, amount, upgradeLevel) 
	{
		if(this.units[type] == null)
		{
			this.addUnitUI(type);
			console.log("new unit type");
			this.units[type] = new Array(Constants.upgradeLevels);
			
			for(var i = 0; i < this.units[type].length; i++)
			{
				this.units[type][i] = 0;
			}
		}
		
		//this.units[type][upgradeLevel] += amount;
		
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
		
		if(this.units[this.unitType][this.level] < this.maxCapacity){
			this.timeSinceLastSpawn += Main.timer.dt ; // * Main.timer.dt;
			
			if(this.timeSinceLastSpawn > this.spawnResidentTime ){
				this.changeCapacity(this.growthRate, this.unitType, this.level);
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
	changeCapacity: function(amount, type, upgradeLevel)
	{
		
		this.setCapacity(this.units[type][upgradeLevel] + amount, type, upgradeLevel);
	},
	
	// sets the value of the currentCapacity
	setCapacity: function(amount, type, upgradeLevel)
	{
		//console.log(this.units);
		this.addUnits(type, amount, upgradeLevel);
		this.units[type][upgradeLevel] = amount;
		var dicArray = this.values(this.textObjects);
		var unitArray = this.values(this.units);
		
		for(var i = 0; i < dicArray.length; i++)
		{
			dicArray[i].setText(unitArray[i][upgradeLevel]);
		}
		
	},
	
	// returns the values of a dictionary as an array
	values: function (obj)
	{
		var values = [];

		for(var key in obj)
		{
			
			if(obj.hasOwnProperty(key))
			{
				values.push(obj[key]);
			}
		}

		return values;
	},
	// returns the keys of a dictionary as an array
	keys: function (obj)
	{
		var keys = [];

		for(var key in obj)
		{	
			if(obj.hasOwnProperty(key))
			{
				keys.push(key);
			}
		}
		return keys;
	},
	
    // attacks a target
	attack: function(target)
	{
		var amount = Math.ceil(this.units[this.unitType][this.level] * 0.5);
		if(amount !== 0){
			
			this.changeCapacity(-amount, this.unitType, this.level);
			
			me.game.add(new Main.Army(this.pos, target, this.unitType,
									  this.owner, amount, this.level),
						20);	
		}
		this.unselect();
	},
	
    // depending of the arriving armies owner the Army either 
	// attack or supports this building
	arrivingArmy: function(owner, type, amount, upgradeLevel)
	{
		if(owner === this.owner){
			this.support(amount, type, upgradeLevel);
		}else{
			this.defend(owner, type, amount, upgradeLevel);
		};
	},
	
	// fights with the arriving Army if they losethe building changes from owner
	defend: function(owner, type, amount, upgradeLevel)
	{
        // temporary hack to get it in the right place
        var img_size = 128;
        me.game.add(new Main.Effect(this.pos.x + (this.size - img_size)/2,
                                    this.pos.y + (this.size - img_size)/2),
                    100);
		// TODO: add actually battleResult system;
		var battleResult = this.fight(owner, type, amount);
		console.log(battleResult);
		if(battleResult < 0){
            battleResult *= -1;
			this.takeOver(owner);
		}
		// change for different units
		this.setCapacity(battleResult, type, upgradeLevel);
	},
	
	// the amount of the arriving Army getSelection added to the curretn 
	// capacity of the building
	support: function(amount, type, upgradeLevel)
	{
		// change for different units
		this.addUnits(type, amount, upgradeLevel);
		this.changeCapacity(amount, type, upgradeLevel);
	},

    // returns the result of a battle between the garrison and the given
    // attacking army
    fight: function(owner, type, amount)
    {
        var attackPower = amount * UnitConfig(type, 0, "attack");
        var defensePower = this.units[this.unitType][this.level] *
                           UnitConfig(this.unitType, 0, "defense");
		
        var result = defensePower - attackPower;
		
		console.log(attackPower, defensePower , result);
        if (result > 0) {
            return Math.ceil(result /
                             UnitConfig(this.unitType, 0, "defense"));
        } else {
            return Math.ceil(result / UnitConfig(type, 0, "attack"));
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
