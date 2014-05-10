/* LevelScreen: the main game screen, shows a level and the buildings on the
   level */
Main.LevelScreen = me.ScreenObject.extend(
{
    background: null, // ImageObject with the background image
    buildings: null, // array of building buttons 
    interface: null, // LevelInterface
    comps: null, // dictionary containing all computer players

    // called when the level is started
    onResetEvent: function(levelname)
    {
        var level = me.loader.getTMX(levelname);
        if (level == null) {
            console.log("Error: cannot find level: \""+levelname+"\"");
            return;
        }
        this.background = new Main.Image(0, 0, null,
                                         Constants.screenWidth,
                                         Constants.screenHeight);
        me.game.add(this.background, 0);

        this.tiles = new Array(1);
        this.interpretLevel(level);
        this.createPlayers(this.buildings);

		Main.timer = new Main.TimeObject();
		me.game.add(Main.timer);
        console.log("start of game");
    },

    interpretLevel: function(xml)
    {
        switch(xml.localName) {
            case "imagelayer":
                var image = xml.firstElementChild;
                this.background.loadImage(srcToImageName(
                                this.getAttribute(image, "source")));
                break;
            case "tileset":
                this.tiles[Number(this.getAttribute(xml, "firstgid"))] = {
                    type : this.getAttribute(xml, "name")
                }
                break;
            case "objectgroup":
                this.buildings = this.createBuildings(xml);
                break;
        }
        for (var i=0; i<xml.childElementCount; i++) {
            this.interpretLevel(xml.children[i]);
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
            r[i] = new Main.Building(Number(this.getAttribute(obj, "x")),
                                     Number(this.getAttribute(obj, "y")-64),
                                     this.tiles[gid].type,
                                     this.getAttribute(obj, "type") ?
                                        this.getAttribute(obj, "type") :
                                        "neutral",
                                     i,
                                     this.getProperty(obj, "capacity"));
            me.game.add(r[i], 10);
        }
        return r;
    },

    getProperty: function(obj, name)
    {
        var properties = obj.firstElementChild;
        if (properties != null) {
            console.log(properties.children);
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
        return xml.attributes.getNamedItem(name).value;
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
        this.comps = {};
        for (var comp in compBuildings)
        {
            this.comps[comp] = new Main.AI(comp, compBuildings[comp]);
            me.game.add(this.comps[comp]);
        }
    },

    //TODO: this function should be part of player, but player doesn't exist yet
    attack: function(buildingId) {
        for (var i=0; i < this.buildings.length; i++)
        {
            if (this.buildings[i].selected) {
                this.buildings[i].attack(this.buildings[buildingId]);
            }
        }
    },

    // returns comp object for given comp string
    getComp: function(comp) {
        return this.comps[comp];
    },

    // returns array of buildings
    getBuildings: function() {
        return this.buildings;
    },
});
