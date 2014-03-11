LevelScreen = me.ScreenObject.extend(
{
    background: null, // ImageObject with the background image
    buildings: null, // array of building buttons 
    interface: null, // LevelInterface

    /**	
     *  action to perform on state change
     */
    onResetEvent: function()
    {
        console.log("start of game");
    },

    /**	
     *  action to perform when leaving this screen (state change)
     */
    onDestroyEvent: function()
    {
        ; // TODO
    }
});
