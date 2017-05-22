var TileMap = 
 {
     position: null,
     dimensions: null,
     int_dimensions: null,
     texture: null,
     tiles: null, //2D array of tile sections (4x4 tiles with render texture)
     sprite: null, //2D 
     size: 64,

     tile_section_textures: null,
     tile_section_sprites: null,
     tile_section_dimensions: null,

     //TILE EDITING
     selected_tile_index: 0,
     selected_tile_pos: null,

     create: function(_position, _dimensions)
     {
         var obj = Object.create(this);
         obj.position = _position;
         obj.dimensions = _dimensions;
         obj.size = 64;
         obj.int_dimensions = new Phaser.Rectangle(0, 0, (obj.dimensions.width / obj.size), (obj.dimensions.height / obj.size));
         obj.tile_section_dimensions = new Phaser.Rectangle(0, 0, obj.int_dimensions.width / 4, obj.int_dimensions.height / 4);

         /*
         obj.texture = new Phaser.RenderTexture(game, _dimensions.width, _dimensions.height);
         obj.sprite = game.add.sprite(0, 0, obj.texture);
         obj.sprite.autoCull = false;
         obj.sprite.renderable = true;

         */

         obj.selected_tile_pos = new Phaser.Point(0, 0);
        
         obj.init();

         return obj;
     },

     init: function()
     {
         /*
         layer_tiles.add(this.sprite);
         layer_tiles.add(this.marker);
         */
         /*
         for(var y = 0; y < this.int_dimensions.height; y++)
         {
             for(var x = 0; x < this.int_dimensions.width; x++)
             {
                 var sprite = game.make.sprite((x * this.size), (y * this.size), 'debug_tile');

                 if (oddOrEven(y+x))
                 {
                    sprite.tint = 0xEEEEEE;
                 }
                 sprite.visible = false;   
                 this.tiles.push(sprite);
             }

         }

         */
         //console.log(this);
         //console.log(this.int_dimensions);
         //this.createTileSections();
         this.createTiles();
         this.setBordersVisible();
         this.updateTexture();
     },

     createTiles: function()
     {

         this.tiles = [];

         for (var y = 0; y < this.int_dimensions.height; y++)
         {

             var row = [];

             for (var x = 0; x < this.int_dimensions.width; x++)
             {

                 var colour;

                 if (oddOrEven(y + x)) {
                     colour = Phaser.Color.createColor((y+1 * 2) / 0.5, 255, (x+1 * 2) / 0.5, 1);
                 }
                 else {
                     colour = Phaser.Color.createColor((y+1 * 4), 255, (x+1 * 4), 1);
                 }

                 var tile = Tile.create(new Phaser.Point(x, y), new Phaser.Point(x * this.size, y * this.size), 1, colour);

                 row.push(tile);

             }

             this.tiles.push(row);

         }

         /*
         for (var y = 0; y < this.int_dimensions.height; y++)
         {

             for (var x = 0; x < this.int_dimensions.width; x++)
             {

                 console.log(this.tiles[y][x].sprite);

             }

         }
         */

         
     },

     createTileSections: function ()
     {
         //double for loop for sections row by row
         this.tiles = [];

         var integer_size = new Phaser.Rectangle(0,0,4,4);
         var float_size = new Phaser.Rectangle(0,0,256.0,256.0);
         
         for (var y = 0; y < this.tile_section_dimensions.height; y++)
         {
             var row = [];
             for (var x = 0; x < this.tile_section_dimensions.width; x++)
             {
                 //set integer positions for integer rect
                 integer_size.x = x * 4; 
                 integer_size.y = y * 4;
                 //set float positions (world space co-ords and screen size)
                 float_size.x = this.position.x + (this.dimensions.width * x);// * (this.size * integer_size.width); //256
                 float_size.y = this.position.y + (this.dimensions.height * y);// * (this.size * integer_size.width); //256
                 float_size.width = this.dimensions.width; //64*4 = 256
                 float_size.height = this.dimensions.height; //64*4 = 256

                 var section = TileSection.create(integer_size, float_size, this.size);
                 row.push(section);

             }
             this.tiles.push(row);
         }
         //console.log(this.tiles.length);
     },

     setBordersVisible: function()
     {
         //top row
         for (var i = 0; i < this.int_dimensions.width; i++)
         {
             this.tiles[0][i].sprite.alpha = 1.0;
             this.tiles[0][i].sprite.body.enable = true;
         }
         //bottom row
         for (var i = 0; i < this.int_dimensions.width; i++)
         {
             this.tiles[63][i].sprite.alpha = 1.0;
             this.tiles[63][i].sprite.body.enable = true;
         }

         //left col
         for (var i = 0; i < this.int_dimensions.height; i++)
         {
             this.tiles[i][0].sprite.alpha = 1.0;
             this.tiles[i][0].sprite.body.enable = true;
         }

         //right col
         for (var i = 0; i < this.int_dimensions.height; i++)
         {
             this.tiles[i][127].sprite.alpha = 1.0;
             this.tiles[i][127].sprite.body.enable = true;
         }

         

     },

     /*
     generateTextureSections: function()4
     {
         this.tile_section_textures = []; //create blank array

         //add render textures as a 2D array [y][x]
         for(var y = 0; y < this.int_dimensions.height; y++)
         {
             var row = []; //make a blank new array for each row
             for (var x = 0; x < this.int_dimensions.width; x++)
             {
                 //fill this row
                 var texture = new Phaser.RenderTexture(game, _dimensions.width, _dimensions.height);
                 row.push()
             }
             //push row to array
             this.tile_section_textures.push(row);
         }

     },
     */
     loadCSV: function()
     {

     },

     update: function()
     {
         
         for (var y = 0; y < this.int_dimensions.height; y++)
         {


             for (var x = 0; x < this.int_dimensions.width; x++)
             {
                 this.tiles[y][x].update();
             }

            

         }
         
     },

     updateTexture: function()
     {
         //LOOP THROUGH OUR ARRAY AND DRAW EACH SPRITE USING RENDERRAWXY
         //this.texture.renderRawXY(tiles[], tiles[y][x].x, tiles[y][x].y, false)

         //FOR WEBGL ON MOBILE, NEED TO SUBDIVIDE TILEMAP INTO SMALLER SECTIONS (512x512)
         /*
         for (var i = 0; i < this.tiles.length; i++)
         {
             this.tiles[i].visible = true;
             this.texture.renderRawXY(this.tiles[i], this.tiles[i].x, this.tiles[i].y, false);
             this.tiles[i].visible = false;
         }

         //this.sprite.tint = 0xEE00EE;
         */
     },

     exportCSV: function()
     {

     },






 }