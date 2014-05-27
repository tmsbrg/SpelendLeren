/* GUIContainer: contains a group of GUI elements */
Main.GUIContainer = me.Renderable.extend(
{
    init: function(x, y, objects)
    {
        
		if (x == null) {
            x = 0;
        }
        if (y == null) {
            y = 0;
        }
        if (objects == null) {
            objects = [];
        }
        this.parent(new me.Vector2d(x, y), 0, 0);
        this.setGUIObjects(objects);

        this.floating = true;
    },
    visible: true,
    GUIObjects: null,
    // sets the children of the GUIContainer
    setGUIObjects: function(objects)
    {
        this.GUIObjects = new Array();
        this.width = 0;
        this.height = 0;
        for (var i = 0; i < objects.length; i++) {
            this.addGUIObject(objects[i]);
        }
    },
    // adds children to the GUIContainer
    addGUIObjects: function(objects)
    {
        for (var i = 0; i < objects.length; i++) {
            this.addGUIObject(objects[i]);
        }
    },
    // addGUIObject: adds a child to the GUIContainer
    addGUIObject: function(object) {
       
		this.GUIObjects[this.GUIObjects.length] = object;
        object.floating = false;
        if (object.pos.x + object.width > this.width) {
            this.width = object.pos.x + object.width;
        }
        if (object.pos.y + object.height > this.height) {
            this.height = object.pos.y + object.height;
        }
    },
    // remove objects from the GUIContainer
    removeGUIObjects: function(objects)
    {
        for (var i = 0; i < objects.length; i++) {
            this.removeGUIObject(objects[i]);
        }
    },
    // removes object from the GUIContainer
    removeGUIObject: function(object) {
        for (var i = 0; i < this.GUIObjects.length; i++)
        {
            if (this.GUIObjects[i] === object) {
                if (this.GUIObjects[i].destroy != null) {
                    this.GUIObjects[i].destroy();
                }
                this.GUIObjects.splice(i, 1);
            }
        }
    },
    update: function() 
    {
        for (var i = 0; i < this.GUIObjects.length; i++) {
            this.GUIObjects[i].update();
        }
    },
    draw: function(ctx)
    {
        if (!this.visible) return;
        ctx.save();
        ctx.translate(this.pos.x, this.pos.y);
        for (var i = 0; i < this.GUIObjects.length; i++) {
            this.GUIObjects[i].draw(ctx);
        }
        ctx.restore();
    },
    destroy: function()
    {
        for (var i = 0; i < this.GUIObjects.length; i++)
        {
            if (this.GUIObjects[i].destroy != null) {
                this.GUIObjects[i].destroy();
            }
        }
    },
});
