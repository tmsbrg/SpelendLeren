Main.LevelScreen = me.ScreenObject.extend(
{
    background: null, // ImageObject with the background image
    buildings: null, // array of building buttons 
    interface: null, // LevelInterface

    /**	
     *  action to perform on state change
     */
    onResetEvent: function(level)
    {
        console.log("start of game");
        this.background = new Main.Image(0, 0, level.background,
                                         Constants.screenWidth,
                                         Constants.screenHeight);
        me.game.add(this.background, 0);

        this.buildings = this.createBuildings(level.buildings);
    },

    createBuildings: function(buildings)
    {
        for (var i=0; i < buildings.length; i++)
        {
            // TODO: get size from external building settings
            me.game.add(new Main.Image(buildings[i].x, buildings[i].y,
                                       buildings[i].type, 64, 64), 10);
        }
    },

    /**	
     *  action to perform when leaving this screen (state change)
     */
    onDestroyEvent: function()
    {
    }
});
