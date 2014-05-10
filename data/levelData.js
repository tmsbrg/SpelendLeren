//TODO: Make levelData in tmx format
levelData = [
    {
        name: "testmap",
        infotext: "test stuff with this map",
        background: "bg_level_01",
        buildings: [
            {type:"farm", x: 10, y: 10, owner: "user"},
            {type:"farm", x: 200, y: 200},
            {type:"farm", x: 150, y: 50},
            {type:"farm", x: 250, y: 80},
            {type:"farm", x: 100, y: 250, owner: "comp3"},
            {type:"farm", x: 400, y: 330, owner: "comp2"},
            {type:"farm", x: 480, y: 280, owner: "comp1"},
            {type:"farm", x: 500, y: 400, owner: "comp1"},
        ],
        startResources: 0,
        enemyTechLevel: 0,
    },
    {
        name: "tourney",
        infotext: "a map where everyone has equal chances",
        background: "bg_level_01",
        buildings: [
            {type:"farm", x: 100, y: 150, owner: "user"},
            {type:"farm", x: 100, y: 250, owner: "user"},

            {type:"farm", x: 200, y: 100},

            {type:"farm", x: 275, y: 50, owner: "comp2"},
            {type:"farm", x: 425, y: 50, owner: "comp2"},

            {type:"farm", x: 200, y: 300},

            {type:"farm", x: 350, y: 200, capacity: 2},

            {type:"farm", x: 500, y: 100},

            {type:"farm", x: 275, y: 350, owner: "comp3"},
            {type:"farm", x: 425, y: 350, owner: "comp3"},

            {type:"farm", x: 500, y: 300},

            {type:"farm", x: 600, y: 150, owner: "comp1"},
            {type:"farm", x: 600, y: 250, owner: "comp1"},
        ],
        startResources: 0,
        enemyTechLevel: 0,
    },
    {
        name: "tourney-duel",
        infotext: "a map where everyone has equal chances - duel mode",
        background: "bg_level_01",
        buildings: [
            {type:"farm", x: 100, y: 150, owner: "user"},
            {type:"farm", x: 100, y: 250, owner: "user"},

            {type:"farm", x: 200, y: 100},
            {type:"farm", x: 200, y: 300},

            {type:"farm", x: 350, y: 200, capacity: 2},

            {type:"farm", x: 500, y: 100},
            {type:"farm", x: 500, y: 300},

            {type:"farm", x: 600, y: 150, owner: "comp1"},
            {type:"farm", x: 600, y: 250, owner: "comp1"},
        ],
        startResources: 0,
        enemyTechLevel: 0,
    },
    {
        name: "homestead",
        infotext: "Map for testing the homestead",
        background: "bg_level_01",
        buildings: [
            {type:"homestead", x: 880, y: 20, owner: "user"},

            {type:"farm", x: 620, y: 80, capacity: 2},
            {type:"farm", x: 220, y: 30},
			{type:"farm", x: 280, y: 175},
			{type:"farm", x: 150, y: 380, capacity: 2},

            {type:"homestead", x: 448, y: 320, capacity: 15},

            {type:"farm", x: 380, y: 650, capacity: 2},
            {type:"farm", x: 720, y: 490},
			{type:"farm", x: 850, y: 650},
            {type:"farm", x: 850, y: 300, capacity: 2},

            {type:"homestead", x: 00, y: 640, owner: "comp1"},
        ],
        startResources: 0,
        enemyTechLevel: 0,
    }
]
