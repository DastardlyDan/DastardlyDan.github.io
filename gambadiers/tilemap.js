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
         //this.setBordersVisible();
         //this.updateTexture();
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

     loadTilemap: function(url)
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

     },

     exportCSV: function()
     {

     },






 }