// Let's subclass
// Notice that the parent class
// requires its children to override the execute method.
// subclass of strategy
var SearchTargetStrategy = function() {};
SearchTargetStrategy.prototype = Object.create(Strategy.prototype);
 
// Here is the `execute` method, which is part of the public interface of
// our Strategy-based objects. Notice how I implemented this method in term of
// of other methods. This pattern is called a Template Method
SearchTargetStrategy.prototype.execute = function(player) 
{
	return this.search(player)
}
 
SearchTargetStrategy.prototype.search = function(player) 
{
	var buildings = Main.levelScreen.getBuildings();
	var i = Math.round(Math.random() * (buildings.length-1));
	var start_i = i;
	
	while (buildings[i].owner === player.name)
	{
		i = (i + 1) % buildings.length;
		if (i == start_i) {
			return null;
		}
	}
	return buildings[i];
}
 
/*SearchTargetStrategy.prototype.sayBye = function() 
{
	return "Goodbye.";
};
*/

// searching from on of his buildings for the closest building which is not owend by the player and returns it
var SearchClosestTargetStrategy = function() {};
SearchClosestTargetStrategy.prototype = Object.create(SearchTargetStrategy.prototype);
SearchClosestTargetStrategy.prototype.search = function(player) 
{
	console.log("look for target");
	var buildings = Main.levelScreen.getBuildings();
	var ownBuidling = null; 
	for (var i = 0; i < buildings.length - 1; i++)
	{
		if (buildings[i].owner == player.name) {
			ownBuidling = buildings[i];
			break;
		}
	}
	
	var buildingsPos = ownBuidling.pos;
	var minDistance = 1000;
	var currentTarget = null;
	for (var i = 0; i < buildings.length; i++)
	{
		if (buildings[i].owner != player.name) {
			var distance = buildingsPos.distance(buildings[i].pos)
			
			if (distance < minDistance) {
				minDistance = distance;
				currentTarget = buildings[i];
			}
		}
	}
	console.log(currentTarget);
	return currentTarget;
}
