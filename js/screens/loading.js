// Copyright 2014, Thomas van der Berg & Patrick Malissa
//
// This source code is distributed under the terms of the
// GNU General Public License v3 (see GPLv3.txt)

Main.LoadingScreen =  me.ScreenObject.extend(
{
    init: function(background)
    {
        this.parent(true);

        this.background = background;

        this.invalidate = false;
        this.loadPercent = 0;
        me.loader.onProgress = this.onProgressUpdate.bind(this);
    },
    
    onerror: function(e)
    {
        console.log(e);
    },
    
    onProgressUpdate: function(progress)
    {
       this.loadPercent = progress;
       this.invalidate = true;
    },
     
     
    // make sure the screen is only refreshed on load progress
    update: function()
    {
        if (this.invalidate===true)
        {
            this.invalidate = false;
            return true;
        }
        return false;
    },

    // on destroy event
    onDestroyEvent : function ()
    {
        this.logo = null;
    },

    //    draw function
    draw : function(context)
    {
        // clear the screen
        me.video.clearSurface(context, "black");
 
        context.drawImage(this.background, 0, 0,
                          Constants.screenWidth, Constants.screenHeight);

        var width = Math.floor(this.loadPercent * 486);

        context.fillStyle = "#8d0d0d";
        context.fillRect(282, 693, width, 32);
    },
});
