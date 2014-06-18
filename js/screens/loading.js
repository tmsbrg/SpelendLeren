// Copyright 2014, Thomas van der Berg & Patrick Malissa
//
// This source code is distributed under the terms of the
// GNU General Public License v3 (see GPLv3.txt)

Main.LoadingScreen =  me.ScreenObject.extend(
{
	init: function()
	{
		this.parent(true);

		
        me.loader.load({name: "loading_start", type: "image", src: "data/img/gui/loading/loading_start.png"}, this.onLoadStartLoad.bind(this), this.onerror.bind(this));
        me.loader.load({name: "loading_end", type: "image", src: "data/img/gui/loading/loading_end.png"}, this.onLoadEndLoad.bind(this), this.onerror.bind(this));
        me.loader.load({name: "loading_border", type: "image", src: "data/img/gui/loading/loading_border.png"}, this.onLoadBorder.bind(this), this.onerror.bind(this));
		me.loader.load({name: "loading_screen",  type:"image",  src: "data/img/background/loading_screen.png"}, this.onBackgroundLoad.bind(this), this.onerror.bind(this));

		this.invalidate = false;
		this.loadPercent = 0;
		me.loader.onProgress = this.onProgressUpdate.bind(this);
	},
	
	onerror: function(e)
	{
		console.log(e);
	},
	
	onBackgroundLoad: function()
	{
		this.background = me.loader.getImage("loading_screen");
	},

    onLoadStartLoad: function()
    {
        this.loading_start = me.loader.getImage("loading_start");
    },

    onLoadEndLoad: function()
    {
        this.loading_end = me.loader.getImage("loading_end");
    },
	
    onLoadBorder: function()
    {
        this.loading_border = me.loader.getImage("loading_border");
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

	//	draw function
	draw : function(context)
	{
		// clear the screen
		me.video.clearSurface (context, "black");
 
		if (this.background != undefined) {
			context.drawImage(this.background, 0, 0,
                              Constants.screenWidth, Constants.screenHeight);
		}
		if (this.loading_border != undefined) {
			context.drawImage(this.loading_border, 227, 691,
                              this.loading_border.naturalWidth,
                              this.loading_border.naturalHeight);
		}
		if (this.loading_start != undefined) {
			context.drawImage(this.loading_start, 228, 693,
                              this.loading_start.naturalWidth,
                              this.loading_start.naturalHeight);
		}
		if (this.loading_end != undefined) {
			context.drawImage(this.loading_end, 751, 693,
                              this.loading_end.naturalWidth,
                              this.loading_end.naturalHeight);
		}
		
		var width = Math.floor(this.loadPercent * 486);

		context.fillStyle = "#8d0d0d";
		context.fillRect(282, 693, width, 32);
	},
});
