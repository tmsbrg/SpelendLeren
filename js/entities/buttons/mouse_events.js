/* MouseEvents: Object that gets mouse input and executes functions on getting
   certain mouse events */
Main.MouseEvents = Object.extend(
{
    rect: null, // rect to check mouse events in
    onClick: function() {}, // function to be called when clicked
    onHover: function() {}, // function to be called when hovered
    clickable: false, // whether currently listening to click events
    hoverable: false, // whether currently listening to hover events

    init: function(rect, onClick, onHover, onHoverOut, onDoubleClick)
    {
        //TODO: make onhoverout and ondoubleclick work
        this.rect = rect;
        if (onClick != null) {
            this.setOnClick(onClick);
        }
        if (onHover != null) {
            this.setOnHover(onHover);
        }
        this.registerClickAndHover();
    },

    // sets the onClick to given function, turns clickable to true unless false
    // is given
    setOnClick: function(onClick, clickable)
    {
        if (this.onClick != null) {
            this.onClick = onClick;
        }
        if (clickable != null) {
            this.clickable = clickable;
        } else {
            this.clickable = true;
        }
    },

    // sets the onHover to given function, turns hoverable to true unless false
    // is given
    setOnHover: function(onHover, hoverable)
    {
        if (this.onHover != null) {
            this.onHover = onHover;
        }
        if (hoverable != null) {
            this.hoverable = hoverable;
        } else {
            this.hoverable = true;
        }
    },
    
    // register mouse click and hover
    registerClickAndHover: function()
    {
        me.input.registerPointerEvent('mouseup', this.rect,
                                      this.clicked.bind(this));
        me.input.registerPointerEvent('mousemove', this.rect,
                                      this.hovered.bind(this));
    },

    // called when clicked
    clicked: function(ev)
    {
		if (this.clickable) {
            return this.onClick(ev);
        } else {
            return true;
        }
    },
 
    // called when hovered
    hovered: function(ev)
    {
        if (this.hoverable) {
            return this.onHover(ev);
        } else {
            return true;
        }
    },

    // remove game engine references to the object, called by the engine when
    // removed
    destroy: function()
    {
        me.input.releasePointerEvent('mousedown', this);
        me.input.releasePointerEvent('mousemove', this);
    }
});

