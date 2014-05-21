Main.Effect = me.AnimationSheet.extend(
{
    init: function(x, y, image)
    {
        if (image == null) {
            image = "battle_animation";
        }
        this.parent(x, y, me.loader.getImage(image), 138);
        this.addAnimation("0", this.range(54));
        // this.addAnimation("1", [7,8,9,10,11,12,13,14,15,16,17]);
        // this.addAnimation("2", [17,18,19,20,21,22,23,24,25,26]);
        // this.addAnimation("3", [27,28,29,30,31,32,33,34,35,36,37,38]);
        this.setCurrentAnimation("0", (
                                 function()
                                 {
                                     me.game.remove(this);
                                 }.bind(this)));
    },

    range: function(n1, n2)
    {
        if (n2 == null) {
            start = 0;
            end = n1;
        } else {
            start = n1;
            end = n2;
        }
        var r = new Array(end);
        for (var i = start; i < r.length; i++)
        {
            r[i] = i;
        }
        return r;
    },
});
