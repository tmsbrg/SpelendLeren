//TODO: Make levelData in tmx format
levelData = [
    {
        name: "testmap",
        infotext: "test stuff with this map",
        background: "bg",
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
        background: "bg",
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
        background: "bg",
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
        background: "bg",
        buildings: [
            {type:"homestead", x: 50, y: 250, owner: "user"},

            {type:"farm", x: 200, y: 150},
            {type:"farm", x: 200, y: 450},

            {type:"farm", x: 425, y: 300, capacity: 2},

            {type:"farm", x: 650, y: 150},
            {type:"farm", x: 650, y: 450},

            {type:"homestead", x: 800, y: 250, owner: "comp1"},
        ],
        startResources: 0,
        enemyTechLevel: 0,
    }
]
