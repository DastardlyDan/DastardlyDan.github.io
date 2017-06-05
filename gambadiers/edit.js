var editState =
{
    preload: function () {

    },

    player: null,
    camera_follower: null,

    dbg: false,
    dbg_toggle: true,

    player_touchcontrol: null,

    map: null,
    layer: null,
    tileset: null,

    tilemap: null,
    worldBounds: new Phaser.Rectangle(0, 0, 4096, 2048),

    background: null,

    player: null,

    playerCollisionGroup: null,
    entityCollisionGroup: null,
    tileCollisionGroup: null,
    touchControlsGroup: null,

    touch_area_left: new Phaser.Rectangle(0, browsersize.height / 5, browsersize.width / 4, browsersize.height / 1.3),
    touch_area_right: new Phaser.Rectangle(browsersize.width - (browsersize.width / 4), browsersize.height / 5, browsersize.width / 3, browsersize.height / 1.3),
    touch_area_jump: new Phaser.Rectangle(browsersize.width / 4, browsersize.height - (browsersize.height / 6), browsersize.width / 2, browsersize.height / 3),

    mode: "pan",
    tool: "pan",
    gamemode: "edit",

    resizeGame: function()
    {
        game.scale.setGameSize(window.innerWidth, window.innerHeight);
    },

    create: function ()
    {
        //game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
        //game.scale.setGameSize(window.innerWidth, window.innerHeight);
        game.world.setBounds(0, 0, this.worldBounds.width, this.worldBounds.height);
        game.stage.backgroundColor = "#999999";
        game.stage.smoothed = false;

        //Arcade Physics
        //game.physics.startSystem(Phaser.Physics.ARCADE);
        game.physics.arcade.setBoundsToWorld(true, true, true, true, false);
        game.physics.arcade.gravity.y = 10000;

        this.background = game.add.tileSprite(0, 0, this.worldBounds.width, this.worldBounds.height, 'background');

        layer_background = game.add.group();
        layer_tiles = game.add.group();
        layer_entities = game.add.group();

        this.tilemap = TileMap.create(new Phaser.Point(this.worldBounds.width / 2, this.worldBounds.height / 2), this.worldBounds);
        this.tilemap.setMode("edit");

        layer_tiles.autoCull = true; //Enable autoCull for performance reasons.

        this.camera_follower = game.add.sprite(this.worldBounds.width / 2, this.worldBounds.height / 2, 'debug_tile');
        this.camera_follower.anchor = new Phaser.Point(0.5, 0.5);
        var cf_colour = Phaser.Color.createColor(1, 1, 0);
        this.camera_follower.tint = cf_colour.color32;
        //console.log(cf_colour.color32);
        this.camera_follower.alpha = 0.5;

        game.camera.follow(this.camera_follower, Phaser.Camera.FOLLOW_PLATFORMER, 0.05, 0.05);

        //this.player = Player.create(new Phaser.Point(this.worldBounds.width / 2, this.worldBounds.height / 2)); //replace with spawn point

    },

    addUIWidgets()
    {

    },

    toggleTool()
    {
        //console.log("function called");
        if(this.tool == "pan")
        {
            this.tool = "brush";
            this.tilemap.tool = "brush";
            this.mode = "tool";
        }
        else if (this.tool == "brush")
        {
            this.tool = "eraser";
            this.tilemap.tool = "eraser";
            this.mode = "tool";
        }
        else if (this.tool == "eraser")
        {
            this.tool = "pan";
            this.tilemap.tool = "pan";
            this.mode = "pan";
        }

        console.log("Tool:" + this.tool + "\t Mode:" + this.mode);
    },

    toggleGameMode()
    {
        if(this.gamemode == "edit")
        {
            this.camera_follower.alpha = 0.0;
            this.player = Player.create(this.camera_follower.position);
            game.camera.follow(this.player._sprite, Phaser.Camera.FOLLOW_PLATFORMER, 0.1, 0.1);

            this.gamemode = "play";
            this.tilemap.setMode("play");

        }
        else if (this.gamemode == "play")
        {
            this.camera_follower.alpha = 0.5;
            this.player.destroy();
            game.camera.follow(this.camera_follower, Phaser.Camera.FOLLOW_PLATFORMER, 0.05, 0.05);
            this.gamemode = "edit";
            this.tilemap.setMode("edit");
            
        }
        console.log(this.gamemode);
    },

    updatePlayerTouchControls: function () {

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

    update: function () {

        //INPUT

        //temp change mode key
        if (key_1.isDown)
        {
            this.tilemap.tool = "none";
            this.mode = "pan";
        }
        if (key_2.isDown)
        {
            this.tilemap.tool = "brush";
            this.mode = "tool";
        }
        if (key_3.isDown)
        {
            this.tilemap.tool = "eraser";
            this.mode = "tool";
        }

        if (key_dbg.isUp)
        {
            this.dbg_toggle = true;
        }
        if (key_dbg.isDown && this.dbg_toggle)
        {
            this.dbg = !this.dbg;
            this.dbg_toggle = false;
        }

        //console.log(this.dbg);

        game.physics.arcade.collide(layer_entities, layer_tiles);

        if (this.mode == "pan")
        {
            if (this.tool == "pan")
            {
                this.moveCameraByPointer();
            }
        }
        

        this.tilemap.update();
        
        if (this.gamemode == "play")
        {
            this.updatePlayerTouchControls();
            this.player.update();
        }


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

        //this.player.render();

        if (this.dbg) {


            game.debug.text(build, window.innerWidth - 128, 16);
            game.debug.cameraInfo(game.camera, 4, 32);
            //game.debug.spriteInfo(this.player._sprite, 4, 128);

            game.debug.text("Selected Tile Pos: [" + this.tilemap.selected_tile_pos.x + "," + this.tilemap.selected_tile_pos.y + "]", 2, 256);
            game.debug.text("Selected Tile Index: [" + this.tilemap.selected_tile_index.x + "," + this.tilemap.selected_tile_index.y + "]", 2, 272);
            game.debug.pointer(game.input.activePointer);

            game.debug.text(renderer + ":" + fps + "\t" + dbg_dt + "ms", 2, 16, fps_colour);

        }

    },

    moveCameraByPointer: function()
    {

        if (game.input.activePointer.isDown)
        {
            var p_vector = new Phaser.Point(0.0, 0.0);
            p_vector.x = game.input.activePointer.worldX;
            p_vector.y = game.input.activePointer.worldY;
            var p_camera_follower = this.camera_follower.position;
            var p_distance = new Phaser.Point(0.0,0.0);
            var p_final = new Phaser.Point(0.0,0.0);

            //console.log(p_vector);
            //p_distance = 
            //p_distance.clamp(0, 64);
            //console.log("AP X:" + game.input.activePointer.worldX + " Y:" + game.input.activePointer.worldY);

            //p_vector.subtract(p_vector, p_camera_follower, p_distance);
            Phaser.Point.subtract(p_vector, p_camera_follower, p_distance);
            var p_multiply = new Phaser.Point(0.05,0.05);
            Phaser.Point.multiply(p_distance, p_multiply, p_distance);

            //console.log("P_Vector: " + p_vector.toString());
            //console.log("P_CF: " + p_camera_follower.toString());
            //console.log("P_Distance: " + p_distance.toString());

            Phaser.Point.add(p_camera_follower, p_distance, p_final);

            this.camera_follower.position = p_final;

            
        }
    },
}