// Copyright 2014, Thomas van der Berg & Patrick Malissa
//
// This source code is distributed under the terms of the
// GNU General Public License v3 (see GPLv3.txt)

/*
 *the flag button is used to open a level and gives feedback if
 *the player can play this level, already played this level or cant play this level
*/
Main.FlagButton = Main.Button.extend(
{
	imageObject: null, // placeholder of hte imageObject
	_status: "locked", // status of the FlagButton button
	pos: null, // 2dVector with the posiiton of this object
	font_size: null,
	levelnumber: null,
	
	init: function(pos, status, levelnumber)
	{
		//this.pos = pos;
		this.font_size = Main.font.fontSize.x * Constants.textScale;
		this.levelnumber = levelnumber
		
		this.initImage(pos);
		this.setStatus(status);
		this.initTextObject(pos, levelnumber);
		
		this.parent(this.imageObject, this.onClick.bind(this)/*, onHover, onHoverOut, clickArgs, hoverArgs, hoverOutArgs*/);
		
	},
	// initialize the imageobject
	initImage: function(pos)
	{
		this.imageObject = new Main.Image(pos.x, pos.y, "flag_"+this._status);
	},
	// initialize the textobject
	initTextObject: function(pos, levelnumber)
	{
		var offsetX = (this.imageObject.width * 0.5) - (this.getTextWidth(""+levelnumber) * 0.5);
		var offsetY = (this.imageObject.height * 0.5) - (this.font_size );
		
		var textObject = new Main.TextObject(pos.x + offsetX, pos.y + offsetY, levelnumber, Main.font);
		me.game.add(textObject, 25);
	},
	// return the width of the text
	getTextWidth: function(textinput)
	{
		var count = 0;
		for(var i = 0 ; i < textinput.length; i++)
		{
			count += this.font_size;
		}
		return count;
	},
	
	// setAttribute the status to the given value if it is on of the three(conquered, locked, unlocked)
	setStatus: function (status)
	{
		switch(status)
		{
			case "conquered":
				this._status = "conquered";
				this.changeImage("conquered");
				break;
				
			case "locked":
				this._status = "locked";
				this.changeImage("locked");
				break;
				
			case "unlocked":
				this._status = "unlocked";
				this.changeImage("unlocked");
				break;
			
			default:
				throw "status not found!";
				break;
		}
	},
	// returns the status of the flag button
	getStatus: function()
	{
		return this.status;
	},
	// thisgets executedt if the userAgent clicks on the flag button
	onClick: function()
	{
		if (this._status != "locked") {
			me.audio.stop("campaign");
			me.state.change(me.state.PLAY, "level"+this.levelnumber);
		}
	},
	// changes th eimage of the flag button
	changeImage: function(status)
	{
		this.imageObject.loadImage("flag_"+this._status);
	},
});
