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
    ]
}

// returns a value based on the importance of the building
GetBuildingPoints = function(buildingType)
{
	switch(buildingType)
	{
		case "farm":
			return 0.2;
			break;
		case "homestead":
			return 0.5;
			break;
		case "church":
			return 0.7;
			break;
		case "castle":
			return 1;
			break;
		default:
			return 0;
			console.log("error: "+ buildingType);
			break;
	}
};