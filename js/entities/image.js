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
            image = "bg";
        }
        if (w == null) {
            w = 1;
        }
        if (h == null) {
            h = 1;
        }
        this.parent(new me.Vector2d(x, y), w, h);

        this.loadImage(image);
        this.floating = true;

    },

    loadImage: function(image)
    {
		this.image = me.loader.getImage(image);
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
