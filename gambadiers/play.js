var playState =
{
    
    preload: function ()
    {

    },

    player: null,

    player_touchcontrol: null,

    map: null,
    layer: null,
    tileset: null,

    tilemap: null,
    worldBounds: new Phaser.Rectangle(0,0,4096,2048),

    background: null,

    player: null,

    playerCollisionGroup: null,
    entityCollisionGroup: null,
    tileCollisionGroup: null,
    touchControlsGroup: null,

    touch_area_left: new Phaser.Rectangle(0, browsersize.height / 5, browsersize.width / 4, browsersize.height / 1.3),
    touch_area_right: new Phaser.Rectangle(browsersize.width - (browsersize.width / 4), browsersize.height / 5, browsersize.width / 3, browsersize.height / 1.3),
    touch_area_jump: new Phaser.Rectangle(browsersize.width / 4, browsersize.height - (browsersize.height / 6), browsersize.width / 2, browsersize.height / 3),

    create: function ()
    {

        game.world.setBounds(0, 0, this.worldBounds.width, this.worldBounds.height);
        game.stage.backgroundColor = "#999999";
        game.stage.smoothed = false;

        //Arcade Physics
        //game.physics.startSystem(Phaser.Physics.ARCADE);
        game.physics.arcade.setBoundsToWorld(true, true, true, true, false);
        game.physics.arcade.gravity.y = 40000;

        this.background = game.add.tileSprite(0, 0, this.worldBounds.width, this.worldBounds.height, 'background');

        layer_background = game.add.group();
        layer_tiles = game.add.group();
        layer_entities = game.add.group();
        this.tilemap = TileMap.create(new Phaser.Point(this.worldBounds.width / 2, this.worldBounds.height / 2), this.worldBounds);

        layer_tiles.autoCull = true; //Enable autoCull for performance reasons.

        this.player = Player.create(new Phaser.Point(this.worldBounds.width / 2, this.worldBounds.height / 2)); //replace with spawn point

    },

    updatePlayerTouchControls: function ()
    {

        player_touchcontrol.left = false;
        player_touchcontrol.right = false;
        player_touchcontrol.jump = false;

        var left_bool = false;
        var right_bool = false;
        var jump_bool = false;

        //LEFT ZONE CHECK

        //console.log(touch_area_left);

        var touch_point = new Phaser.Point(game.input.activePointer.x, game.input.activePointer.y);

        //LEFT
        //X
        if (game.input.activePointer.x >= touch_area_left.left && game.input.activePointer.x <= touch_area_left.right) {
            //Y
            if (game.input.activePointer.y >= touch_area_left.top && game.input.activePointer.y <= touch_area_left.bottom) {
                if (game.input.activePointer.isDown) {
                    left_bool = true;
                }
            }
        }
        else if (game.input.activePointer.x >= touch_area_right.left && game.input.activePointer.x <= touch_area_right.right) {
            //Y
            if (game.input.activePointer.y >= touch_area_right.top && game.input.activePointer.y <= touch_area_right.bottom) {
                if (game.input.activePointer.isDown) {
                    right_bool = true;
                }
            }
        }
        //JUMP
        //X
        if (game.input.activePointer.x >= touch_area_jump.left && game.input.activePointer.x <= touch_area_jump.right) {
            //Y
            if (game.input.activePointer.y >= touch_area_jump.top && game.input.activePointer.y <= touch_area_jump.bottom) {
                if (game.input.activePointer.isDown) {
                    jump_bool = true;
                }
            }
        }

        player_touchcontrol.left = left_bool;
        player_touchcontrol.right = right_bool;
        player_touchcontrol.jump = jump_bool;

    },

    update: function ()
    {

        //INPUT

        //temp change mode key
        if (key_1.isDown)
        {
            this.tilemap.tool = "brush";
        }
        if (key_2.isDown)
        {
            this.tilemap.tool = "eraser";
        }

        game.physics.arcade.collide(layer_entities, layer_tiles);

        this.tilemap.update();
        //updatePlayerTouchControls();
        this.player.update();

        fps = game.time.fps || '--';

        if (fps > 27) {
            fps_colour = dbg_colours.good;
        }
        else if (fps > 19) {
            fps_colour = dbg_colours.okay;
        }
        else {
            fps_colour = dbg_colours.bad;
        }

        dbg_dt = game.time.elapsedMS;
    },

    render: function ()
    {

        this.player.render();

        game.debug.text(build, window.innerWidth - 128, 16);
        game.debug.cameraInfo(game.camera, 4, 32);
        game.debug.spriteInfo(this.player._sprite, 4, 128);

        game.debug.text("Selected Tile Pos: [" + this.tilemap.selected_tile_pos.x + "," + this.tilemap.selected_tile_pos.y + "]", 2, 256);
        game.debug.text("Selected Tile Index: [" + this.tilemap.selected_tile_index.x + "," + this.tilemap.selected_tile_index.y + "]", 2, 272);
        game.debug.pointer(game.input.activePointer);

        game.debug.text(renderer + ":" + fps + "\t" + dbg_dt + "ms", 2, 16, fps_colour);

    },

}
