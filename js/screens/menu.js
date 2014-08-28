// Copyright 2014, Thomas van der Berg & Patrick Malissa
//
// This source code is distributed under the terms of the
// GNU General Public License v3 (see GPLv3.txt)

/* MenuScreen: the main menu screen, shows diffretn buttons to start or 
 * config the game */
Main.MenuScreen = me.ScreenObject.extend(
{
    background: null, // ImageObject with the background image
    startButtonObject: null, // Image object with the placeholder of the start
                             // button
    buttonWidth: 249,
    buttonHeight: 61,
    
    onResetEvent: function()
    {
        me.audio.play("menu", true);
        
        this.background = new Main.Image(0, 0, "bg_menu",
                                         Constants.screenWidth,
                                         Constants.screenHeight);
        me.game.add(this.background, 0);
        
        /*var text = new Main.TextObject(410 +75, 300 +30, "CAMPAIGN", Main.font);
        me.game.add(text, 100);
        
        this.startButtonObject = new Main.Image(410, 300, "menu_start_button",
                                        this.buttonWidth,
                                        this.buttonHeight);
        
        var start_game_button = new Main.Button(this.startButtonObject, this.start_game.bind(this));
        me.game.add(start_game_button, 20);*/
        
        
        
        var start_game_button = new Main.TextButton(410, 220, "Doorgaan", this.start_game.bind(this));
        me.game.add(start_game_button, 20);
        var restart_game_button = new Main.TextButton(410, 320, "Opnieuw beginnen", this.restart_game.bind(this));
        me.game.add(restart_game_button, 20);
    },

    restart_game: function()
    {
        // this needs a warning
        me.save.delete("playerlevel");
        Main.playerlevel = 1;
        this.start_game();
    },
    
    start_game: function()
    {
        me.audio.stop("menu");
        me.state.change(me.state.READY); 
    },
});
