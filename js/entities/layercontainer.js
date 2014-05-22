// contains a layer of the level's objects and sorts them based on their y value
Main.LayerContainer = me.ObjectContainer.extend(
{
    init: function(alwaysSort)
    {
        this.parent(0, 0, Constants.screenWidth, Constants.screenHeight);
        this.sortOn = "y";
        this.alwaysSort = (alwaysSort == null) ? false : alwaysSort;
    },

    update: function()
    {
        this.parent();
        if (this.alwaysSort) {
            this.sort();
        }
    },
});
