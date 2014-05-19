/* UnitConfig: contains the stats of the units, and what buildings produce
   which units */
UnitConfig = function(type, level, attribute) {
    // TODO: add exception handling for this, so error messages become more
    // understandable
    return _UnitConfig[type][level][attribute];
}

GetBuildingSpawnTime = function(type) {
    return _UnitConfig.buildingSpawnTime[type];
}

GetBuildingSize = function(type) {
    return _UnitConfig.buildingSizes[type];
}

GetUnitSize = function(type) {
    return _UnitConfig.unitSizes[type];
}

UnitForBuilding = function(type) {
    return _UnitConfig.unitForBuilding[type];
}

_UnitConfig =
{
    farmer:
    [
        {
            attack: 11,
            defense: 9,
            speed: 10,
			animationSpeed: 100,
			
        },
        {
            attack: 22,
            defense: 18,
            speed: 20,
        },
    ],
    knight:
    [
        {
            attack: 16,
            defense: 14,
            speed: 6,
			animationSpeed: 100,
        },
        {
            attack: 32,
            defense: 28,
            speed: 12,
        },
    ],
    monk:
    [
        {
            attack: 2,
            defense: 4,
            speed: 6,
			animationSpeed: 100,
        },
        {
            attack: 4,
            defense: 8,
            speed: 16,
        },
    ],

    // TODO: buildings should have their own config objects
    unitForBuilding:
    {
        farm: "farmer",
        homestead: "knight",
        church: "monk"
    },

    buildingSizes:
    {
        farm: 64,
        homestead: 128,
        church: 90,
    },
	
	unitSizes:
	{
		farmer: 64,
		knight: 64,
		monk: 64,
	},
	
	buildingSpawnTime:
    {
        farm: 1000,
        homestead: 3000,
        church: 6000,
    },
}
