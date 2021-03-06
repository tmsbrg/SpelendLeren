// Copyright 2014, Thomas van der Berg & Patrick Malissa
//
// This source code is distributed under the terms of the
// GNU General Public License v3 (see GPLv3.txt)

/* Building: a building in the level, sends armies and can be attacked and
   taken over */
Main.Building = Main.Button.extend(
{
    units: null, // dictionary containing units
    name: null, // string containing name from tiled
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
    enemySelected: false, // when an enemy_building_selection building is
                          // selected
    id: -1, // the id for this building
    selectedImage: null, // contains image object that is drawn when the
                         // building is selected
    enemy_selectedImage: null,    // contains image object that is drawn ifthe 
                                //player selects an building which is not his his
    imageObject: null, // reference to the image object
    active: true, // whether this building is creating units
    unitGUI: null, // dictionary containing the GUI for units
    unitTypesPresent: 0, // amount of unit types in this building
    triggers: null, // array of triggers with callbacks
    
    line: null, // reference to line object
    halfsize: null, // the halfsize of the width from the building size
    centerPos: null, // the centerPos position of the building
    doorLocation: null, // the position of the visible doorLocation of the building
    
    init: function(x, y, type, owner, id, capacity, name, spawnResidentTime)
    {
        this.type = type;
        this.owner = owner;
        
        this.doorLocation = GetBuildingDoorLocation(type);
        
        if(spawnResidentTime != null)
            this.spawnResidentTime = spawnResidentTime;
        else
            this.spawnResidentTime = GetBuildingSpawnTime(this.type);
        
        this.imageObject = new Main.Image(0, 0, this.getImage());
        
        
        this.id = id;

        this.triggers = [];

        if (capacity == null) {
            // TODO: Put capacity in a setting for buildings
            capacity = (this.owner === "neutral") ? 5 : 20;
        }
        this.unitType = UnitForBuilding(type);
        this.selectedImage = me.loader.getImage("building_selection");
        this.enemy_selectedImage =
                                me.loader.getImage("enemy_building_selection");

        var gui = new Main.GUIContainer(x, y, [this.imageObject]);

        this.parent(gui, this.onClick.bind(this), this.onHover.bind(this));
        
        this.size = GetBuildingSize(this.type);
        this.halfsize = new me.Vector2d(this.size.x * 0.5, this.size.y * 0.5);
        this.centerPos = new me.Vector2d(this.pos.x + this.halfsize.x,
                                         this.pos.y + this.halfsize.y);
        
        this.units = new Main.Dictionary();
        this.unitGUI = new Main.Dictionary();
        this.setCapacity(capacity, this.unitType, this.level);
        
        this.checkActive();
        this.name = (name != null) ? name : "";
    },
    

    // returns number of units in this building
    currentCapacity: function()
    {
        return this.unitAmount(this.units);
    },
    
    addUnitUI: function(type)
    {
        var xpos = 12 + 55 * this.unitTypesPresent;
        if (this.unitGUI.getValue(type) == null) {
            
            var icon = new Main.Image(xpos, -35, type+"_icon", 20, 20);
            
            var textObject = new Main.TextObject(xpos + 3, -10, "",
                                                 Main.font);
            this.unitGUI.setValue(type, [icon, textObject]);
            
            this.displayObject.addGUIObjects([icon, textObject]);

            this.unitTypesPresent++;
        }
    },

    // add a unknown unit to the dictionary
    addUnitType: function(type) 
    {
        if (this.units.getValue(type) == null) {
            this.units.setValue(type, new Array(Constants.upgradeLevels));
            
            for(var i = 0; i < this.units.getValue(type).length; i++)
            {
                this.units.getValue(type)[i] = 0;
            }
            this.updateUnitTexts(type);
        }
    },

    removeUnitType: function(type) {
        if (this.units.getValue(type) != null) {
            this.units.removeKey(type);
            this.updateUnitTexts(type);
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
                if (!this.checkTrigger("createres")) return;
                this.changeCapacity(this.growthRate, this.unitType, this.level);
                
                if(this.owner == "user")
                    Main.levelScreen.addScore(this.unitType, "spawned", this.growthRate);
                
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
        if(this.enemySelected){
            ctx.drawImage(this.enemy_selectedImage, this.pos.x, this.pos.y,
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
        
        this.unitGUI.getValue(type)[1].setText(amount);
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
        this.unitTypesPresent = 0;

        this.unitGUI = new Main.Dictionary();

        keys = this.units.keys();
        keys.sort(CompareUnits);
        for (i=0; i<keys.length; i++)
        {
            this.addUnitUI(keys[i]);
            this.unitGUI.getValue(keys[i])[1].setText(
                                               this.units.getValue(keys[i])[0]);
        }
    },
    
    // attacks a target
    attack: function(target)
    {
        
        if (!this.checkTrigger("sendunitsfrom", target.name)) return;
        var armyDictionary = new Main.Dictionary();
        var keys = this.units.keys();
        
        for(var i = 0; i < keys.length; i++)
        {
            armyDictionary.setValue(keys[i],
                                    new Array(Constants.upgradeLevels));

            if(this.currentCapacity() > 0) {
            
                var armyDictionary = new Main.Dictionary();
                var keys = this.units.keys();

                for(var i = 0; i < keys.length; i++)
                {
                    // skip empty arrays, so it doesn't send "0" units of own
                    // type
                    if (this.unitsOfType(keys[i]) == 0) continue;

                    armyDictionary.setValue(keys[i],
                                            new Array(Constants.upgradeLevels));
                    
                    this.addingUnitsToArmy(armyDictionary, keys[i]);
                    if (keys[i] != this.unitType &&
                        this.unitsOfType(keys[i]) == 0) {
                        this.removeUnitType(keys[i]);
                    }
                }
                
                var player = Main.levelScreen.getPlayer(this.owner);

                var doorLocation =
                    new me.Vector2d(this.pos.x + this.doorLocation.x,
                                    this.pos.y + this.doorLocation.y);

                player.addArmy(new Main.Army(doorLocation, target,
                                             this.owner, armyDictionary));    
            }
        }
    },
    
    // Adds units to given units dictionary and removes them from the building
    addingUnitsToArmy: function (dictionary, key)
    {
        for(var j = 0; j < this.units.getValue(key).length; j++)
        {
            var amount = 0;
            
            if ( key != "monk" ) {
                amount = Math.ceil(this.units.getValue(key)[j] * 0.5);
                
            } else {
                amount = (this.units.getValue(key)[j] > 0) ? 1 : 0;
            }
                
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
    arrivingArmy: function(owner, units, buffLevel)
    {
        if (owner === this.owner) {
            this.support(units);
        } else {
            this.defend(owner, units, buffLevel);
        }
    },
    
    // fights with the arriving Army if they losethe building changes from owner
    defend: function(owner, units, buffLevel)
    {
        var img_size = 128;
        var effect = new Main.Effect(this.pos.x + (this.size.x - img_size) / 2,
                                     this.pos.y + (this.size.y - img_size) / 2);
        Main.levelScreen.add(effect);

        var battleResult = this.fight(owner, units, buffLevel);
        
        if (battleResult < 0) {
            this.setUnits(units);
            this.takeOver(owner);
            this.deselect();
        } else {
            this.updateUnitTexts();
        }
        this.addUnitType(this.unitType);
    },
    
    // the amount of the arriving Army getSelection added to the curretn 
    // capacity of the building
    support: function(units)
    {
        if (!this.checkTrigger("support")) return;
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
    fight: function(owner, units, buffLevel)
    {
        
        me.audio.play("fight");
        var attackPower = this.calculateAttackPower(units, buffLevel);
        var defensePower = this.calculateDefencePower();
        
        var result = defensePower - attackPower;
        // TODO: needs to be checked by Thomas
        if (result >= 0) {
            if (this.owner == "user") {
                this.killUnits(owner, this.units, defensePower, result, "lost");
                this.killUnits(owner, units, 1, 0, "killed");
            } else {
                this.killUnits(owner, this.units, defensePower, result, "killed");
                this.killUnits(owner, units, 1, 0, "lost");
            }
            
        } else {
            // attck: comp1 : defend user
            if (this.owner == "user") {
                this.killUnits(owner, units, attackPower, -result, "killed");
                this.killUnits(owner, this.units, 1, 0, "lost");
            } else {
                this.killUnits(owner, units, attackPower, -result, "lost");
                this.killUnits(owner, this.units, 1, 0, "killed");
            }
        }
        return result;
    },

    // returns the power of all units in the army combined,
    // attackOrDefense is a string which can be either "attack" or "defense"
    // and determines whether the units are defending or attacking
    calculatePower: function(units, buffLevel, attackOrDefense)
    {
        units = (units != null) ? units : this.units;
        buffLevel = (buffLevel != null) ? buffLevel : this.getBuffLevel();

        var power = 0;
        var keys = units.keys();
        for (var i=0; i<keys.length; i++)
        {
            for (var j=0; j < Constants.upgradeLevels; j++)
            {
                power += UnitConfig(keys[i], j, attackOrDefense) *
                         units.getValue(keys[i])[j];
            }
        }
        return power * buffLevel;
    },

    calculateAttackPower: function(units, buffLevel)
    {
        return this.calculatePower(units, buffLevel, "attack");
    },

    calculateDefencePower: function(units, buffLevel)
    {
        return this.calculatePower(units, buffLevel, "defense");
    },
    
    // removes units from the given units dictionary based on its original
    // power and its power after the battle
    killUnits: function(owner, units, originalPower, finalPower, battleOutcome)
    {
        var ratio = finalPower / originalPower;
        
        var keys = units.keys();
        for (var i=0; i<keys.length; i++)
        {
            array = units.getValue(keys[i]);
            for (var j = 0; j < Constants.upgradeLevels; j++)
            {
                var oldstrength = array[j];
                var newstrength = Math.ceil(array[j] * ratio);
                array[j] = Math.ceil(array[j] * ratio);
                
                var killedunits = oldstrength - newstrength;
                if (killedunits > 0) {
                    if (this.owner == "user" || owner == "user") {
                        Main.levelScreen.addScore(keys[i], battleOutcome, killedunits);
                    }
                }    
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

    // returns the buff level of this building
    getBuffLevel: function()
    {
        var keys = this.units.keys();
        var buffLevel = 1.0;
        for (var i=0; i<keys.length; i++)
        {
            for (var j=0; j<Constants.upgradeLevels; j++)
            {
                if (this.units.getValue(keys[i])[j] > 0) {
                    var buff = UnitConfig(keys[i], j, "buffLevel") || 1.0;
                    buffLevel = Math.max(buffLevel, buff);
                }
            }
        }
        return buffLevel;
    },

    // changes ownership of building to given new owner
    takeOver: function(owner)
    {
        if (!this.checkTrigger("takeover", owner)) return;
        var oldOwner = Main.levelScreen.getPlayer(this.owner);
        var newOwner = Main.levelScreen.getPlayer(owner);
        this.owner = owner;
        
        oldOwner.loseBuilding(this);
        newOwner.gainBuilding(this);
        if (this.selected) {
            this.selected = false;
        }
        this.imageObject.loadImage(this.getImage());
        this.checkActive();
    },

    // adds a trigger to the list of triggers and adds the callback function to
    // call when triggered, and an extra arg // trigger for it to actually
    // trigger
    // example: building.addTrigger("takeover", this.actionComplete.bind(this),
    //                              "user");
    addTrigger: function(trigger, callback, checkarg, cbarg)
    {
        this.triggers.push({
            name: trigger, // name of the trigger, e.g. "select"
            callback: callback, // function to call when complete
            checkarg: checkarg, // argument that has to be corrent when
                                 // checking the trigger, leave null for
                                 // anything to be correct
            cbarg: cbarg, // argument to send to the callback function
        });
    },

    // checks triggers for given building and returns whether the given action
    // can be performed or not
    checkTrigger: function(trigger, arg)
    {
        // TODO: we shouldn't depend on Main.levelScreen, use something else
        // instead
        if (!Main.levelScreen.actionAllowed(this, trigger, arg)) return false;

        for (var i=0; i<this.triggers.length; i++)
        {
            if (this.triggers[i].name === trigger && 
                (this.triggers[i].checkarg == null ||
                    arg === this.triggers[i].checkarg)){
                this.triggers[i].callback(this.triggers[i].cbarg);
                this.triggers.splice(i, 1);
                i--; // H4XX!!
            }
        }
        return true;
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
        if (!this.checkTrigger("select")) return;
        this.selected = true;
        this.drawArrow();
    },
    
    enemySelect: function()
    {
        this.enemySelected = true;
    },

    enemyDeselect: function()
    {
        this.enemySelected = false;
    },

    // turns selected to false
    deselect: function()
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
        if(me.input.isKeyPressed("mouseleft")) {
            if (this.owner === "user") {
                if (!this.selected) {
                    this.select();
                }
            } else if (!this.enemySelected) {
                this.enemySelect();
            }
        }
    },

    onHoverOut: function()
    {
        this.enemyDeselect();
    },
});
