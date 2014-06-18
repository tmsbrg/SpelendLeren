// Copyright 2014, Thomas van der Berg & Patrick Malissa
//
// This source code is distributed under the terms of the
// GNU General Public License v3 (see GPLv3.txt)

/*
* popups at the end of each level. It gives the layer feedback about how he performed in this level and how long he played.
* It also gives him feedback if he won the level or not.
*/
Main.Endpopup =  Main.GUIContainer.extend(
{
	imageObject: null, // placeholder for th eimagebackground
	retryButton: null, // placeholder for the retry button
	campaignButton: null, // placeholder for the campaing button
	levelname: null, // name of the current level
    categories:  ["spawned", "lost", "killed"],
    statY: 200, // y position for unit stats
    statYSpace: 90, // y space between each unit's stats
    categoryYSpace: 21, // y space between each category(spawned, killed, etc.)
    buttonspace: 240, // pixels between the forward and retry buttons
		
	// Endpopup takes a boolean, scoreData class and a string 
	init: function(userWon, scoreData, levelname)
	{	
		this.levelname = levelname;
		if (userWon) {
			me.audio.play("victory");
		}
		else {
			me.audio.play("lose");
		}
		this.initBackground(userWon);
		this.initButtons();
		this.initImages(userWon, scoreData);
		this.initTextobjects(userWon, scoreData);
		
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
        var numPos = this.levelname.search("\\d"); // find first digit
        var level = Number(this.levelname.substr(numPos));
		me.state.change(me.state.READY, level + 1 === Main.playerlevel); 
	},

    initImages: function(userWon, scoreData)
    {
        var winner = userWon ? "user_" : "comp1_";
		
		for (var i = 0; i < scoreData.units.length; i++)
        {
			var size = GetUnitSize(scoreData.units[i]);
			var img = me.loader.getImage(winner + scoreData.units[i] + "_win");
			var animation = new me.AnimationSheet(320,
                                           (this.statY + (this.statYSpace * i)),
												img, size);
			
			var length = animation.image.width / size;
			var animationArray = getRange(length);
			animation.addAnimation("win", animationArray, 40);
			animation.setCurrentAnimation("win");
            
            me.game.add(animation, 250);
        }
    },
	
	initTextobjects: function(userWon, scoreData)
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
		}
		
        var winTime = 
            Math.round((me.timer.getTime() - scoreData.startLevelTime) /
                       1000);
        scoreData.setEndTime(winTime) 

        if (userWon) {
            scoreData.calculateScore();
        } else {
            scoreData.score = 0;
        }
        me.game.add(new Main.TextObject(410, 600, scoreData.score,
                                        Main.font),
                    350);
		
        me.game.add(new Main.TextObject(650, 560, scoreData.parTime + " sec",
                                        Main.font),
                    350);
        me.game.add(new Main.TextObject(650, 600, scoreData.endTime + " sec",
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
