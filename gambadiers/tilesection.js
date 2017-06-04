var TileSection =
 {
     size: 64, //tile sprite size in pixels
     int_dimensions: null, //int dimensions 4x4
     dimensions: null, //pixel dimensions 256,256
     tiles: null, //2D array of tile data objects
     texture: null,
     sprite: null,
     colour: null,
     tilesprite: null,

     create: function (_int_dimensions, _dimensions, _size)
     {
         var obj = Object.create(this);
         obj.int_dimensions = _int_dimensions;
         obj.dimensions = _dimensions;
         obj.size = _size;
         obj.tilesprite = game.make.sprite(0, 0, 'debug_tile');

         if (oddOrEven(obj.int_dimensions.y + obj.int_dimensions.x))
         {
             obj.colour = Phaser.Color.createColor((obj.int_dimensions.y+1 * 2) / 0.5, 255, (obj.int_dimensions.x+1 * 2) / 0.5, 1);
         }
         else
         {
             obj.colour = Phaser.Color.createColor((obj.int_dimensions.y+1 * 4), 255, (obj.int_dimensions.x+1 * 4), 1);
         }

         obj.init();
         return obj;
     },

     init: function ()
     {
         this.generate();
     },

     generate: function ()
     {
         this.generateTileArray();
         this.generateTexture();
         this.generateSprite();
         this.updateTexture(); //first time run, generate texture
         this.addToLayer();
     },

     generateTileArray: function ()
     {
         this.tiles = []; //create blank array 

         //add tiles as a 2D array [y][x], tiledata objects
         for (var y = 0; y < this.int_dimensions.height; y++)
         {
             var row = []; //make a blank new array for each row
             for (var x = 0; x < this.int_dimensions.width; x++)
             {
                 //fill this row
                 //64 * 0, *1, *2, *3, 
                 //var tile = game.make.sprite((x * this.size), (y * this.size), 'debug_tile'); //raw x y positions for rendering to textures (not world space)

                 var pos = new Phaser.Point(0,0);
                 var shape = 1;
                 var colour = Phaser.Color.createColor(255,255,255);

                 
                 if (oddOrEven(y + x))
                 {
                     colour = Phaser.Color.createColor(230, 230, 230);
                 }
                 
                 var tile = Tile.create(pos, shape, colour);

                 //tile.visible = false;
                 //tile.autoCull = false;
                 //tile.kill();

                 row.push(tile);
             }
             //push row to array
             this.tiles.push(row);
         }
         //console.log(this.tiles);
     },

     generateTexture: function ()
     {
         this.texture = new Phaser.RenderTexture(game, this.dimensions.width, this.dimensions.height);
     },

     generateSprite: function ()
     {
         this.sprite = game.add.sprite(this.dimensions.x, this.dimensions.y, this.texture); //world positions of textures
         this.sprite.autoCull = false;
         //this.sprite.renderable = true;
     },

     addToLayer: function ()
     {
         //add tile section sprite to layer_tiles
         layer_tiles.add(this.sprite); //add the sprite for this section to layer_tile so scale can be applied
     },

     updateTexture: function ()
     {
         //create a temporary tile sprite to render
         //this.tilesprite.revive();
         this.tilesprite.visible = true;
         for (var y = 0; y < this.tiles.length; y++)
         {
             for (var x = 0; x < this.tiles[y].length; x++)
             {
                 //change texture based on shape here

                 this.tilesprite.tint = this.tiles[y][x].colour32; //set colour
                 //this.tiles[y][x].visible = true;
                 
                 this.texture.renderRawXY(this.tilesprite, this.tiles[y][x].index.x, this.tiles[y][x].index.y, false);
                 //this.tiles[y][x].visible = false;
             }
         }

         this.tilesprite.visible = false;
         this.sprite.tint = this.colour.color32;

         //this.tilesprite.killw

         /*
         //loop through 2D Internal tile Array and set visible, draw and then set back to invisible.
         for (var y = 0; y < this.tiles.length; y++)
         {
             for (var x = 0; x < this.tiles[y].length; x++)
             {
                 this.tiles[y][x].visible = true;
                 this.texture.renderRawXY(this.tiles[y][x], this.tiles[y][x].x, this.tiles[y][x].y, false);
                 this.tiles[y][x].visible = false;
             }
             
         }
         //console.log(this.colour.color32);
         this.sprite.tint = this.colour.color32;
         */
     },

};