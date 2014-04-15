Main.Effect = me.AnimationSheet.extend(
{
    init: function(x, y, image)
    {
        if (image == null) {
            image = "battle_animation";
        }
        this.parent(x, y, me.loader.getImage(image), 128);
        this.addAnimation("0", [0,1,2,3,4,5]);
        this.addAnimation("1", [7,8,9,10,11,12,13,14,15,16,17]);
        this.addAnimation("2", [17,18,19,20,21,22,23,24,25,26]);
        this.addAnimation("3", [27,28,29,30,31,32,33,34,35,36,37,38]);
        this.setCurrentAnimation(""+Math.round(Math.random()*3), (function()
        {
            me.game.remove(this);
        }.bind(this)));
    }
});
