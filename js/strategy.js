// We can also leverage the power of Prototypes in Javascript to create
// classes that act as strategies.
//
// Here, we create an abstract class that will serve as the interface
// for all our strategies. It isn't needed, but it's good for documenting
// purposes.
var Strategy = function() {};
 
Strategy.prototype.execute = function() 
{
	throw new Error('Strategy#execute needs to be overridden.')
};
 
