/* TileImage: draws one tile of a tileset */
Main.TileImage = Main.Image.extend(
{
    offsetX: 0,
    offsetY: 0,

    init: function(x, y, image, w, h, tileNumber)
    {
        if (tileNumber == null) {
            tileNumber = 0;
        }
        this.parent(x, y, image, w, h);
        this.setTileNumber(tileNumber);
    },

    loadImage: function(image)
    {
        this.parent(image);
        this.setTileNumber(0);
    },

    setTileNumber: function(tileNumber)
    {
        this.tileNumber = tileNumber;
        this.offsetX = (tileNumber * this.width) % this.image.naturalWidth;
        this.offsetY = Math.floor((tileNumber * this.width) /
                                   this.image.naturalWidth) * this.height;
    },

    draw: function(ctx)
    {
        ctx.drawImage(this.image, this.offsetX, this.offsetY,
                      this.width, this.height,
                      this.pos.x, this.pos.y, this.width, this.height);
    },
});
