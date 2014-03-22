Main.AI = Object.extend({
    name: "", // string containing information about which player this is
    myBuildings: null, // array of buildings owned by the AI
    currentTarget: null, // reference to current target building
    counter: 0, // amount of miliseconds since last sending of units
    timeUntilNextWave: 3000, // amount of miliseconds until sending the next
                             // wave of armies
    active: true, // whether this AI is doing stuff
    attacking: false, // whether this AI is currently attacking
    wavesSent: 0, // how many waves have been sent to the current target
    wavesToSend: 3, // how many waves of attacks will be sent to any target
    init: function(name, buildings)
    {
        this.name = name;
        this.myBuildings = buildings;
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
                    this.attacking = false;
                }
            }
        } else if (this.getTotalStrength() >=
                   this.currentTarget.currentCapacity) {
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
        while (buildings[i].owner === this.name)
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
        for (var i=0; i < this.myBuildings.length; i++)
        {
            this.myBuildings[i].attack(target);
        }
    },

    // adds a building to the array of buildings owned by this AI
    gainBuilding: function(building)
    {
        this.myBuildings.push(building);
        this.currentTarget = this.getNewTarget();
        this.attacking = false;
    },

    // removes a building from the array of buildings owned by this AI
    loseBuilding: function(building)
    {
        for (var i=0; i < this.myBuildings.length; i++)
        {
            if (this.myBuildings[i] === building) {
                this.myBuildings.splice(i, 1);
            }
        }
        if (!this.active) {
            this.active = true;
        }
    },

    // returns total capacity of all owned buildings
    getTotalStrength: function()
    {
        var strength = 0;
        for (var i=0; i < this.myBuildings.length; i++)
        {
            strength += this.myBuildings[i].currentCapacity;
        }
        return strength;
    },
});
