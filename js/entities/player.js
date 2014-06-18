// Copyright 2014, Thomas van der Berg & Patrick Malissa
//
// This source code is distributed under the terms of the
// GNU General Public License v3 (see GPLv3.txt)

Main.Player = Object.extend(
{
    name: "", // string containing information about which player this is
    buildings: null, // array of buildings this player controls
    ai: null, // reference to the AI for this player, null if without AI
    armies: 0, // amount of armies on the field right now

    init: function(name, buildings, ai)
    {
        this.name = name;
        this.buildings = buildings;
        this.ai = ai;
        if (this.ai && !Constants.disableAI) {
            this.ai.setPlayer(this);
            me.game.add(this.ai);
        }
        this.armies = 0;
    },

    enableAI: function()
    {
        if (this.ai) {
            this.ai.enable();
        }
    },

    disableAI: function()
    {
        if (this.ai) {
            this.ai.disable();
        }
    },

    setDifficulty: function(difficulty)
    {
        if (this.ai) {
            this.ai.setDifficulty(difficulty);
        }
    },

    setStrategy: function(strategy)
    {
        if (this.ai) {
            this.ai.setAIStrategy(strategy);
        }
    },

    loseBuilding: function(building)
    {
        for (var i=0; i < this.buildings.length; i++)
        {
            if (this.buildings[i] === building) {
                this.buildings.splice(i, 1);
                break;
            }
        }
        if (this.ai) {
            this.ai.loseBuilding(building);
        }
        this.checkLose();
    },

    gainBuilding: function(building)
    {
        this.buildings.push(building);
        if (this.ai) {
            this.ai.gainBuilding(building);
        }
    },

    addArmy: function(army)
    {
        // temporary hack while we have to remember squads
        this.armies += army.squadArray.length;
        me.game.add(army);
    },

    removeArmy: function()
    {
        this.armies--;
        this.checkLose();
    },

    // returns total attack power of all owned buildings
    getTotalStrength: function()
    {
        var strength = 0;
        for (var i=0; i < this.buildings.length; i++)
        {
            strength += this.buildings[i].calculateAttackPower();
        }
        return strength;
		
    },


    checkLose: function()
    {
        if (this.buildings.length == 0 && this.armies <= 0) {
            switch(this.name)
            {
                case "user":
                Main.levelScreen.endLevel(false);
                break;
                case "comp1":
                // TODO: an enemy losing shouldn't mean you win
                Main.levelScreen.endLevel(true);
                break;
            }
        }
    },
});
