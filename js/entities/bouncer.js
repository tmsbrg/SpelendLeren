// Copyright 2014, Thomas van der Berg & Patrick Malissa
//
// This source code is distributed under the terms of the
// GNU General Public License v3 (see GPLv3.txt)

/* Draws a bouncing image */
Main.Bouncer = Main.Image.extend(
{
    ct: 0, // remembers where the bouncer is in the current animation, between 0
           // and 1
    direction: 1, // 1 or -1, direction of current movement
    speed: 0.1, // movement per second

    // time is amount of seconds to go from start to end
    init: function(x, y, ymov, image, w, h, time)
    {
        this.parent(x, y, image, w, h)

        this.starty = y;
        this.endy = y + ymov;
        this.speed = (time != null) ? 1 / time : 0.1;
    },

    update: function()
    {
        this.ct += this.speed * (0.001 * Main.timer.dt) * this.direction;
        if (this.ct >= 1) {
            this.direction = -1;
        } else if (this.ct <= 0) {
            this.direction = 1;
        }
        this.pos.y = lerp(this.starty, this.endy, this.ct);
    },

    setPos: function(x, y)
    {
        this.pos = new me.Vector2d(x, y);

        var ymov = this.endy - this.starty;

        this.starty = y;
        this.endy = y + ymov;

        this.ct = 0;
        this.direction = 1;
    },
});
