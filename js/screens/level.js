/* LevelScreen: the main game screen, shows a level and the buildings on the
   level */
Main.LevelScreen = me.ScreenObject.extend(
{
    background: null, // ImageObject with the background image
    buildings: null, // array of building buttons 
    interface: null, // LevelInterface

    // called when the level is started
    onResetEvent: function(level)
    {
        console.log("start of game");
        this.background = new Main.Image(0, 0, level.background,
                                         Constants.screenWidth,
                                         Constants.screenHeight);
        me.game.add(this.background, 0);

        this.buildings = this.createBuildings(level.buildings);
    },

    // creates and returns an array of building objects based on the levelData
    createBuildings: function(buildings)
    {
        r = [];
        for (var i=0; i < buildings.length; i++)
        {
            // TODO: get size from external building settings
            r[i] = new Main.Building(buildings[i].x, buildings[i].y,
                                     buildings[i].type,
                                     buildings[i].owner ?  buildings[i].owner :
                                                    Constants.players.neutral,
                                     i);
            me.game.add(r[i], 10);
        }
        return r
    },

    //TODO: this function should be part of player, but player doesn't exist yet
    attack: function(buildingId) {
        for (var i=0; i < this.buildings.length; i++)
        {
            if (this.buildings[i].selected) {
                this.buildings[i].attack(buildingId);
            }
        }
    },
});
