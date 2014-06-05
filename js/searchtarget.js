// Greeter is a class of object that can greet people.
// It can learn different ways of greeting people through
// 'Strategies.'

 
// Greeter provides a greet function that is going to
// greet people using the Strategy passed to the constructor.

// We can already try out our Strategy. It requires a little tweak in the
// Greeter class before, though.

var SearchTarget = function(strategy) 
{
	this.strategy = strategy;
};

SearchTarget.prototype.search = function(player) 
{
	return this.strategy.execute(player);
};


