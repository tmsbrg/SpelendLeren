Main.AI = Object.extend(
{

    timeUntilNextWave: 8000, // amount of miliseconds until sending the next
                             // wave of armies
    alwaysInactive: false, // if true, always make the AI inactive
    attacking: false, // whether this AI is currently attacking
    wavesToSend: 2, // how many waves of attacks will be sent to any target
    targetLock: false, // whether the AI locks onto a target until it has
                       // taken it over

    active: true, // whether this AI is doing stuff
    wavesSent: 0, // how many waves have been sent to the current target

    currentTarget: null, // reference to current target building
    counter: 0, // amount of miliseconds since last sending of units
    player: null, // reference to the player for this AI
	searchTarget: null,
	randomStartegy: null,
	closestStrategy: null,

    init: function(difficulty)
    {
		this.randomStrategy = new SearchTarget(new SearchTargetStrategy());
		this.closestStrategy =
                       new SearchTarget(new SearchClosestTargetStrategy());

		
		
		this.setSearchTargetStrategy(this.randomStrategy);
		if (difficulty == null) {
            difficulty = 1;
        }
		
        this.setDifficulty(difficulty);
		
        if (this.alwaysInactive) {
            this.active = false;
        }
    },
	
	setSearchTargetStrategy: function(strategy)
	{
		this.searchTarget = strategy;
	},

    setDifficulty: function(difficulty)
    {
        if (difficulty < 0) {
            throw ("Trying to set AI difficulty to below 0");
        } else if (difficulty >= Constants.difficulties.length) {
            throw ("Difficulties higher than " +
                   (Constants.difficulties.length-1) + " not supported.");
        } else {
            var diff = Constants.difficulties[difficulty];
            for (key in diff) {
                this[key] = diff[key];
            }
        }
    },

    setPlayer: function(player)
    {
        this.player = player;
    },

    update: function()
    {
        if (!this.active) {
            return false;
        }

        if (this.searchForTarget() == false) {
            return false;
        }
        this.sendWaves();

        return false;
    },

    // searches for a target, returns false and turns the AI inactive when
    // it has found none, otherwise returns true
    searchForTarget: function()
    {
        if (this.currentTarget == null) {
            this.currentTarget =  this.searchTarget.search(this.player);
            if (this.currentTarget == null) {
                this.active = false;
                return false;
            }
        }
        return true;
    },

    // manages sending waves of attacks over time
    sendWaves: function()
    {
        this.counter += Main.timer.dt;
        if (this.counter >= this.timeUntilNextWave) {
            this.counter = 0;
			
            if (this.getTotalStrength() >=
                       this.currentTarget.calculateDefencePower()) {
                this.attack(this.currentTarget);
                this.wavesSent++;
                if (this.wavesSent >= this.wavesToSend) {
                    this.stopAttack();
                }
            } else {
                this.stopAttack();
            }
        }
    },

    stopAttack: function()
    {
        this.wavesSent = 0;
        if (!this.targetLock) {
            this.currentTarget = null;
        }
    },

    // returns a random building not owned by this AI, or null if there is
    // no such building
    /*getNewTarget : function(player)
    {
		console.log("new function " +searchTarget.search(this.player));
		
		var buildings = Main.levelScreen.getBuildings();
        var i = Math.round(Math.random() * (buildings.length-1));
        var start_i = i;
        while (buildings[i].owner === player.name)
        {
            i = (i + 1) % buildings.length;
            if (i == start_i) {
                return null;
            }
        }
		console.log("old function " + buildings[i]);
        return buildings[i];
    },*/

    // sends all his units to attack given target
    attack: function(target)
    {
        for (var i=0; i < this.player.buildings.length; i++)
        {
            this.player.buildings[i].attack(target);
        }
    },

    // adds a building to the array of buildings owned by this AI
    gainBuilding: function(building)
    {
        this.currentTarget = this.searchTarget.search(this.player);
        this.attacking = false;
    },

    // removes a building from the array of buildings owned by this AI
    loseBuilding: function(building)
    {
        if (!this.active && !this.alwaysInactive) {
            this.active = true;
        }
    },

    // returns total attack power of all owned buildings
    getTotalStrength: function()
    {
        var strength = 0;
        for (var i=0; i < this.player.buildings.length; i++)
        {
            strength += this.player.buildings[i].calculateAttackPower();
        }
        return strength;
		
    },

    // disables this AI
    disable: function()
    {
        this.active = false;
    },

    // enables this AI
    enable: function()
    {
        if (!this.alwaysInactive) {
            this.active = true;
        }
    },
});
