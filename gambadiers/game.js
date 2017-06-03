var browsersize =
{
  width: window.innerWidth,
  height: window.innerHeight
}

var game = new Phaser.Game(browsersize.width, browsersize.height, Phaser.CANVAS, '', { preload: preload, create: create, update: update, render: render });
var url_textures = "assets/textures/";

function preload() {

    //game.scale.pageAlignHorizontally = true;
    //game.scale.pageAlignVertically = true;
    //game.scale.setScreenSize(true);

    game.load.image('background', url_textures + 'debug-64-repeat.png');
    game.load.image('player', url_textures + 'debug-player-64.png');
    game.load.image('debug_tile', url_textures + 'debug-tile.png');
    game.load.image('tiles', url_textures + 'tileset.png');

    game.load.tilemap('level', 'test2.csv', null, Phaser.Tilemap.CSV);

    game.time.desiredFps = 60;
    game.time.advancedTiming = true;



}

function adjust()
{
    //resize canvas to full screen
    var divgame = document.getElementById("game");
    divgame.style.width = window.innerWidth + "px"
    divgame.style.height = window.innerHeight + "px";
}

function resizeGame()
{
    game.scale.setGameSize(window.innerWidth, window.innerHeight);
}

var player;
var cursors;
var wasd;

var player_touchcontrol;

var dbg_dt;

var worldScale = 1.0; //float
var tileSize =
    {
        x: 64,
        y: 64
    };
var map;
var layer;
var tileset;
var tileMapCrop;
var tileMapRenderTexture;
var tileMapSprite;
var tilemap;
var Tiles = [];

//var worldBounds = Vector.create(8192,4096);
var worldBounds = Vector.create(4096,2048);
//var worldBounds = Vector.create(512,256);
var playerCollisionGroup;
var entityCollisionGroup;
var tileCollisionGroup;
var touchControlsGroup;

var touch_area_left = new Phaser.Rectangle(0, browsersize.height / 5, browsersize.width / 4, browsersize.height / 1.3);
var touch_area_right = new Phaser.Rectangle(browsersize.width - (browsersize.width / 4), browsersize.height/5, browsersize.width / 3, browsersize.height / 1.3);
var touch_area_jump = new Phaser.Rectangle(browsersize.width / 4, browsersize.height - (browsersize.height / 6), browsersize.width / 2, browsersize.height / 3);

var dbg_colours = 
{
    good: "#00FF00",
    okay: "#ffc800",
    bad:  "#ff0000",
};

var fps;
var fps_colour;

var renderer = 'Renderer: ';

window.onresize = function ()
{
    /*
    var height = window.innerHeight;
    var width = window.innerWidth;

    game.width = width;
    game.height = height;
    game.stage.bounds.width = width;
    game.stage.bounds.height = height;
    game.camera.setSize(width, height);
    */
    resizeGame();
    //adjust();

};


