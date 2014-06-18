// Copyright 2014, Thomas van der Berg & Patrick Malissa
//
// This source code is distributed under the terms of the
// GNU General Public License v3 (see GPLv3.txt)

// contains a layer of the level's objects and sorts them based on their y value
Main.LayerContainer = me.ObjectContainer.extend(
{
    init: function(alwaysSort)
    {
        this.parent(0, 0, Constants.screenWidth, Constants.screenHeight);
        this.sortOn = "YB";
        this.alwaysSort = (alwaysSort == null) ? false : alwaysSort;
    },

    // sorts two elements by position+height, used by sort()
    _sortYB: function(a, b)
    {
        return (b.pos.y + b.height * 0.5) - (a.pos.y + a.height * 0.5);
    },

    update: function()
    {
        this.parent();
        if (this.alwaysSort) {
            this.sort();
        }
    },
});
