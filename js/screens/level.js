/* LevelScreen: the main game screen, shows a level and the buildings on the
   level */
Main.LevelScreen = me.ScreenObject.extend(
{
    background: null, // ImageObject with the background image
    buildings: null, // array of building buttons 
    interface: null, // LevelInterface
    comps: null, // dictionary containing all computer players
    actions: null, // array of action objects containing what should happen
                   // at the start of the level
    waitingForTriggers: false, // whether the game is waiting for triggers to
                               // complete before continuing
    currentAction : 0, // keeps what trigger we're currently on

    // called when the level is started
    onResetEvent: function(levelname)
    {
        var level = me.loader.getTMX(levelname);
        if (level == null) {
            throw "Error: cannot find level: \""+levelname+"\"";
        }
        this.background = new Main.Image(0, 0, null,
                                         Constants.screenWidth,
                                         Constants.screenHeight);
        me.game.add(this.background, 0);


        this.tiles = new Array(1);
        this.actions = [];
        this.interpretLevel(level);
        this.createPlayers(this.buildings);
        this.setTriggers(this.actions);

		Main.timer = new Main.TimeObject();
		me.game.add(Main.timer);
        console.log("start of game");
    },

    interpretLevel: function(xml)
    {
        switch(xml.localName)
        {
            case "properties":
                if (xml.parentElement.localName == "map")
                this.interpretProperties(xml);
            case "tileset":
                this.tiles[Number(this.getAttribute(xml, "firstgid"))] = {
                    type : this.getAttribute(xml, "name")
                }
                break;
            case "imagelayer":
                var image = xml.firstElementChild;
                try {
                    this.background.loadImage(srcToImageName(
                                          this.getAttribute(image, "source")));
                } catch (e) {
                    alert(e);
                    throw (e);
                }
                break;
            case "objectgroup":
                this.buildings = this.createBuildings(xml);
                break;
        }
        for (var i=0; i<xml.childElementCount; i++)
        {
            this.interpretLevel(xml.children[i]);
        }
    },

    // interprets the properties of given level properties object
    interpretProperties: function(xml)
    {
        for (var i=0; i<xml.childElementCount; i++)
        {
            var name = this.getAttribute(xml.children[i], "name")
            var value = this.getAttribute(xml.children[i], "value");
            switch (name)
            {
                case "victory":
                    this.setVictoryCondition(value)
                    break;
                case "difficulty":
                    this.setDifficulty(value)
                    break;
                default:
                    if (name != null && name[0] >= "0" && name[0] <= "9") {
                        this.interpretNumbered(name, value);
                    }
                    break;
            }
        }
    },

    // interprets a map property starting with a number, this means actions
    // and targets for the actions
    interpretNumbered: function(name, value)
    {
        var index = Number(name[0]) - 1;
        this.setMinimumLength(this.actions, index+1);
        if (this.actions[index] == undefined) {
            this.actions[index] = {};
        }
        var n = name.substr(1);
        if (n != "action" && n != "target" && n != "arg") {
            alert('"'+name+'" is not action or trigger. Spelling mistake?');
        } else {
            this.actions[index][n] = value;
        }
    },

    // sets the victory condition based on given value
    setVictoryCondition: function(value)
    {
        // TODO
    },

    // sets the AI difficulty based on given value
    setDifficulty: function(value)
    {
        // TODO
    },

    setTriggers: function(actions)
    {
        for (var i=0; i < actions.length; i++)
        {
            if (actions[i] == undefined) {
                continue;
            }
            var building = this.getBuilding(actions[i].target);
            if (building == null) {
                alert("Cannot find "+(i+1)+"target: "+actions[i].target+
                      " does not exist.");
            } else {
                building.addTrigger(actions[i].action,
                                    this.continueTrigger.bind(this));
            }
        }
        if (actions[0] != null) {
            this.waitForTriggers();
        }
    },

    // adds undefined to the end of given array until it has at least given
    // length
    setMinimumLength: function(array, length)
    {
        if (array.length < length) {
            array.length = length;
        }
    },

    // creates and returns an array of building objects based on the an xml
    // object layer
    createBuildings: function(xml, gid)
    {
        var r = [];
        for (var i=0; i < xml.childElementCount; i++)
        {
            var obj = xml.children[i];
            var gid = Number(this.getAttribute(obj, "gid"));
            var type = this.tiles[gid].type;
            var capacity = this.getProperty(obj, "capacity");
            var pos = this.getBuildingPos(obj, type);
            r[i] = new Main.Building(pos.x,
                                     pos.y,
                                     type,
                                     this.getAttribute(obj, "type") ?
                                        this.getAttribute(obj, "type") :
                                        "neutral",
                                     i,
                                     (capacity != null) ? Number(capacity) :
                                                          null,
                                    this.getAttribute(obj, "name"));
            me.game.add(r[i], 10);
        }
        return r;
    },

    getBuildingPos: function(obj, type)
    {
        var x = Number(this.getAttribute(obj, "x"));
        var y = Number(this.getAttribute(obj, "y")) - GetBuildingSize(type);
        return new me.Vector2d(x, y);
    },

    getProperty: function(obj, name)
    {
        var properties = obj.firstElementChild;
        if (properties != null) {
            for (var i=0; i < properties.childElementCount; i++)
            {
                if (this.getAttribute(properties.children[i], "name") === name){
                    return this.getAttribute(properties.children[i], "value");
                }
            }
        }
        return null;
    },

    getAttribute: function(xml, name)
    {
        r = xml.attributes.getNamedItem(name);
        return (r != null) ? r.value : null;
    },

    // creates the computer players and gives them information needed for the AI
    createPlayers: function(buildings)
    {
        compBuildings = {};
        for (var i=0; i < buildings.length; i++)
        {
            if (buildings[i].owner.substr(0, 4) === "comp") {
                if (compBuildings[buildings[i].owner] === undefined) {
                    compBuildings[buildings[i].owner] = [buildings[i]];
                } else {
                    compBuildings[buildings[i].owner].push(buildings[i]);
                }
            }
        }
        this.comps = new Main.Dictionary();
        for (var comp in compBuildings)
        {
            this.comps.setValue(comp, new Main.AI(comp, compBuildings[comp]));
            me.game.add(this.comps.getValue(comp));
        }
    },

    //TODO: this function should be part of player, but player doesn't exist yet
    attack: function(buildingId)
    {
        for (var i=0; i < this.buildings.length; i++)
        {
            if (this.buildings[i].selected) {
                this.buildings[i].attack(this.buildings[buildingId]);
            }
        }
    },

    // returns comp object for given comp string
    getComp: function(comp)
    {
        return this.comps.getValue(comp);
    },

    // returns array of buildings
    getBuildings: function()
    {
        return this.buildings;
    },

    // returns building with given name
    getBuilding: function(name)
    {
        for (var i=0; i < this.buildings.length; i++)
        {
            if (this.buildings[i].name == name) {
                return this.buildings[i];
            }
        }
        return null;
    },

    // makes the game wait until all the next triggers are completed and
    // disallows other actions while waiting
    waitForTriggers: function()
    {
        this.waitingForTriggers = true;
        this.disableAI();
    },

    // continues the game, should be used as a callback by a building's trigger
    continueTrigger: function()
    {
        this.currentAction++;

        if (this.actions[this.currentAction] == undefined) {
            this.waitingForTriggers = false;
            this.enableAI();
        }
    },

    // disables all AIs in the level
    disableAI: function()
    {
        var keys = this.comps.keys();
        for (var i=0; i<keys.length; i++)
        {
            this.comps.getValue(keys[i]).disable();
        }
    },

    // enables all AIs in the level
    enableAI: function()
    {
        var keys = this.comps.keys();
        for (var i=0; i<keys.length; i++)
        {
            this.comps.getValue(keys[i]).enable();
        }
    },

    // returns whether given action is allowed for given building
    actionAllowed: function(building, action, arg)
    {
        var currentAction = this.actions[this.currentAction];
        return (!this.waitingForTriggers ||
            (building.name == currentAction.target &&
            (currentAction.arg == null || arg == currentAction.arg) &&
            action == currentAction.action) ||
            this.allowedActions(building, action, arg, currentAction))
    },

    // returns tre if given action with given info is allowed by the 
    // action we are currently waiting for
    allowedActions: function(building, action, arg, currentAction)
    {
        switch(currentAction.action)
        {
            case "takeover":
            case "support":
                return arg == currentAction.target || action == "select";
            default:
                return (action == "createres" || action == "takeover" ||
                        action == "support");
        }
    }
});