function create() 
{

    //game.scale.startFullScreen(true);
    //Phaser.ScaleManager.SHOW_ALL;
    game.world.setBounds(0, 0, worldBounds.getX(), worldBounds.getY());
    game.stage.backgroundColor = "#999999";

    //Create a Game World LAYER / GROUP so the camera can zoom
    gameWorld = game.add.group();
    gameWorld.position.setTo(game.world.centerX, game.world.centerY);
    
    //game.physics.startSystem(Phaser.Physics.ARCADE);

    //Arcade Physics
    //game.physics.startSystem(Phaser.Physics.ARCADE);
    //game.physics.arcade.setBoundsToWorld(true, true, true, true, false);
    //game.physics.arcade.gravity.y = 1000;

    //Enable P2 Physics Engine
    game.physics.startSystem(Phaser.Physics.P2JS);
    game.physics.p2.setBoundsToWorld(true, true, true, true);
    game.world.setBounds(0, 0, worldBounds.getX(), worldBounds.getY());
    //Turn on impact events for the world
    game.physics.p2.setImpactEvents(true);
    //Set Gravity
    game.physics.p2.gravity.y = 0;

    playerCollisionGroup = game.physics.p2.createCollisionGroup();
    entityCollisionGroup = game.physics.p2.createCollisionGroup();
    tileCollisionGroup = game.physics.p2.createCollisionGroup();

    //BACKGROUND SETUP
    background = game.add.tileSprite(0, 0, worldBounds.getX(), worldBounds.getY(), 'background');

    layer_background = game.add.group();
    game.physics.p2.updateBoundsCollisionGroup();

    //layer_background.add(background);
    layer_tiles = game.add.group();
    game.physics.p2.updateBoundsCollisionGroup();
    layer_entities = game.add.group();
    game.physics.p2.updateBoundsCollisionGroup();


    tilemap = TileMap.create(new Phaser.Point(worldBounds.getX() / 2, worldBounds.getY() / 2), new Phaser.Rectangle(0, 0, 4096, 2048));

    //game.physics.arcade.collide(layer_entities, layer_tiles);
    //game.physics.arcade.collide(layer_tiles, layer_entities);
    //layer_tiles.autoCull = true; //Enable autoCull for performance reasons.

    //ayer_tiles.inputEnableChildren = true;

    //layer_tiles.events.onInputDown.add(clickedTile, this);

    /*
    //http://phaser.io/sandbox/CrtqUQIr/play

    tileset = new Phaser.Tileset('tiles', 0, tileSize.x, tileSize.y, 0, 0);
    
    //tileMapCrop = new Phaser.Rectangle(0, 0, worldBounds.getX(), worldBounds.getY());

    map = game.add.tilemap('level');
    //map.addTilesetImage(tileset, , 32, 32, 0, 0);
    map.addTilesetImage('tileset','tiles',64,64,0,0);
    map.enableDebug = true;
    map.setTileSize(tileSize.x, tileSize.y);
    //map.set
    layer = game.make.tilemaplayer
    //layer = game.add.tilemaplay
    //layer = game.make.TilemapLayer(game, 
    //layer = map.createLayer(0, worldBounds.getX(), worldBounds.getY(), layer_tiles);
    //layer.width = game.world.width;
    //layer.height = game.world.height
    layer.fixedToCamera = false;
    layer.scrollFactorX = 0;
    layer.scrollFactorY = 0;
    layer.renderable = false;

    //tilemap.updateTexture(layer);

    */
    
    /*
    //layer.canvas.width = worldBounds.x;
    //layer.canvas.height = worldBounds.y;

    
    layer.position.set(0, 0);
    layer.renderSettings.enableScrollDelta = false;
    layer.autoCull = false;
    //layer.setFrame({ x: tileMapCrop.x, y: tileMapCrop.y, width: tileMapCrop.width, height: tileMapCrop.height });
    //layer.setFrame({ x: tileMapCrop.x, y: tileMapCrop.y, width: tileMapCrop.width, height: tileMapCrop.height });
    //layer.renderable = false;
    layer.renderable = true;
    //layer.resize(worldBounds.x, worldBounds.x);
    //layer.crop(new Phaser.Rectangle(worldBounds.x, worldBounds.y));
    //layer.resizeWorld();
    
    //layer.autoCull = false;
    //layer.alpha = 1;
    //layer.scaleMax = 10;
    //layer.scaleMax = 10;
    //layer.renderSettings.enableScrollDelta = false;
    //layer.debug = true;
    //layer.anchor = new Phaser.Point(0, 0);
    //layer.resizeWorld();
    //layer_tiles.add(layer);
    
    //layer.resizeWorld();

    //generateBoundTiles();
    */
    //PLAYER

    player = Player.create(Vector.create(worldBounds.getX() / 2, worldBounds.getY() / 2));

    cursors = game.input.keyboard.createCursorKeys();
   
    wasd = {

    up: game.input.keyboard.addKey(Phaser.Keyboard.W),
    down: game.input.keyboard.addKey(Phaser.Keyboard.S),
    left: game.input.keyboard.addKey(Phaser.Keyboard.A),
    right: game.input.keyboard.addKey(Phaser.Keyboard.D),

    };

    player_touchcontrol =
    {
        left: false,
        right: false,
        jump: false,
    };

    //console.log(cursors);
    //console.log(wasd);

	//game.camera.roundPX = true;

    //Add objects to gameWorld Group

    //gameWorld.add(layer_background);
    //gameWorld.add(layer_entities);
    //gameWorld.add(layer_tiles);
    //gameWorld.add(touchControlsGroup);

    //game.physics.arcade.collide(layer_entities);
    //game.physics.arcade.collide(layer_tiles);
    //game.physics.arcade.collide(player._sprite, layer_tiles); 

    //game.physics.p2.collides([playerCollisionGroup, tileCollisionGroup]);
    //game.physics.p2.collides([playerCollisionGroup, entityCollisionGroup]);

    /*
    for(var i = 0; i < Tiles.length; i++)
    {
        game.physics.arcade.collide(player.getSprite(), Tiles[i].getSprite());
    }
    */

    if(game.renderType == 0)
    {
        renderer = "AUTO";
    }
    else if(game.renderType == 1)
    {
        renderer = "CANVAS2D";
    }
    else if(game.renderType == 2)
    {
        renderer = "WEBGL";
    }
    else if(game.renderType == 3)
    {
        renderer = "HEADLESS";
    }

    //var render_resolution = " @ " + this.game.resolution;
    game.input.addPointer();
    game.input.addPointer();
    game.input.addPointer();
    game.input.addPointer();

    //touchControlsGroup.fixedToCamera = true;
    //gameWorld.bringToTop(layer_tiles);
    //gameWorld.bringToTop(layer_entities);
}

