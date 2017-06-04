var editState =
{
    player: null,

    player_touchcontrol: null,

    map: null,
    layer: null,
    tileset: null,

    tilemap: null,
    worldBounds: Vector.create(4096, 2048),

    playerCollisionGroup: null,
    entityCollisionGroup: null,
    tileCollisionGroup: null,
    touchControlsGroup: null,

    touch_area_left: new Phaser.Rectangle(0, browsersize.height / 5, browsersize.width / 4, browsersize.height / 1.3),
    touch_area_right: new Phaser.Rectangle(browsersize.width - (browsersize.width / 4), browsersize.height / 5, browsersize.width / 3, browsersize.height / 1.3),
    touch_area_jump: new Phaser.Rectangle(browsersize.width / 4, browsersize.height - (browsersize.height / 6), browsersize.width / 2, browsersize.height / 3),

    preload: function ()
    {

    },

    create: function ()
    {

        game.world.setBounds(0, 0, worldBounds.getX(), worldBounds.getY());
        game.stage.backgroundColor = "#999999";
        game.stage.smoothed = false;

        //Create a Game World LAYER / GROUP so the camera can zoom
        gameWorld = game.add.group();
        gameWorld.position.setTo(game.world.centerX, game.world.centerY);

        //Arcade Physics
        //game.physics.startSystem(Phaser.Physics.ARCADE);
        game.physics.arcade.setBoundsToWorld(true, true, true, true, false);
        game.physics.arcade.gravity.y = 40000;

        background = game.add.tileSprite(0, 0, worldBounds.getX(), worldBounds.getY(), 'background');

        layer_background = game.add.group();

        layer_tiles = game.add.group();
        layer_entities = game.add.group();

        tilemap = TileMap.create(new Phaser.Point(worldBounds.getX() / 2, worldBounds.getY() / 2), new Phaser.Rectangle(0, 0, 4096, 2048));

        layer_tiles.autoCull = true; //Enable autoCull for performance reasons.

    },

    update: function ()
    {

        //INPUT

        //temp change mode key
        if (key_1.isDown) {
            tilemap.tool = "brush";
        }
        if (key_2.isDown) {
            tilemap.tool = "eraser";
        }
        game.physics.arcade.collide(layer_entities, layer_tiles);

        tilemap.update();
        //updatePlayerTouchControls();
        player.update();

        game.input.mouse.mouseWheelCallback = mouseWheel;

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

        player.render();

        game.debug.text("build 1a", window.innerWidth - 128, 16);
        game.debug.cameraInfo(game.camera, 4, 32);
        game.debug.spriteInfo(player._sprite, 4, 128);

        game.debug.text("Selected Tile Pos: [" + tilemap.selected_tile_pos.x + "," + tilemap.selected_tile_pos.y + "]", 2, 256);
        game.debug.text("Selected Tile Index: [" + tilemap.selected_tile_index.x + "," + tilemap.selected_tile_index.y + "]", 2, 272);
        game.debug.pointer(game.input.activePointer);

        game.debug.text(renderer + ":" + fps + "\t" + dbg_dt + "ms", 2, 16, fps_colour);

    },
}