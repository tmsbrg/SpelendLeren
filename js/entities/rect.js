/* RectObject: draws a rectangle */
Main.RectObject = me.Renderable.extend({

    visible: true,
    color: null,
    alpha: null,

    init: function(x, y, w, h, color, alpha) {
        if (color === undefined) {
            color = "white";
        }
        if (alpha === undefined) {
            alpha = 1.0;
        }
        this.parent(new me.Vector2d(x, y), w, h);

        this.setColor(color);
        this.setAlpha(alpha);
    },

    setColor: function(color)
    {
        this.color = color;
    },

    setAlpha: function(alpha)
    {
        this.alpha = alpha;
    },

    draw: function(ctx) {
        if (!this.visible) return;
        ctx.globalAlpha = this.alpha;
        ctx.fillStyle = this.color;
        ctx.fillRect(this.pos.x, this.pos.y, this.width, this.height);
        ctx.globalAlpha = 1.0;
    }
});