function updatePlayerTouchControls()
{
    player_touchcontrol.left = false;
    player_touchcontrol.right = false;
    player_touchcontrol.jump = false;

    var left_bool = false;
    var right_bool = false;
    var jump_bool = false;
    /*
    if(touch_area_left.contains(game.input.pointer.screenX,game.input.pointer.screenY))
    {
        left_bool = true;
    }

    if(touch_area_right.contains(game.input.pointer.screenX,game.input.pointer.screenY))
    {
        right_bool = true;
    }

    if(touch_area_jump.contains(game.input.pointer.screenX, game.input.pointer.screenY))
    {
        jump_bool = true;
    }
    */

    //LEFT ZONE CHECK

    //console.log(touch_area_left);

    var touch_point = new Phaser.Point(game.input.activePointer.x, game.input.activePointer.y);

    //LEFT
    //X
    if (game.input.activePointer.x >= touch_area_left.left && game.input.activePointer.x <= touch_area_left.right)
    {
        //Y
        if (game.input.activePointer.y >= touch_area_left.top && game.input.activePointer.y <= touch_area_left.bottom)
        {
            if (game.input.activePointer.isDown)
            {
                left_bool = true;
            }
        }
    }
    else if (game.input.activePointer.x >= touch_area_right.left && game.input.activePointer.x <= touch_area_right.right)
    {
        //Y
        if (game.input.activePointer.y >= touch_area_right.top && game.input.activePointer.y <= touch_area_right.bottom)
        {
            if (game.input.activePointer.isDown)
            {
                right_bool = true;
            }
        }
    }
    //JUMP
    //X
    if (game.input.activePointer.x >= touch_area_jump.left && game.input.activePointer.x <= touch_area_jump.right) {
        //Y
        if (game.input.activePointer.y >= touch_area_jump.top && game.input.activePointer.y <= touch_area_jump.bottom) {
            if (game.input.activePointer.isDown)
            {
                jump_bool = true;
            }
        }
    }

    /*

    var str_left = "touch_point: [" + touch_point.x + "," + touch_point.y + "]\t";
    var str_left_bounds = "Left: " + touch_area_left.left + "\t" + "Right: " + touch_area_left.right + "\t" + "Top: " + touch_area_left.top + "\t" + "Bottom: " + touch_area_left.bottom;
    console.log(str_left + str_left_bounds);

    */

    /*
    if (touch_area_left.contains(touch_pos2)) {
        left_bool = true;
    }

    if (touch_area_right.contains(touch_pos)) {
        right_bool = true;
    }

    if (touch_area_right.contains(touch_pos2)) {
        right_bool = true;
    }

    if (touch_area_jump.contains(touch_pos)) {
        jump_bool = true;
    }

    if (touch_area_jump.contains(touch_pos2)) {
        jump_bool = true;
    }
    */
    player_touchcontrol.left = left_bool;
    player_touchcontrol.right = right_bool;
    player_touchcontrol.jump = jump_bool;

    //console.log(touch_area_left);

}

