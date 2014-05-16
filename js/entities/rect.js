/* RectObject: draws a rectangle */
Main.RectObject = me.Renderable.extend({

    color: null,

    init: function(x, y, w, h, color) {
        if (color === undefined) {
            color = "white";
        }
        this.parent(new me.Vector2d(x, y), w, h);

        this.setColor(color);
    },

    setColor: function(color) {
        this.color = color;
    },

    draw: function(ctx) {
        ctx.globalAlpha = this.alpha;
        ctx.fillStyle = this.color;
        ctx.fillRect(this.pos.x, this.pos.y, this.width, this.height);
        ctx.globalAlpha = 1.0;
    }
});
