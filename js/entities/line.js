// Copyright 2014, Thomas van der Berg & Patrick Malissa
//
// This source code is distributed under the terms of the
// GNU General Public License v3 (see GPLv3.txt)

Main.Line = me.Renderable.extend(
{
	endpos: null,
	
	init: function(startpos, endpos, width, color, opacity)
	{
		this.pos = startpos;
		this.endpos = endpos;
		this.width = (width != null) ? width : 1;
		this.color = (color != null) ? color : "white";
		this.opacity = (opacity != null) ? opacity : 1;
	},
	
	draw: function(context)
	{
		// color, width, start pos, eind pos, opacity
		// draw your stuff
		context.strokeStyle = this.color;
		context.globalAlpha = this.opacity;
		context.lineWidth = this.width; 
		context.beginPath(); 
		context.moveTo(this.pos.x , this.pos.y);
		context.lineTo(this.endpos.x, this.endpos.y); 
		context.stroke();  
	}
});
	