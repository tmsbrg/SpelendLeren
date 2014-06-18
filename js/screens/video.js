// Copyright 2014, Thomas van der Berg & Patrick Malissa
//
// This source code is distributed under the terms of the
// GNU General Public License v3 (see GPLv3.txt)

Main.VideoScreen =  me.ScreenObject.extend(
{
    vid: null, // video to play
    counter: 0,
    updateTime: 33, // miliseconds 'till next frame

    init: function()
    {
        this.parent(true);
    },

    onResetEvent: function(vidname)
    {
        Main.timer.reset();
        this.counter = 0;

        this.vid = document.createElement('video');
        if (this.vid.canPlayType("video/webm") == "probably" ||
            this.vid.canPlayType("video/webm") == "maybe") {
            this.vid.setAttribute("src", vidname);
            this.vid.play();
        } else {
            alert("Error: Browser has no webM support. Please use a less shitty browser");
        }
    },

    update: function()
    {
        this.counter += Main.timer.dt;
        if (this.counter > this.updateTime) {
            this.redraw = true;
        }
    },

    draw: function(ctx)
    {
        if (this.redraw) {
            ctx.drawImage(this.vid, 0, 0, Constants.screenWidth,
                                          Constants.screenHeight);
            this.redraw = false;
        }
    },
});