function update() 
{
    
    //game.physics.p2.updateBoundsCollisionGroup();
    //game.physics.arcade.setBounds(0, 0, (worldBounds.x * worldScale), (worldBounds.y * worldScale));

    //worldScale = Phaser.Math.clamp(worldScale, 0.6, 1.0);
    //apply scale to gameWorld Container (contains all object present in the game world)
    //gameWorld.scale.set(worldScale);


    //layer.scale.set(worldScale * 2);

    //game.camera.focusOn(player._sprite);
    //cameraZoom();

    //tilemap.update();
    //updatePlayerTouchControls();
    player.update();
    //tilemap.updateTexture(layer);
    //zoom
    //game.physics.arcade.collide(layer_entities, layer_tiles);
    //game.physics.arcade.collide(layer_tiles, layer_entities);
    /*
    if (game.input.keyboard.isDown(Phaser.Keyboard.Q)) {
        worldScale -= 0.005;
    }
    else if (game.input.keyboard.isDown(Phaser.Keyboard.A)) {
        worldScale += 0.005;
    }
    */
    game.input.mouse.mouseWheelCallback = mouseWheel;
    
    //clamp scaling to a minimum and maximum value


    /*
    tileMapCrop.x = game.camera.x;
    tileMapCrop.y = game.camera.y;
    */
    
    //tileMapCrop.position = game.camera.position;
   

    //layer.width = game.world.width;
   // layer.height = game.world.width;
    //layer.offsetX = -game.world.width / 2;
    //layer.offsetY = -game.world.height / 2;

    
    //60 FPS DREAM
    /*
    fps = game.time.fps || '--';

    if(fps > 45)
    {
        fps_colour = dbg_colours.good;
    }
    else if(fps > 30)
    {
        fps_colour = dbg_colours.okay;
    }
    else
    {
        fps_colour = dbg_colours.bad;
    }

    dbg_dt = game.time.elapsedMS;
    
    */
    fps = game.time.fps || '--';

    if (fps > 27)
    {
        fps_colour = dbg_colours.good;
    }
    else if (fps > 19)
    {
        fps_colour = dbg_colours.okay;
    }
    else
    {
        fps_colour = dbg_colours.bad;
    }

    dbg_dt = game.time.elapsedMS;
}

