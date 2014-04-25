/* LevelScreen: the main game screen, shows a level and the buildings on the
   level */
Main.LevelScreen = me.ScreenObject.extend(
{
    background: null, // ImageObject with the background image
    buildings: null, // array of building buttons 
    interface: null, // LevelInterface
    comps: null, // dictionary containing all computer players

    // called when the level is started
    onResetEvent: function(level)
    {
        /*console.log("start of game");
        this.background = new Main.Image(0, 0, level.background,
                                         Constants.screenWidth,
                                         Constants.screenHeight);
        me.game.add(this.background, 0);

        this.buildings = this.createBuildings(level.buildings);
        this.createPlayers(this.buildings);
		Main.timer = new Main.TimeObject();
		me.game.add(Main.timer); */
    },

    // creates and returns an array of building objects based on the levelData
    createBuildings: function(buildings)
    {
        r = [];
        for (var i=0; i < buildings.length; i++)
        {
            r[i] = new Main.Building(buildings[i].x, buildings[i].y,
                                     buildings[i].type,
                                     buildings[i].owner ?  buildings[i].owner :
                                                           "neutral",
                                     i,
                                     buildings[i].capacity);
            me.game.add(r[i], 10);
        }
        return r
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
