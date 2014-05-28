/* UnitConfig: contains the stats of the units, and what buildings produce
   which units */
UnitConfig = function(type, level, attribute) 
{
    // TODO: add exception handling for this, so error messages become more
    // understandable
    return _UnitConfig[type][level][attribute];
}

GetBuildingSpawnTime = function(type) 
{
    return buildingSpawnTime[type];
}

GetBuildingDoorLocation = function(type) 
{
	var pos = buildingDoorLocation[type];
	return new me.Vector2d(pos[0], pos[1]);
}

GetBuildingSize = function(type) 
{
    return buildingSizes[type];
}

GetUnitSize = function(type) 
{
    return unitSizes[type];
}

GetUnit = function(type) 
{
    return _UnitConfig[type];
}

GetUnits = function() 
{
	var array = [];
	for(unit in _UnitConfig)
	{
		array.push(unit);
	}
	return array;
}

UnitForBuilding = function(type) 
{
    return unitForBuilding[type];
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
            attack: 24,
            defense: 20,
            speed: 6,
			animationSpeed: 100,
        },
        {
            attack: 48,
            defense: 40,
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
            buffLevel: 1.5,
        },
        {
            attack: 4,
            defense: 8,
            speed: 16,
            buffLevel: 2.0,
        },
    ],


}

 // TODO: buildings should have their own config objects
unitForBuilding =
{
	farm: "farmer",
	homestead: "knight",
	church: "monk",
}

buildingDoorLocation =
{
	farm: [44, 47],
	homestead: [35, 108],
	church: [71, 74],
}

buildingSizes =
{
	farm: 64,
	homestead: 128,
	church: 90,
}

unitSizes =
{
	farmer: 64,
	knight: 64,
	monk: 64,
}

buildingSpawnTime =
{
	farm: 1500,
	homestead: 3000,
	church: 6000,
}
