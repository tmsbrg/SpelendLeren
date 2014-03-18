//TODO: Make levelData in tmx format
levelData = [
    {
        name: "testmap",
        infotext: "test stuff with this map",
        background: "bg",
        buildings: [
            {type:"farm", x: 10, y: 10, owner: Constants.players.user},
            {type:"farm", x: 200, y: 200},
            {type:"farm", x: 150, y: 50},
            {type:"farm", x: 250, y: 80},
            {type:"farm", x: 100, y: 250},
            {type:"farm", x: 400, y: 330},
            {type:"farm", x: 480, y: 280},
            {type:"farm", x: 500, y: 400, owner: Constants.players.comp1},
        ],
        startResources: 0,
        enemyTechLevel: 0,
    }
]
