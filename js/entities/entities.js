/* GameObject: base class for objects used in the game */
game.GameObject = me.Renderable.extend({
    update: function() {
        return game.redraw;
    },

    draw: function(ctx) {
    }
});
