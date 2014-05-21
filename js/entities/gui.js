Main.GUI = Main.GUIContainer.extend(
{
	displayObject: null, // place holder of the sound icon
	soundSize: 64,
	sound_button: null,
	pressed: false,
	
	init: function()
	{
		var sound_on = new Main.Image(1024 - this.soundSize, 0, "sound_off",  this.soundSize, this.soundSize);
		me.audio.muteAll();
		this.sound_button = new Main.Button(sound_on, this.soundClick);
		this.sound_button.muted = true;
		
		this.parent(0, 0, [this.sound_button]);
		this.isPersistent = true;
		
	},
	
	// toogle to muteAll and unmuteAll the sound of the game
	soundClick: function()
	{
		if (!this.muted) {
			this.displayObject.loadImage("sound_off");
			this.muted = true;
			me.audio.muteAll();
		} else {
			this.displayObject.loadImage("sound_on");
			this.muted = false;
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