function render() 
{
    player.render();
    
    game.debug.text("build 1a", window.innerWidth-128, 16);
    game.debug.cameraInfo(game.camera, 4, 32);
    game.debug.spriteInfo(player._sprite, 4, 128);
    //game.debug.bodyInfo(player._sprite, 4, 100);
    //game.debug.spriteInfo(player._graphics, 32, 256);
    
    game.debug.text("World Bounds: XY(" + game.world.bounds.x + "," + game.world.bounds.y + ") WH(" + game.world.bounds.width + "," + game.world.bounds.height + ")", 4, 256);

    game.debug.text("Camera Bounds: XY(" + game.camera.bounds.x + "," + game.camera.bounds.y + ") WH(" + game.camera.bounds.width + "," + game.camera.bounds.height + ")", 4, 272);

    //game.debug.text(renderer + ":" + fps + "\t" + dbg_dt + "ms", 4, 16, fps_colour);
    //game.debug.text("Selected Tile Pos: [" + tilemap.selected_tile_pos.x + "," + tilemap.selected_tile_pos.y + "]", 2, 32);
    //game.debug.text("Selected Tile Index: [" + tilemap.selected_tile + "]", 2, 48);
    game.debug.pointer(game.input.activePointer);

    game.debug.text(renderer + ":" + fps + "\t" + dbg_dt + "ms", 2, 16, fps_colour);
    //game.debug.spriteInfo(tilemap.display_sprite, 32, 256);
    //game.debug.spriteInfo(layer, 32, 256);
    /*
    //game.debug.text(renderer, 2, 32, "#ffffff");

    //game.debug.text("DPI: " + game.resolution, 2, 48, "#ffffff");

    game.debug.pointer(game.input.mousePointer);
    game.debug.pointer(game.input.pointer1);
    game.debug.pointer(game.input.pointer2);

    //Touch Control Zones
    //game.debug.geom(touch_area_left, 'rgba(255,0,0,0.5)', true);
    //game.debug.geom(touch_area_right, 'rgba(0,0,255,0.5)', true);
    //game.debug.geom(touch_area_jump, 'rgba(0,255,0,0.5)', true);
    game.debug.text("Left: " + player_touchcontrol.left + "\t" + "Right: " + player_touchcontrol.right + "\t" + "Jump: " + player_touchcontrol.jump, 2, 32,"#ffffff");

    game.debug.text("Tiles: " + Tiles.length, 2, 48, "#ffffff");

    //game.debug.text( "This is debug text", 100, 380 );
    */
}

function mouseWheel()
{
    //zoom mouse
    var mouse_wheeldelta = game.input.mouse.wheelDelta;

    if(mouse_wheeldelta < 0.0)
    {
        //minus
        if(worldScale > 0.1)
        {
            worldScale -= 0.02;
        }
    }
    else
    {
        //plus
        if(worldScale < 1.0)
        {
            worldScale += 0.02;
        }
    }

}

function cameraZoom()
{

    //var bounds = Phaser.Rectangle.clone(game.world.bounds);
    //game.world.bounds.width = worldBounds.getX() * worldScale;
    //game.world.bounds.height = worldBounds.getY() * worldScale;

    var bounds = Phaser.Rectangle.clone(game.world.bounds);
    var cameraBounds = game.camera.bounds;

    cameraBounds.x      = bounds.width  * (1 - worldScale) / 2;
    cameraBounds.y      = bounds.height * (1 - worldScale) / 2;
    cameraBounds.width  = bounds.width  * worldScale * 2;
    cameraBounds.height = bounds.height * worldScale * 2;

}

function oddOrEven(x) {
  return ( x & 1 ) ? 0 : 1;
}

function generateBoundTiles()
{
    var size = 64.0;
    var width = (worldBounds.getX() / size) + 1;
    var length = (worldBounds.getY() / size) + 1;

    //floor
    var y = worldBounds.getY();
    for(var i = 0; i < width; i++)
    {
        var pos = Vector.create(-size + (i * size), y);
        var t = Tile.create(pos);

        if(oddOrEven(i))
        {
            t._sprite.tint = 0xEEEEEE;
        }


        Tiles.push(t);
    }

    y = 0.0 - size;
    //ceiling
    for(var i = 0; i < width; i++)
    {
        var pos = Vector.create(-size + (i * size), y);
        var t = Tile.create(pos);

        if(oddOrEven(i))
        {
            t._sprite.tint = 0xEEEEEE;
        }
        Tiles.push(t);
    }

    //left
    var x = 0.0 - size;
    for(var i = 0; i < length; i++)
    {
        var pos = Vector.create(x, i * size);
        var t = Tile.create(pos);

        if(oddOrEven(i))
        {
            t._sprite.tint = 0xEEEEEE;
        }
        Tiles.push(t);
    }
    //right
    x = worldBounds.getX() - size;
    for(var i = 0; i < length; i++)
    {
        var pos = Vector.create(x, i * size)
        var t = Tile.create(pos);

        if(oddOrEven(i))
        {
            t._sprite.tint = 0xEEEEEE;
        }
        Tiles.push(t);
    }
    
}
