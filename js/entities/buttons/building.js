/* Building: a building in the level, sends armies and can be attacked and
   taken over */
Main.Building = Main.Button.extend(
{
	units: null,
	maxCapacity: 20, // the maximum capacity of the building
    spawnResidentTime: 3000, // miliseconds between spawning new soldiers
	growthRate: 1, // how fast the building's population grows
	timeSinceLastSpawn: 0, // timer since the last resident spawned
	maxLevel: Constants.upgradeLevels, // value of the the current maxium level
                                       // a building can have
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
    active: true, // whether this building is creating units
	unitGUI: null, // dictionary containing the GUI for units
	line: null, // reference to line object
	halfsize: null, // the halfsize of the width from the building size
	centerPos: null, // the centerPos position of the building
	
	init: function(x, y, type, owner, id, capacity, spawnResidentTime)
	{
		
		this.x = x;
		this
		this.type = type;
        this.owner = owner;
        this.size = GetBuildingSize(type);
		
		
		if(spawnResidentTime != null)
			this.spawnResidentTime = spawnResidentTime;
		else
			this.spawnResidentTime = GetBuildingSpawnTime(this.type);
		
        this.imageObject = new Main.Image(0, 0, this.getImage(), this.size,
                                          this.size);
										  
		
        this.id = id;

        if (capacity == null) {
            // TODO: Put capacity in a setting for buildings
            capacity = (this.owner === "neutral") ? 5 : 20;
        }
		this.unitType = UnitForBuilding(type);
        this.selectedImage = me.loader.getImage("building_selection");

        var gui = new Main.GUIContainer(x, y, [this.imageObject]);

        this.parent(gui, this.onClick.bind(this), this.onHover.bind(this));
		
		this.halfsize = this.size * 0.5;
		this.centerPos = new me.Vector2d(this.pos.x + this.halfsize , this.pos.y + this.halfsize);
		
        this.units = new Main.Dictionary();
        this.unitGUI = new Main.Dictionary();
        this.setCapacity(capacity, this.unitType, this.level);
		
        this.checkActive();
	},
	

    // returns number of units in this building
    currentCapacity: function()
    {
		return this.unitAmount(this.units);
    },
	
	addUnitUI: function(type)
	{
        // temporary way of doing the position, this should really be dynamic
        var xpos;
        switch (type)
        {
            case "farmer":
                xpos = 12;
                break;
            case "knight":
                xpos = 57;
                break;
            case "monk":
                xpos = 102;
                break;
        }
        if (this.unitGUI.getValue(type) == null) {
            
            var icon = new Main.Image(xpos, -30, type+"_icon", 16, 16);
            
            var textObject = new Main.TextObject(xpos + 3, -10, "",
                                                 Main.font);
            this.unitGUI.setValue(type, [icon, textObject]);
            
            this.displayObject.addGUIObjects([icon, textObject]);
		}
	},

	// add a unknown unit to the dictionary
	addUnitType: function(type) 
	{
		if (this.units.getValue(type) == null) {
			this.addUnitUI(type);
			this.units.setValue(type, new Array(Constants.upgradeLevels));
			
			for(var i = 0; i < this.units.getValue(type).length; i++)
			{
				this.units.getValue(type)[i] = 0;
			}
		}
	},

    removeUnitType: function(type) {
        if (this.units.getValue(type) != null) {
            this.displayObject.removeGUIObjects(this.unitGUI.getValue(type));
            this.unitGUI.removeKey(type);
            this.units.removeKey(type);
        }
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
	
	// creates new residents based on the growthRate rate and the
    // maximum capacity
	createResident: function()
	{
		if (this.units.getValue(this.unitType)[this.level] < this.maxCapacity) {
			this.timeSinceLastSpawn += Main.timer.dt; // * Main.timer.dt;
			
			if(this.timeSinceLastSpawn > this.spawnResidentTime) {
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
        this.addUnitType(type);
		this.setCapacity(this.units.getValue(type)[upgradeLevel] + amount, type,
                         upgradeLevel);
	},
	
	// sets the value of the currentCapacity
	setCapacity: function(amount, type, upgradeLevel)
	{
		this.addUnitType(type);
        if (amount < 0) {
            amount = 0;
        }
		this.units.getValue(type)[upgradeLevel] = amount;
		var textObjects = this.getTextObjects();
		var unitArray = this.units.values();
		
		for(var i = 0; i < textObjects.length; i++)
		{
            textObjects[i].setText(unitArray[i][upgradeLevel]);
		}
		
	},

    // returns array of current text objects in the UnitGUI
    getTextObjects: function()
    {
        var values = this.unitGUI.values();
        var r = [];
		for(var i = 0; i < values.length; i++)
		{
			r[i] = values[i][1];
		}
        return r;
    },

    // sets units to given unit dictionary
    setUnits: function(units)
    {
        this.units = units;
        this.updateUnitTexts();
    },

    // updates unit texts in the building's GUI
    updateUnitTexts: function()
    {
        var values = this.unitGUI.values();
        for (var i=0; i<values.length; i++)
        {
            this.displayObject.removeGUIObjects(values[i]);
        }

        this.unitGUI = new Main.Dictionary();

        keys = this.units.keys();
        for (i=0; i<keys.length; i++)
        {
            this.addUnitUI(keys[i]);
            // TODO, it should print units of different types
            this.unitGUI.getValue(keys[i])[1].setText(
                                               this.units.getValue(keys[i])[0]);
        }
    },
	
    // attacks a target
	attack: function(target)
	{
		if(this.currentCapacity() > 0) {
			
			var armyDictionary = new Main.Dictionary();
			var keys = this.units.keys();
			for(var i = 0; i < keys.length; i++)
			{
				armyDictionary.setValue(keys[i], new Array(Constants.upgradeLevels));
				
				this.addingUnitsToArmy(armyDictionary, keys[i]);
				if (keys[i] != this.unitType && this.unitsOfType(keys[i]) == 0) {
					this.removeUnitType(keys[i]);
				}
			}
			
			me.game.add(new Main.Army(this.centerPos, target, this.owner, armyDictionary),
						20);	
			
			this.unselect();
		} else {
			this.unselect();
		}
	},
	
	// Adds units to given units dictionary and removes them from the building
	addingUnitsToArmy: function (dictionary, key)
	{
		for(var j = 0; j < this.units.getValue(key).length; j++)
		{
			var amount = 0;
			if(key == "knight" || key == "farmer")
				amount = Math.ceil(this.units.getValue(key)[j] * 0.5);
			else
				amount = (this.units.getValue(key)[j] > 0) ? 1 : 0;
				
			dictionary.getValue(key)[j] = amount;
			if(amount !== 0)
				this.changeCapacity(-amount, key, j);
		}
	},

    // returns amount of units of given type
    unitsOfType: function(type) {
        var units = this.units.getValue(type);
        if (units == null) {
            return 0;
        }
        var r = 0;
		for(var i = 0; i < units.length; i++)
		{
            r += units[i];
        }
        return r;
    },

    // depending of the arriving armies owner the Army either 
	// attack or supports this building
	arrivingArmy: function(owner, units)
	{
		if (owner === this.owner) {
			this.support(units);
		} else {
			this.defend(owner, units);
		}
	},
	
	// fights with the arriving Army if they losethe building changes from owner
	defend: function(owner, units)
	{
        // temporary hack to get it in the right place
        var img_size = 128;
        me.game.add(new Main.Effect(this.pos.x + (this.size - img_size)/2,
                                    this.pos.y + (this.size - img_size)/2),
                    100);

		var battleResult = this.fight(owner, units);

		if (battleResult < 0) {
            this.setUnits(units);
			this.takeOver(owner);
			this.unselect();
		} else {
            this.updateUnitTexts();
        }
        this.addUnitType(this.unitType);
	},
	
	// the amount of the arriving Army getSelection added to the curretn 
	// capacity of the building
	support: function(units)
	{
        var keys = units.keys();
        for (var i=0; i<keys.length; i++)
        {
            var array = units.getValue(keys[i]);
            for (var j=0; j < Constants.upgradeLevels; j++)
            {
                if (array[j] > 0) {
                    this.changeCapacity(array[j], keys[i], j);
                }
            }
        }
	},

    // Maybe fight should be in army? It's an army thing, building is full
    // enough, and it will have to move there if we want armies to fight outside
    // of buildings

    // returns the result of a battle between the garrison and the given
    // attacking army
    fight: function(owner, units)
    {
        var attackPower = this.calculatePower(owner, units, "attack");
        var defensePower = this.calculatePower(this.owner, this.units,
                                               "defense");
		
        var result = defensePower - attackPower;

        // TODO: Really, units dictionary should just have an "owner" part,
        // if that's done, we can just return a new dictionary instead of
        // changing the given units object
        if (result >= 0) {
            this.killUnits(this.units, defensePower, result);
        } else {
            this.killUnits(units, attackPower, -result);
        }

        return result;
    },

    // returns the power of all units in the army combined,
    // attackOrDefense is a string which can be either "attack" or "defense"
    // and determines whether the units are defending or attacking
    calculatePower: function(owner, units, attackOrDefense)
    {
        var power = 0;
        var keys = units.keys();
        for (var i=0; i<keys.length; i++)
        {
            for (var j=0; j<Constants.upgradeLevels; j++)
            {
                power += UnitConfig(keys[i], j, attackOrDefense) *
                         units.getValue(keys[i])[j];
            }
        }
        return power;
    },
    
    // removes units from the given units dictionary based on its original
    // power and its power after the battle
    killUnits: function(units, originalPower, finalPower)
    {
        var ratio = finalPower / originalPower;
        var keys = units.keys();
        for (var i=0; i<keys.length; i++)
        {
            array = units.getValue(keys[i]);
            for (var j=0; j<Constants.upgradeLevels; j++)
            {
                array[j] = Math.ceil(array[j] * ratio);
            }
        }
    },

    // returns the composition of all units in the given units dictionary,
    // basically normalizing it
    calculateComposition: function(units)
    {
        var keys = units.keys();
        var normalized = new Main.Dictionary();
        var length = this.unitAmount(units);
        for (var i=0; i<keys.length; i++)
        {
            var array = new Array(Constants.upgradeLevels);
            for (var j=0; j<Constants.upgradeLevels; j++)
            {
                array[j] = units.getValue(keys[i])[j] / length;
            }
            normalized.setValue(keys[i], array);
        }
        return normalized;
    },

    // returns total amount of units in the given units dictionary
    unitAmount: function(units)
    {
        var keys = units.keys();
        var amount = 0;
        for (var i=0; i<keys.length; i++)
        {
            for (var j=0; j<Constants.upgradeLevels; j++)
            {
                amount += units.getValue(keys[i])[j];
            }
        }
        return amount;
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
		this.drawArrow();
	},

    // turns selected to false
	unselect: function()
	{
		this.selected = false;
		if(this.line != null)
		{
			me.game.remove(this.line);
			this.line = null;
		}
	},
	
	drawArrow: function()
	{
		
		this.line = new Main.Line(this.centerPos, me.input.mouse.pos);
		me.game.add(this.line, 5);
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
