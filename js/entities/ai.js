Main.AI = Object.extend(
{
    difficulty: 0, // difficulty this AI has, see js/constants.js

    currentTarget: null, // reference to current target building
    counter: 0, // amount of miliseconds since last sending of units
    timeUntilNextWave: 8000, // amount of miliseconds until sending the next
                             // wave of armies
    alwaysInactive: false, // if true, always make the AI inactive
    active: true, // whether this AI is doing stuff
    attacking: false, // whether this AI is currently attacking
    wavesSent: 0, // how many waves have been sent to the current target
    wavesToSend: 2, // how many waves of attacks will be sent to any target
    targetLock: false, // whether the AI locks onto a target until it has
                       // taken it over

    player: null, // reference to the player for this AI

    init: function(difficulty)
    {
        if (difficulty == null) {
            difficulty = 1;
        }
        this.setDifficulty(difficulty);
        if (this.alwaysInactive) {
            this.active = false;
        }
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
            this.currentTarget = this.getNewTarget();
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
        if (this.attacking) {
            this.counter += Main.timer.dt;
            if (this.counter >= this.timeUntilNextWave) {
                this.attack(this.currentTarget);
                this.counter = 0;
                this.wavesSent++;
                if (this.wavesSent >= this.wavesToSend) {
                    this.wavesSent = 0;
                    if (!this.targetLock) {
                        this.currentTarget = null;
                    }
                    this.attacking = false;
                }
            }
        } else if (this.getTotalStrength() >=
                   this.currentTarget.currentCapacity()) {
            this.attacking = true;
        }
    },

    // returns a random building not owned by this AI, or null if there is
    // no such building
    getNewTarget : function()
    {
        var buildings = Main.levelScreen.getBuildings();
        var i = Math.round(Math.random() * (buildings.length-1));
        var start_i = i;
        while (buildings[i].owner === this.player.name)
        {
            i = (i + 1) % buildings.length;
            if (i == start_i) {
                return null;
            }
        }
        return buildings[i];
    },

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
        this.currentTarget = this.getNewTarget();
        this.attacking = false;
    },

    // removes a building from the array of buildings owned by this AI
    loseBuilding: function(building)
    {
        if (!this.active) {
            this.active = true;
        }
    },

    // returns total capacity of all owned buildings
    getTotalStrength: function()
    {
        var strength = 0;
        for (var i=0; i < this.player.buildings.length; i++)
        {
            strength += this.player.buildings[i].currentCapacity();
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
