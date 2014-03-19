/* Building: a building in the level, sends armies and can be attacked and
   taken over */
Main.Building = Main.Button.extend(
{
	maxCapacity: 20, // the maximum capacity of the building
	growthRate: 1, // how fast the building's population grows
	level: 0, // contains upgrade level information
    type: "", // type of building
    //TODO: unitType should be taken from a building's game settings
    unitType: "farmer", // type of unit this building creates
	owner: Constants.players.neutral, // contains owner information
	flag: null, // contains image object for the flag
	currentCapacity: 20, // capacity of this building
	selected: false, // whether this building is selected
    id: -1, // the id for this building
    selectedImage: null, // contains image object that is drawn when the
                         // building is selected
    imageObject: null, // reference to the image object
    textObject: null, // reference to the text object
	
	init: function(x, y, type, owner, id)
	{
        this.type = type;
        this.owner = owner;
        this.imageObject = new Main.Image(0, 0,
                                 this.getImage(),
                                 64, 64);
        this.id = id;
        this.selectedImage = me.loader.getImage("building_selection");
        this.textObject = new Main.TextObject(0, 64, this.currentCapacity+" / "+this.maxCapacity, Main.font);
        var gui = new Main.GUIContainer(x, y, [this.imageObject,
                                               this.textObject]);
        this.parent(gui, this.onClick.bind(this), this.onHover.bind(this));
	},

    // returns image string for this building
    getImage: function() {
        return Constants.playerStrings[this.owner] + "_" + this.type;
    },
	
	update: function()
	{
        return this.parent();
	},

	draw: function(ctx)
	{
        if (this.selected) {
            ctx.drawImage(this.selectedImage, this.pos.x, this.pos.y,
                          this.width, this.height);
        }
        this.parent(ctx);
	},
	
    // attacks a target
	attack: function(target)
	{
		me.game.add(new Main.Army(this.pos, target, this.unitType,
                                  this.owner),
                    20);
        this.unselect();
	},
	
    // defends against an army
	defend: function(amount)
	{
		
	},

    // changes ownership of building to given new owner
    takeOver: function(owner)
    {
        this.owner = owner;
        this.imageObject.loadImage(this.getImage());
    },
	
    // turns selected to true
	select: function()
	{
		this.selected = true;
	},

    // turns selected to false
	unselect: function()
	{
		this.selected = false;
	},
	
	drawArrow: function()
	{
		//TODO
	},

    onClick: function(ev)
    {
        if (this.owner == Constants.players.user) {
            if (!this.selected) {
                this.select();
            } else {
                Main.levelScreen.attack(this.id);
            }
        } else {
            Main.levelScreen.attack(this.id);
        }
    },

    onHover: function(ev)
    {
    },
});
