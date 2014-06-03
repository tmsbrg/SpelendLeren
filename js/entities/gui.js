Main.GUI = Main.GUIContainer.extend(
{
	displayObject: null, // place holder of the sound icon
	soundSize: 64,
	sound_button: null,
    muted: Constants.startMuted,
	pressed: false,
	
	init: function()
	{
		var sound_on = new Main.Image(1024 - this.soundSize, 0, "sound_on",  this.soundSize, this.soundSize);
		this.sound_button = new Main.Button(sound_on,
                                            this.soundClick.bind(this));

		
		this.parent(0, 0, [this.sound_button]);
		this.isPersistent = true;
		
        this.setMuted(this.muted);
	},
	
	// toogle to muteAll and unmuteAll the sound of the game
	soundClick: function()
	{
        this.setMuted(!this.muted);
	},

    // sets whether the audio is muted or not
    setMuted: function(muted)
    {
        this.muted = muted;
        if (this.muted) {
            this.sound_button.displayObject.loadImage("sound_off");
            me.audio.muteAll();
        } else {
            this.sound_button.displayObject.loadImage("sound_on");
            me.audio.unmuteAll();
        }
    },
	
	update: function()
	{
		if (!me.input.keyStatus("mute")) {
			this.pressed = false;
		}
		
		if (me.input.isKeyPressed("mute") && !this.pressed) {
			this.pressed = true;
			this.sound_button.onClick();
			
		}
	},
	
});

