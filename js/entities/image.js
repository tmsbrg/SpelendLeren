// Copyright 2014, Thomas van der Berg & Patrick Malissa
//
// This source code is distributed under the terms of the
// GNU General Public License v3 (see GPLv3.txt)

/* ImageObject: draws an image */
Main.Image = me.Renderable.extend(
{
	init: function(x, y, image, w, h)
    {
        if (x == null) {
            x = 0;
        }
        if (y == null) {
            y = 0;
        }
        if (image == null) {
            image = "bg_01";
        }

        this.loadImage(image);

        if (w == null) {
            w = this.image.naturalWidth;
        }
        if (h == null) {
            h = this.image.naturalHeight;
        }
        this.parent(new me.Vector2d(x, y), w, h);

        this.floating = true;

    },

    loadImage: function(image)
    {
        if ((this.image = me.loader.getImage(image)) == null) {
            throw "Cannot find image \""+image+"\"";
        }
    },

    update: function()
    {
        return true;
    },

    draw: function(ctx)
    {
        ctx.drawImage(this.image, this.pos.x, this.pos.y, this.width,
                                                                  this.height);
    }
});
