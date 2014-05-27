/* Popup: Shows a tutorial popup */
Main.Popup = Main.GUIContainer.extend(
{
    // name: name of the popup to show(looks for popup_name)
    // onClose: function to call when closed button is pressed
    init: function(name, onClose)
    {
        this.onClose = onClose;
        var img = "popup_" + name;
        if (me.loader.getImage(img) == null) {
            img = "popup_blank";
        }

        var imageObject = new Main.Image(0, 0, img);

        var x = 0.5 * Constants.screenWidth - 0.5 * imageObject.width;
        var y = 0.5 * Constants.screenHeight - 0.5 * imageObject.height;

        imageObject.pos = new me.Vector2d(x, y);

        var buttonImage = new Main.Image(x + imageObject.width * 0.6,
                                         y + imageObject.height * 0.8,
                                         "popup_ok")
        buttonImage.baseImage = "popup_ok";

        var onhover = function(){
            this.displayObject.loadImage(this.displayObject.baseImage +
                                         "_hovered");
        }
        var onhoverout = function(){
            this.displayObject.loadImage(this.displayObject.baseImage);
        }

        var buttonObject = new Main.Button(buttonImage,
                                           this.onButtonClick.bind(this),
                                           onhover,
                                           onhoverout);

        this.parent(0, 0, [imageObject, buttonObject]);
    },

    // called when the OK button is clicked
    onButtonClick: function()
    {
        this.onClose();
        me.game.remove(this);
    },
});
