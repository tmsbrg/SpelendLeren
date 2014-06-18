// Copyright 2014, Thomas van der Berg & Patrick Malissa
//
// This source code is distributed under the terms of the
// GNU General Public License v3 (see GPLv3.txt)

Main.Effect = me.AnimationSheet.extend(
{
    init: function(x, y, image)
    {
        if (image == null) {
            image = "battle_animation";
        }
        this.parent(x, y, me.loader.getImage(image), 138);
        this.addAnimation("0", this.range(8));
        this.addAnimation("1", this.range(8, 14));
        this.addAnimation("2", this.range(14, 23));
        this.addAnimation("3", this.range(23, 33));
        this.addAnimation("4", this.range(33, 44));
        this.addAnimation("5", this.range(44, 54));
        this.setCurrentAnimation("" + Math.round(Math.random()*5), (
                                 function()
                                 {
                                     me.game.remove(this);
                                 }.bind(this)));
    },

    // returns a range between n1 and n2-1, or between 0 and n1-1 of n2 is not
    // given
    range: function(n1, n2)
    {
        if (n2 == null) {
            var start = 0;
            var end = n1;
        } else {
            var start = n1;
            var end = n2;
        }
        var r = new Array(end - start);
        for (var i = 0; i < r.length; i++)
        {
            r[i] = i + start;
        }
        return r;
    },
});
