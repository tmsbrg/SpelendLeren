/* GUIContainer: contains a group of GUI elements */
Main.GUIContainer = me.Renderable.extend({
    init: function(x, y, objects) {
        if (x == null) {
            x = 0;
        }
        if (y == null) {
            y = 0;
        }
        if (objects == null) {
            objects = [];
        }
        this.parent(new me.Vector2d(x, y), Infinity, Infinity);
        this.setGUIObjects(objects);

        this.floating = true;
    },
    visible: true,
    GUIObjects: null,
    // sets the children of the GUIContainer
    setGUIObjects: function(objects) {
        this.GUIObjects = new Array();
        for (var i = 0; i < objects.length; i++) {
            this.addGUIObject(objects[i]);
        }
    },
    // adds children to the GUIContainer
    addGUIObjects: function(objects) {
        for (var i = 0; i < objects.length; i++) {
            this.addGUIObject(objects[i]);
        }
    },
    /* addGUIObject: adds a child to the GUIContainer */
    addGUIObject: function(object) {
        this.GUIObjects[this.GUIObjects.length] = object;
        object.floating = false;
    },
    update: function() {
        return true;
    },
    draw: function(ctx) {
        if (!this.visible) return;
        ctx.save();
        ctx.translate(this.pos.x, this.pos.y);
        for (var i = 0; i < this.GUIObjects.length; i++) {
            this.GUIObjects[i].draw(ctx);
        }
        ctx.restore();
    },
});
