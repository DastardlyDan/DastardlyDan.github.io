var TileMap = 
 {
     dimensions: null,
     int_dimensions: null,
     texture: null,
     tiles: null,
     sprite: null,
     size: 64,
     marker: null,

     //TILE EDITING
     selected_tile_index: 0,
     selected_tile_pos: null,

     create: function(_dimensions)
     {
         var obj = Object.create(this);
         obj.dimensions = _dimensions;
         obj.int_dimensions = new Phaser.Rectangle(0, 0, (obj.dimensions.width / obj.size), (obj.dimensions.height / obj.size));
         obj.texture = new Phaser.RenderTexture(game, _dimensions.width, _dimensions.height);
         obj.sprite = game.add.sprite(0, 0, obj.texture);
         obj.selected_tile_pos = new Phaser.Point(0, 0);
         obj.marker = game.add.graphics();
         obj.init();

         return obj;
     },

     init: function()
     {
         layer_tiles.add(this.sprite);
         layer_tiles.add(this.marker);
         this.tiles = [];

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
         //console.log(this);
         this.marker.lineStyle(2, 0x000000, 4);
         this.marker.drawRect(0, 0, this.size, this.size);
         this.updateTexture();
     },

     loadCSV: function()
     {

     },

     update: function()
     {
         //get selected tile int
         var int_x, int_y;

         int_x = Math.floor((game.math.snapToFloor(game.input.activePointer.x, this.size) / this.size));// * worldScale);
         if (int_x >= 0 && int_x <= this.int_dimensions.width)
         {
             this.selected_tile_pos.x = int_x;
         }
         int_y = Math.floor((game.math.snapToFloor(game.input.activePointer.x, this.size) / this.size));// * worldScale);
         if (int_y >= 0 && int_y <= this.int_dimensions.height)
         {
             this.selected_tile_pos.y = int_y;
         }
         //console.log("INTS: " + int_x + "," + int_y);

         //console.log(this.selected_tile_pos);

         this.marker.x = this.selected_tile_pos.x * this.size;
         this.marker.y = this.selected_tile_pos.y * this.size;

         //now get selected tile index in array!
         this.selected_tile_index = (this.selected_tile_pos.x) * (this.selected_tile_pos.y);
     },

     updateTexture: function()
     {
         //LOOP THROUGH OUR ARRAY AND DRAW EACH SPRITE USING RENDERRAWXY
         //this.texture.renderRawXY(tiles[], tiles[y][x].x, tiles[y][x].y, false)
         for (var i = 0; i < this.tiles.length; i++)
         {
             this.tiles[i].visible = true;
             this.texture.renderRawXY(this.tiles[i], this.tiles[i].x, this.tiles[i].y, false);
             this.tiles[i].visible = false;
         }

         //this.sprite.tint = 0xEE00EE;

     },

     exportCSV: function()
     {

     },






 }