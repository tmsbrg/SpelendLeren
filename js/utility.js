// Copyright 2014, Thomas van der Berg & Patrick Malissa
//
// This source code is distributed under the terms of the
// GNU General Public License v3 (see GPLv3.txt)

function printXML(doc)
{
    console.log(doc.localName);
    console.log(doc.attributes);

    for (var i=0; i<doc.childElementCount; i++) {
        printXML(doc.children[i]);
    }
    console.log("/"+doc.localName);
}

// returns Melon identifiable image name for given path
function srcToImageName(path)
{
    return path.substring(path.lastIndexOf("/")+1, path.lastIndexOf("."))
}

// linear interpolation
function lerp(a, b, t)
{
    return a + t * (b - a);
}

// returns an array enumerating the values from 0 to (n - 1)
function getRange(n)
{
    var array = [];
    
    for (var i = 0; i < n; i++)
    {
        array.push(i)
    }
    
    return array;
}