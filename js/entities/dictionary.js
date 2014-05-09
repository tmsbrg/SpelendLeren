Main.Dictionary = Object.extend(
{
    dict: null,

    init: function()
    {
        this.dict = {};
    },

    getValue: function(key)
    {
        return this.dict[key];
    },

    setValue: function(key, value)
    {
        this.dict[key] = value;
    },

    values: function()
    {
		var values = [];

		for(var key in this.dict)
		{
			
			if(this.dict.hasOwnProperty(key)) {
				values.push(this.dict[key]);
			}
		}

		return values;
    },

    keys: function()
    {
		var keys = [];

		for(var key in this.dict)
		{	
			if(this.dict.hasOwnProperty(key))
			{
				keys.push(key);
			}
		}
		return keys;
    },
});
