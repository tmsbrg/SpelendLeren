// Copyright 2014, Thomas van der Berg & Patrick Malissa
//
// This source code is distributed under the terms of the
// GNU General Public License v3 (see GPLv3.txt)

Main.LevelPopup = Main.GUIContainer.extend(
{
    init: function(level)
    {
        this.initBackground();
    },
    
    initBackground: function()
    {
        var img = "popup_" + level;
        this.imageObject = new Main.Image(0, 0, img);
    },
    
    
});