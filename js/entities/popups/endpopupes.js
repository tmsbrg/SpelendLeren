Main.Endpopup =  Main.Popups.extend(
{
	imageObject: null, // placeholder for th eimagebackground
	retryButton: null, // placeholder for the retry button
	campaignButton: null, // placeholder for the campaing button
	levelname: null, // name of the current level
    categories:  ["spawned", "lost", "killed"],
    statY: 220, // y position for unit stats
    statYSpace: 100, // y space between each unit's stats
    categoryYSpace: 21, // y space between each category(spawned, killed, etc.)
    buttonspace: 240, // pixels between the forward and retry buttons
		
	init: function(userWon, scoreData, levelname)
	{	
		this.levelname = levelname;
		var img = "popup_" + (userWon ? "win" : "lose");
		
		this.initBackground(userWon);
		this.initButtons();
		this.initImages(scoreData);
		this.initTextobjects(scoreData);
		
		this.parent(img, );
	},
	
	initBackground: function(userWon)
	{
		
		this.imageObject = new Main.Image(0, 0, img);
	},
	
	onRetryClick: function()
	{	
		me.state.change(me.state.PLAY, this.levelname); 
		me.game.remove(this);
	},
	
	onCampaignClick: function()
	{
		me.state.change(me.state.READY); 
		me.game.remove(this);
	},

    initImages: function(scoreData)
    {
        for (var i=0; i<scoreData.units.length; i++)
        {
            var size = GetUnitSize(scoreData.units[i]);
            var img = new Main.TileImage(320, 
                                         (this.statY + (this.statYSpace*i)),
                                         "user_"+scoreData.units[i]+
                                         "_downright_0",
                                         size, size,
                                         0);
            me.game.add(img, 250);
        }
    },
	
	initTextobjects: function(scoreData)
	{
		for(var i = 0; i < scoreData.units.length; i++)
		{
			for(var j = 0; j < this.categories.length; j++)
			{
                var pretext = this.getDutchTextForCategory(this.categories[j])
                              + ": ";
				var number = scoreData.getScore(scoreData.units[i],
                                              this.categories[j]);
				var textObject = new Main.TextObject(500, (this.statY +
                                                 ((this.statYSpace*i) +
                                                  (this.categoryYSpace*j))),
                                                   pretext + number, Main.font);
				me.game.add(textObject, 300);
			}
		} // 650 581

        var winTime = Math.round((me.timer.getTime() - scoreData.startLevelTime)
                                 / 1000);
        me.game.add(new Main.TextObject(650, 600, winTime + " sec",
                                        Main.font),
                    350);
	},

    getDutchTextForCategory: function(category)
    {
        switch(category)
        {
            case "spawned":
            return "Geboren"
            case "lost":
            return "Verloren"
            case "killed":
            return "Verslagen"
        }
        throw "Trying to get Dutch text for unknown category: " + category
    },
});
