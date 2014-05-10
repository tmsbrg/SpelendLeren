/* UnitConfig: contains the stats of the units, and what buildings produce
   which units */
UnitConfig = function(type, level, attribute) {
    return _UnitConfig[type][level][attribute];
}

GetBuildingSize = function(type) {
    return _UnitConfig.buildingSizes[type];
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
    ],
    knight:
    [
        {
            attack: 16,
            defense: 14,
            speed: 6,
			animationSpeed: 130,
        },
    ],
    monk:
    [
        {
            attack: 2,
            defense: 4,
            speed: 6,
			animationSpeed: 250,
        },
    ],

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
        church: 64
    },
}
