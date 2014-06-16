AiConfig =
{
	difficulties: [
        {
            alwaysInactive : true,
        },
        {
            timeUntilWave : 16000,
            targetLock: true
        },
        {
            timeUntilWave : 12000,
            targetLock: true
        },
        {
            timeUntilWave : 8000,
            wavesToSend : 2,
        },
        {
            timeUntilWave : 6000,
            wavesToSend : 3,
        },
    ],

    // how important each factor is in determining what enemy to attack,
    // only used when using the (default) Points strategy for the AI
    factors:
    {
	    distanceFactor: 20,
	    buildingTypeFactor: 30,
	    defenceFactor:  50,
        // TODO: add random factor
        // TODO: add player factor
        // TODO: add ability to have different factors for different
        //       difficulties
    },

    buildingTypePoints:
    {
        farm: 0.1,
        homestead: 0.3,
        church: 0.7,
        castle: 1,
    },
}

// returns a value based on the importance of the building
GetBuildingPoints = function(buildingType)
{
    var points = AiConfig.buildingTypePoints[buildingType];
    if (points === undefined) {
        throw ("Trying to get building points for an unknown building type");
    } else {
        return points;
    }
};
