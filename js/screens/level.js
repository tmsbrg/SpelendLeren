/* LevelScreen: the main game screen, shows a level and the buildings on the
   level */
Main.LevelScreen = me.ScreenObject.extend(
{
    name: "", // string containing name of the level
    background: null, // ImageObject with the background image
    buildings: null, // array of building buttons 
    interface: null, // LevelInterface
    players: null, // dictionary containing all players
    actions: null, // array of action objects containing what should happen
                   // at the start of the level
    waitingForTriggers: false, // whether the game is waiting for triggers to
                               // complete before continuing
    currentAction: 0, // keeps what trigger we're currently on
    here: null,

    armies: null, // array of currently moving armies

    paused: false, // whether game is paused

    // called when the level is started
    onResetEvent: function(levelname)
    {
        levelname = String(levelname);
        this.name = levelname;
		var level = me.loader.getTMX(levelname);
        if (level == null) {
            throw "Error: cannot find level: \""+levelname+"\"";
        }
		me.audio.play(levelname, true);
		var img = new Main.Image(0, 0, "bg_01", Constants.screenWidth,
                                 Constants.screenHeight)
        this.background = new Main.Button(img, this.click.bind(this));
        me.game.add(this.background, 0);

        this.here = new Main.Bouncer(0, 0, 32, "here_icon", 32, 32, 0.5);

        // reinitialize for restart
        this.currentAction = 0; 
        this.paused = false;
        this.waitingForTriggers = false;


        this.tiles = new Array(1);
        this.actions = [];
        this.interpretLevel(level);
        this.createPlayers(this.buildings);
        this.setTriggers(this.actions);

		Main.timer = new Main.TimeObject();
		me.game.add(Main.timer);
    },
	
	click: function()
	{
		for(var i = 0 ; i < this.buildings.length; i++)
		{
			this.buildings[i].deselect();
		}
	},
	
    interpretLevel: function(xml)
    {
        switch(xml.localName)
        {
            case "properties":
                if (xml.parentElement.localName == "map")
                this.interpretProperties(xml);
                break;
            case "tileset":
                this.tiles[Number(this.getAttribute(xml, "firstgid"))] = {
                    type : this.getAttribute(xml, "name")
                }
                break;
            case "imagelayer":
                var image = xml.firstElementChild;
                try {
                    this.background.displayObject.loadImage(srcToImageName(
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
            this.createBuildingTriggers(r[i], obj);
            me.game.add(r[i], 10);
        }
        return r;
    },

    // creates building triggers for given building and corresponding xml object
    createBuildingTriggers: function(building, obj)
    {
        var properties = obj.firstElementChild;
        if (properties != null) {
            for (var i=0; i < properties.childElementCount; i++)
            {
                var name = this.getAttribute(properties.children[i], "name");
                var value = this.getAttribute(properties.children[i], "value");
                var nameparts = name.split("_");
                if (nameparts[0] == "trigger") {
                    var values;
                    values = this.getTriggerCallback(value);
                    if (values[0] != null) {
                        building.addTrigger(nameparts[1], values[0], null,
                                            values[1]);
                    } else {
                        alert("Don't know trigger command \""+value+
                              "\" for building: "+building.name);
                    }
                }
            }
        }
    },

    // returns the trigger callback and argument for given trigger value
    getTriggerCallback: function(value)
    {
        var args = value.split(" ");
        r = new Array(2);
        switch (args[0])
        {
            case "popup":
            r[0] = this.showPopup.bind(this);
            r[1] = args[1];
            break;
        }
        return r;
    },

    // returns given building's position
    getBuildingPos: function(obj, type)
    {
        var x = Number(this.getAttribute(obj, "x"));
        var y = Number(this.getAttribute(obj, "y")) - GetBuildingSize(type);
        return new me.Vector2d(x, y);
    },

    // returns property of xml element obj with name name, or null if inexistant
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

    // returns attribute of xml object with given name, or null of inexistant
    getAttribute: function(xml, name)
    {
        r = xml.attributes.getNamedItem(name);
        return (r != null) ? r.value : null;
    },

    // creates the puter players and gives them information needed for the AI
    createPlayers: function(buildings)
    {
        playerBuildings = {};
        for (var i=0; i < buildings.length; i++)
        {
            if (playerBuildings[buildings[i].owner] === undefined) {
                playerBuildings[buildings[i].owner] = [buildings[i]];
            } else {
                playerBuildings[buildings[i].owner].push(buildings[i]);
            }
        }
        this.players = new Main.Dictionary();
        for (var player in playerBuildings)
        {
            var ai = null;
            if (player.substr(0, 4) == "comp" ||
                (player == "user" && Constants.playerIsAI)) {
                ai = new Main.AI();
            }
            this.players.setValue(player,
                                  new Main.Player(player,
                                                  playerBuildings[player],
                                                  ai));
        }
    },

    //TODO: this function should be part of player, but player doesn't exist yet
    attack: function(buildingId) 
	{
		for (var i = 0; i < this.buildings.length; i++)
        {
            if (this.buildings[i].selected) {
                if(this.buildings[i].id != buildingId)
					this.buildings[i].attack(this.buildings[buildingId]);
            }
            if (this.buildings[i].enemySelected) {
                this.buildings[i].enemyDeselect();
            }
        }
    },

    // returns player with given name
    getPlayer: function(player)
    {
        return this.players.getValue(player);
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
        me.game.add(this.here, 20);
        this.setHereIcon(this.currentAction);
    },

    // continues the game, should be used as a callback by a building's trigger
    continueTrigger: function()
    {
        this.currentAction++;

        if (this.actions[this.currentAction] == undefined) {
            this.waitingForTriggers = false;
            this.enableAI();
            me.game.remove(this.here);
        } else {
            this.setHereIcon(this.currentAction);
        }
    },

    // sets the here icon's position to target building for current action
    setHereIcon: function(ca)
    {
        var building = this.getBuilding(this.actions[ca].target);
        this.here.setPos(building.centerPos.x, building.pos.y - 32);
    },

    // disables all AIs in the level
    disableAI: function()
    {
        var keys = this.players.keys();
        for (var i=0; i<keys.length; i++)
        {
            this.players.getValue(keys[i]).disableAI();
        }
    },

    // enables all AIs in the level
    enableAI: function()
    {
        var keys = this.players.keys();
        for (var i=0; i<keys.length; i++)
        {
            this.players.getValue(keys[i]).enableAI();
        }
    },

    // returns whether given action is allowed for given building
    actionAllowed: function(building, action, arg)
    {
        if (this.paused) return false;

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
    },

    // shows popup with given name
    showPopup: function(name)
    {
        me.game.add(new Main.PopupScreen(name, this.unPause.bind(this)), 200);
        this.pause();
    },

    endLevel: function(userWon)
    {
        // TODO: Need an endscreen, really
        me.audio.stop(this.name);
        this.pause();

        var endText = new Main.TextObject(460, 340, "", Main.font);
        var endButton = new Main.Button(new Main.Image(500, 400, "back_button",
                                                       90, 78),
                                function(){me.state.change(me.state.READY)});
        var rect = new Main.RectObject(300, 300, 400, 200);
        if (userWon) {
            endText.setText("YOU WIN!");
        } else {
            endText.setText("YOU LOSE");
        }
        me.game.add(endText, 100);
        me.game.add(endButton, 100);
        me.game.add(rect, 90);
    },

    closePopup: function()
    {
        this.unPause();
    },

    pause: function()
    {
        this.paused = true;
        Main.timer.pause();
    },

    unPause: function()
    {
        this.paused = false;
        Main.timer.unPause();
    },

});
