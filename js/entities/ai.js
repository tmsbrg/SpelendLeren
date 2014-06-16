Main.AI = Object.extend(
{
    timeUntilNextWave: 8000, // amount of miliseconds until sending the next
                             // wave of armies
    alwaysInactive: false, // if true, always make the AI inactive
    attacking: false, // whether this AI is currently attacking
    wavesToSend: 1, // how many waves of attacks will be sent to any target
    targetLock: false, // whether the AI locks onto a target until it has
                       // taken it over

    active: true, // whether this AI is doing stuff
    wavesSent: 0, // how many waves have been sent to the current target
	strategy: null,
    currentTarget: null, // reference to current target building
    counter: 0, // amount of miliseconds since last sending of units
    player: null, // reference to the player for this AI
	searchTarget: null,
	randomStartegy: null,
	closestStrategy: null,
	userStrategy: null,
	weakStrategy: null,
	waekUserStrategy: null,
	pointsStrategy: null,

    init: function(difficulty, strategy)
    {
		this.randomStrategy = new SearchTarget(new SearchTargetStrategy());
		this.closestStrategy =
                       new SearchTarget(new SearchClosestTargetStrategy());
		this.userStrategy = new SearchTarget(new SearchUserTargetStrategy());
		
		this.weakStrategy = new SearchTarget(new SearchWeakTargetStrategy());
		this.weakUserStrategy = new SearchTarget(new SearchWeakUserTargetStrategy());
		this.pointsStrategy = new SearchTarget(new SearchPointsTargetStrategy());

		this.setAIStrategy(strategy);

		
		if (difficulty == null) {
            difficulty = 1;
        }
		
        this.setDifficulty(difficulty);
		
        if (this.alwaysInactive) {
            this.active = false;
        }
    },
	// changes the curretn strategy of the ai to the given startegy
	setSearchTargetStrategy: function(strategy)
	{
		this.searchTarget = strategy;
	},
	
	// changes the ai´s strategy on runtime based on the given string
	setAIStrategy: function(strategy)
	{
		switch(strategy)
		{
			case "close":
				this.setSearchTargetStrategy(this.closestStrategy);
				break;
			case "random":
				this.setSearchTargetStrategy(this.randomStrategy);
				break;
			case "user":
				this.setSearchTargetStrategy(this.userStrategy);
				break;
			case "weak":
				this.setSearchTargetStrategy(this.weakStrategy);
				break;
			case "weakUser":
				this.setSearchTargetStrategy(this.weakUserStrategy);
				break;
			case "points":
				this.setSearchTargetStrategy(this.pointsStrategy);
				break;
			default:
				throw "Strategy '"+ strategy + "' does not exist. legitimate strategies include 'points', 'random', 'close', 'user', 'weak' and 'weakUser'";
				break;
				
		}
	},
	// TODO: comment
    setDifficulty: function(difficulty)
    {
        if (difficulty < 0) {
            throw ("Trying to set AI difficulty to below 0");
        } else if (difficulty >= AiConfig.difficulties.length) {
            throw ("Difficulties higher than " +
                   (AiConfig.difficulties.length-1) + " not supported.");
        } else {
            var diff = AiConfig.difficulties[difficulty];
            for (key in diff) {
                this[key] = diff[key];
            }
        }
    },
	// compares the numbers of the building from the ai with the player and returns true,
	// if the ai has more buildings then the player otherwise he returen false
	buildingAdvance: function()
	{
		var buildings = Main.levelScreen.getBuildings();
		var aiCountBuildings = 0;
		var userCountBuildings = 0;
		
		for ( var i = 0; i < buildings.length; i++) 
		{
			if (buildings[i].owner == this.player.name) {
				aiCountBuildings ++;
			} else if (buildings[i].owner == "user") {
				userCountBuildings ++;
			}
		}
		
		if ( aiCountBuildings > userCountBuildings ) {
			return true;
		} else {
			return false;
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
			
            if (this.player.getTotalStrength() >=
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
	// stops the ai from attack buildings
    stopAttack: function()
    {
       
		this.wavesSent = 0;
        if (!this.targetLock) {
            
			this.currentTarget = null;
        }
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
