Main.Endpopup =  Main.GUIContainer.extend(
{
	imageObject: null, // placeholder for th eimagebackground
	retryButton: null, // placeholder for the retry button
	campaignButton: null, // placeholder for the campaing button
	levelname: null, // name of the current level
	unitTypes: [], // Array with all the different unittypes
	categories: [], // Array with all the categories
	
	init: function(userWon, scoreData, levelname)
	{	
		this.levelname = levelname;
		
		this.initBackground(userWon);
		this.initButtons();
		this.initTextobjects(scoreData);
		
		this.parent(0, 0, [this.imageObject, this.retryButton, this.campaignButton]);
	},
	
	// TODO: retry, backt to campaign
	initBackground: function(userWon)
	{
		var img = "popup_" + (userWon ? "win" : "lose");
		this.imageObject = new Main.Image(0, 0, img);
	},
	
	initButtons: function()
	{
		var x = (0.5 * Constants.screenWidth) - (0.5 * this.imageObject.width);
        var y = (0.5 * Constants.screenHeight) - (0.5 * this.imageObject.height);
		var buttonspace = 240;
		
		
		var campaignButtonImage = new Main.Image(x+ this.imageObject.width * 0.6,
												y + this.imageObject.height * 0.8,
												"popup_campaign");
		var retryButtonImage = new Main.Image((x - campaignButtonImage.width - buttonspace) + this.imageObject.width * 0.6,
												y + this.imageObject.height * 0.8,
											"popup_retry");
		
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
		me.game.remove(this);
	},
	
	onCampaignClick: function()
	{
		me.state.change(me.state.READY); 
		me.game.remove(this);
	},
	
	initTextobjects: function(scoreData)
	{
		this.unitTypes = GetUnits();
		
		this.categories = ["spawned", "lost", "killed"];
		
		for(var i = 0; i < this.unitTypes.length; i++)
		{
			for(var j = 0; j < this.categories.length; j++)
			{
				//console.log(this.unitTypes[i] + " : "+ this.categories[j]+ " " + scoreData.getScore(this.unitTypes[i], this.categories[j]));
				var text = scoreData.getScore(this.unitTypes[i], this.categories[j]);
				var textObject = new Main.TextObject(500, (300 + ((100*i) +(20*j))), text, Main.font);
				me.game.add(textObject, 300);
			}
		}
	},
	
});