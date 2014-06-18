Main.CampaignScreen = me.ScreenObject.extend(
{
	underground: null, // ImageObject with the background image which has the lowest layer
	aboveground: null, // ImageObject with the background image which has the highest layer
	territories: null, // arry of territories
	level_buttons: new Array(),
	buttonWidth: 337,
	buttonHeight: 83,
	lowest_layer: 0,
	middle_layer: 10,
	highest_layer: 20,
    timeUntilFlicker: 500, // in miliseconds
    timesToFlicker: 4,

    init: function()
    {
        this.parent(true);
    },

	onResetEvent: function(flickerTerritory)
	{
		me.audio.play("campaign", true);

        Main.timer.reset();
        Main.timer.unPause();

        this.timer = 0;
        this.justConqueredTerritories = [];
        this.flickers = 0;

        this.showJustConqueredTerritories = flickerTerritory;

		this.territories = new Main.Dictionary();;
		this.init_backgrounds();
		this.init_territories();
		this.init_flags();
		
		this.init_button();
	},
	
    update: function()
    {
        if (this.showJustConqueredTerritories) {
            this.timer += Main.timer.dt;
            if (this.timer >= this.timeUntilFlicker) {
                this.timer = 0;
                var ter = this.justConqueredTerritories;
                for (var i = 0; i < ter.length; i++)
                {
                    this.territories.getValue(ter[i]).visible = 
                        !this.territories.getValue(ter[i]).visible;
                    this.flickers++;
                    if (this.flickers >= this.timesToFlicker * 2) {
                        this.showJustConqueredTerritories = false;
                    }
                }
            }
        }
    },
	
	init_territories: function()
	{
		for (key in Territories)
		{
			var x = Territories[key].x;
			var y = Territories[key].y;
			
			var territory = new Main.Image(x, y, "territory_" + key);
			territory.visible = Boolean(Territories[key].startconquered);
			me.game.add(territory, this.middle_layer);
			this.territories.setValue(key, territory);
		}
	},
	
	init_button: function()
	{
		var back_button = new Main.TextButton(790, 680, "terug",  this.back_menu.bind(this));
		me.game.add(back_button, this.highest_layer + 1);
	},
	
	init_flags: function()
	{
        var level = (Constants.allLevelsPlayable) ? Infinity :
                                                    Main.playerlevel;
		for(var i = 0; i < MapData.length; i++)
		{
			var pos = new me.Vector2d(MapData[i].x, MapData[i].y);
			if (i+1 < level) {
				
				var level_flag = new Main.FlagButton(pos, "conquered", i+1);
				
				if ( MapData[i].conquered ) {
                    this.conquer(MapData[i].conquered);
                    if (i + 1 === level - 1) {
                        this.justConqueredTerritories = MapData[i].conquered;
                    }
				}
				
				if ( MapData[i].lost) {
					this.lose(MapData[i].lost);
                    if (i + 1 === level - 1) {
                        this.justConqueredTerritories =
                            this.justConqueredTerritories.concat(
                                MapData[i].lost);
                    }
				}
					
			} else if (i+1 > level) {
				var level_flag = new Main.FlagButton(pos, "locked", i+1);
			} else if (i+1 == level) {
				var level_flag = new Main.FlagButton(pos, "unlocked", i+1);
			}

			me.game.add(level_flag, this.highest_layer + 5);
			this.level_buttons.push(level_flag);
		}
	},
	
	init_backgrounds: function()
	{
		this.underground = new Main.Image(0, 0, "underground_map",
                                         Constants.screenWidth,
                                         Constants.screenHeight);
        me.game.add(this.underground, this.lowest_layer);
		this.aboveground = new Main.Image(0, 0, "aboveground_map",
                                         Constants.screenWidth,
                                         Constants.screenHeight);
        me.game.add(this.aboveground, this.highest_layer);
	},

	conquer: function(territories)
	{
		for (var i = 0; i < territories.length; i++)
		{
			this.territories.getValue(territories[i]).visible = true;
		}
	},
	
	lose: function(territories)
	{
		for (var i = 0; i < territories.length; i++)
		{
			this.territories.getValue(territories[i]).visible = false;
		}
	},
	
	back_menu: function()
	{
		me.audio.stop("campaign");
		me.state.change(me.state.MENU); 
	},
	
});
