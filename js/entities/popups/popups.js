// will later replace Popup class
Main.Popups = Main.GUIContainer.extend(
{
	guiObjects: null, // all renderable objtes of th guicontainer
	
	init: function(name, buttonArray)
	{
		this.guiObjects = [],
		this.initBackground(name);
		this.initButtons(buttonArray);
		
		this.parent(0, 0, this.guiObjects);
	},
	
	initBackground: function(name)
	{
		var imageObject = new Main.Image(0, 0, name);
		this.guiObjects.push(imageObject);
	},
	
	initButtons: function(buttonArray)
	{
		//buttonArray{[image, onClick, onhover, onhoverout], [image, onClick, onhover, onhoverout]}
		var onhover = function()
		{
            this.displayObject.loadImage(this.displayObject.baseImage +
                                         "_hovered");
        }
		
        var onhoverout = function()
		{
            this.displayObject.loadImage(this.displayObject.baseImage);
        }
		
		var x = Constants.screenWidth * 0.5;
		var y = Constants.screenHeight * 0.5;
		var space = 50; 
		
		for (var i = 0; i < buttonArray.length; i++)
		{
			var buttonImage = new Main.Image(x + (i *space), y, buttonArray[i].getValue("image"));
			buttonImage.baseImage =  buttonArray[i].getValue("image");
			
			var onButtonClick = buttonArray[i].getValue("onClick");
			var onClick = function()
			{
				onButtonClick();
				me.game.remove(this);
			}
			var button = new Main.Button(buttonImage, onClick.bind(this), onhover, onhoverout);
			this.guiObjects.push(button);
		}
	},
});