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
