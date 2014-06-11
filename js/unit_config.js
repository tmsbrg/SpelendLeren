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
    return new me.Vector2d(buildingSizes[type][0], buildingSizes[type][1]);
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

// compare function for units
CompareUnits = function(u1, u2)
{
    var units = GetUnits();
    var v1;
    for (var i=0; i<units.length; i++)
    {
        if (u1 == units[i]) {
            v1 = i;
            break;
        }
    }
    var v2;
    for (var i=0; i<units.length; i++)
    {
        if (u2 == units[i]) {
            v2 = i;
            break;
        }
    }
    if (v1 == undefined ) {
        throw "Error: "+ v1 +" is not a unit type";
    } else if (v2 == undefined) {
        throw "Error: "+ v2 +" is not a unit type";
    }
    return v1 - v2;
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
	mounted_knight:
    [
        {
            attack: 36,
            defense: 22,
            speed: 10,
			animationSpeed: 40,
           
        },
        {
            attack: 60,
            defense: 56,
            speed: 19,
            
        },
    ],
}

 // TODO: buildings should have their owen config objects
unitForBuilding =
{
	farm: "farmer",
	homestead: "knight",
	church: "monk",
	castle: "mounted_knight"
}

buildingDoorLocation =
{
	farm: [44, 47],
	homestead: [35, 108],
	church: [71, 74],
	castle: [156, 136],
}

buildingSizes =
{
	farm: [64, 64],
	homestead: [128, 128],
	church: [90, 90],
	castle: [256, 189],
}

unitSizes =
{
	farmer: 64,
	knight: 64,
	monk: 64,
	mounted_knight: 80,
}

buildingSpawnTime =
{
	farm: 1500,
	homestead: 3000,
	church: 6000,
	castle: 4500,
}
