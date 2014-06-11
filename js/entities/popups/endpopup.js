Main.Endpopup =  Main.GUIContainer.extend(
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
		
		this.initBackground(userWon);
		this.initButtons();
		this.initImages(scoreData);
		this.initTextobjects(scoreData);
		
		this.parent(0, 0, [this.imageObject, this.retryButton, this.campaignButton]);
	},
	
	initBackground: function(userWon)
	{
		var img = "popup_" + (userWon ? "win" : "lose");
		this.imageObject = new Main.Image(0, 0, img);
	},
	
	initButtons: function()
	{
		var x = 0.45 * Constants.screenWidth;
        var y = 0.81 * Constants.screenHeight;
		
		var retryButtonImage = new Main.Image(x - this.buttonspace, y,
											"popup_retry");
		var campaignButtonImage = new Main.Image(x + this.buttonspace, y,
												"popup_campaign");
		
		campaignButtonImage.baseImage = "popup_campaign";
		retryButtonImage.baseImage = "popup_retry";
		
		var onhover = function(){
            this.displayObject.loadImage(this.displayObject.baseImage +
                                         "_hovered");
        }
        var onhoverout = function(){
            this.displayObject.loadImage(this.displayObject.baseImage);
        }
		
		this.retryButton = new Main.Button(retryButtonImage,
                                           this.onRetryClick.bind(this),
                                           onhover,
                                           onhoverout);
		
		this.campaignButton = new Main.Button(campaignButtonImage,
                                           this.onCampaignClick.bind(this),
                                           onhover,
                                           onhoverout);
	},
	
	onRetryClick: function()
	{	
		me.state.change(me.state.PLAY, this.levelname); 
	},
	
	onCampaignClick: function()
	{
		me.state.change(me.state.READY); 
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
