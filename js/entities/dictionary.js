// Copyright 2014, Thomas van der Berg & Patrick Malissa
//
// This source code is distributed under the terms of the
// GNU General Public License v3 (see GPLv3.txt)

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

    removeKey: function(key)
    {
        delete this.dict[key];
    },

    values: function()
    {
        var values = [];

        for(var key in this.dict)
        {
            
            if(this.dict.hasOwnProperty(key)) 
            {
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
