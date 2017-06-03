//Player Object Class
var Player =
{
	//properties
    _sprite: null,
    _speed: 250,
	_graphics: null,
	_blob: null,
	_eye_left: null,
	_eye_left_pupil_pos: null,
	_eye_right: null,
	_eye_right_pupil_pos: null,
	_mouth: null,
	_mouth_shape: null,
	_body: null,
	_s_foot1: null, // invis sprite physics circle body for feet (graphics foot follows these)
	_s_foot2: null, // invis sprite physics circle body for feet (graphics foot follows these)
	_foot1: null,
	_foot2: null,
	_group: null,
	_graphics_group: null, //group layer to contain all graphics, used to flip character
	_facing: true,
	_last_facing: true, 


	//movemment / dir

	//player body / bone anim structure
	//feet are pinned to the bottom of circles (with torque joint in the center)


	create: function(position)
	{
		var obj = Object.create(this);

		obj.init(position);

		return obj;
	},

	init: function(position)
	{
		this._group = game.add.group();
		this._sprite = game.add.sprite(position.getX(), position.getY(),'player');
		this._sprite.alpha = 1.0;
		this._sprite.anchor = new Phaser.Point(0.5,0.5);
		this._graphics = game.add.graphics();
		this._blobs = game.add.graphics();
		this._eye_left = game.add.graphics();
		this._eye_right = game.add.graphics();
		this._mouth = game.add.graphics();
		this._body = game.add.graphics();

		//feet
		this._s_foot1 = game.add.sprite();
		this._s_foot2 = game.add.sprite();
		this._foot1 = game.add.graphics();
		this._foot2 = game.add.graphics();

		//foot 1 properties
		this._s_foot1.width = 64.0;
		this._s_foot1.height = 64.0;
		//this._s_foot1.body.dynamic = true;
		//this._s_foot1.body.friction = true;

		//foot 2 properties
		this._s_foot2.width = 64.0;
		this._s_foot2.height = 64.0;
		//this._s_foot2.body.dynamic = true;
		//this._s_foot2.body.friction = true;
		

		//this._mouth = game.add.sprite();
		//this._mouth.loadTexture(url_textures + 'svg/player/mouth.svg');
		this._mouth_shape = new Phaser.Polygon();
		this._eye_left_pupil_pos = new Phaser.Point(0.0,0.0);
		this._eye_right_pupil_pos = new Phaser.Point(0.0,0.0);

		//this._velocity = Vector.create();

	    //Enable Physics for Player

        
		game.physics.p2.enable(this._sprite)
		//Enable Settings
		this._sprite.body.dynamic = true;
		this._sprite.body.friction = true;
		this._sprite.body.fixedRotation = true;
		this._sprite.body.damping = 0.8;

		//Set Player to use playerCollisionGroup
		//this._sprite.body.setCollisionGroup(playerCollisionGroup);
		//SetPlayer to collide with TileGroup
	    //this._sprite.body.collides([playerCollisionGroup, tileCollisionGroup]);



		//this._sprite.body.collideWorldBounds = true;
        
        /*
		this._sprite.enableBody = true;
		this._sprite.physicsBodyType = Phaser.Physics.ARCADE;
		this._sprite.collideWorldBounds = true;
        */

		//game.physics.enable(this._sprite, Phaser.Physics.P2);
		//this._sprite.allowGravity = false;
		//this._sprite.body.syncBounds = true;
		//this._sprite.body.collideWorldBounds = true;
        //this._sprite.body.


		this._graphics.anchor = new Phaser.Point(0.5,0.5);
		this._eye_left.anchor = new Phaser.Point(0.5,0.5);
		this._eye_right.anchor = new Phaser.Point(0.5,0.5);
		this._mouth.anchor = new Phaser.Point(0.5,0.5);

		//game.physics.enable([ this.sprite, layer_entities ], Phaser.Physics.ARCADE);

		//this._sprite.body.dynamic = true;

   		//this._sprite.body.bounce.y = 0.001;
		//this._sprite.body.friction = 0.9;
		//this._sprite.body.stopVelocityOnCollide  = true;
		//this._sprite.body.collideWorldBounds = true;
		//this._sprite.body.setSize(0, 0, 256, 512);

		//Camera Settings

    	game.camera.x = this._sprite.x;
    	game.camera.y = this._sprite.y;

		//maybe create player group and add to entities?
		this._group.add(this._sprite);

		//Main body
		this._group.add(this._graphics);
		this._group.add(this._eye_left);
		this._group.add(this._eye_right);
		this._group.add(this._mouth);
		this._group.add(this._body);

		//feet
		this._group.add(this._s_foot1);
		this._group.add(this._s_foot2);
		this._group.add(this._foot1);
		this._group.add(this._foot2);

		//add group to layer
		layer_entities.add(this._group);

		game.camera.follow(this._sprite);

		//this.graphics_render();
		//game.physics.arcade.collide(this._sprite, layer_tiles);

	},

	update: function()
	{
	    //this._sprite.anchor = new Phaser.Point(0.5, 0.5);
	    //this._sprite.body.setSize(64 * worldScale, 128 * worldScale, (64 * (1-worldScale))/2, (128 * (1-worldScale))/2);
	    //this._sprite.anchor = new Phaser.Point(0.5, 0.5);
	    //console.log(this._sprite.body);

	    //console.log(layer_entities.scale);
		//test player movement
		this._last_facing = this._facing;
		//this._sprite.body.velocity.x = this._sprite.body.velocity.x * 0.959;
		//this._sprite.body.velocity.y = this._sprite.body.velocity.y * 0.959;
		//this._sprite.body.velocity.x = 0;
		//this._sprite.body.velocity.y = 0;

    	if (cursors.up.isDown || wasd.up.isDown || player_touchcontrol.jump)
    	{
            /*
    	    this._sprite.y -= 1.0;
    	    if (this._sprite.body.touching.down)
    	    {
    	        
    	        this._sprite.body.velocity.y = 2000;
    	    }
            */
    	    this._sprite.body.velocity.y = -this._speed;

		}
		else if (cursors.down.isDown || wasd.down.isDown)
		{
		    this._sprite.body.velocity.y = this._speed;
		}

    	if (cursors.left.isDown || wasd.left.isDown || player_touchcontrol.left)
		{
    	    this._sprite.body.velocity.x = -this._speed;
		}
    	else if (cursors.right.isDown || wasd.right.isDown || player_touchcontrol.right)
		{
    	    this._sprite.body.velocity.x = this._speed;
		}

		if(this._sprite.body.velocity.x > 0)
		{
			this._facing = true;
		}
		else
		{
			this._facing = false;
		}

		//this._graphics.position = this._sprite.position.clone;

		this._graphics.x = this._sprite.body.x;
		this._graphics.y = this._sprite.body.y -128.0;

		//basic eye positioning

		this._eye_left.x = this._sprite.x + 96.0;
		this._eye_left.y = this._sprite.y - 176.0;

		this._eye_right.x = this._sprite.x - 32.0;
		this._eye_right.y = this._sprite.y - 176.0;

		//feet

		//make these use some kind of p2 joints/springs
		this._s_foot1.x = this._sprite.x - 96.0;
		this._s_foot1.y = this._sprite.y + 224.0;

		this._s_foot2.x = this._sprite.x + 96.0;
		this._s_foot2.y = this._sprite.y + 224.0;

		this._foot1.x = this._s_foot1.x;
		this._foot1.y = this._s_foot1.y;

		this._foot2.x = this._s_foot2.x;
		this._foot2.y = this._s_foot2.y;

		//mouth
		this._mouth.x = this._sprite.x; //-32.0
		this._mouth.y = this._sprite.y - 120.0;

		//this.graphics_render();
		//this.graphics_body_render();
	},

	graphics_render: function()
	{

		//custom drawing code here

		//spriter etc
		this._graphics.clear();
		this._graphics.beginFill(0xAA00AA);
		this._graphics.drawCircle(0.0, 0.0, 256.0);
		this._graphics.endFill();

		//EYES

		//LEFT
		//white
		
		this._eye_left.clear();
		//this._eye_left.lineStyle(4, 0x000000, 1);
		this._eye_left.beginFill(0xFFFFFF);
		this._eye_left.drawCircle(0.0, 0.0, 64.0);
		this._eye_left.endFill();

		//pupil
		this._eye_left.lineStyle(0);
		this._eye_left.beginFill(0x000000);
		this._eye_left.drawCircle(this._eye_left_pupil_pos.x, this._eye_left_pupil_pos.y, 32.0);
		this._eye_left.endFill();

		//RIGHT
		//white
		this._eye_right.clear();
		//this._eye_right.lineStyle(4, 0x000000, 1);
		this._eye_right.beginFill(0xFFFFFF);
		this._eye_right.drawCircle(0.0, 0.0, 64.0);
		this._eye_right.endFill();

		//pupil
		this._eye_right.lineStyle(0);
		this._eye_right.beginFill(0x000000);
		this._eye_right.drawCircle(this._eye_right_pupil_pos.x, this._eye_right_pupil_pos.y, 32.0);
		this._eye_right.endFill();

		//feet
		this._foot1.clear();
		this._foot1.beginFill(0xAA00AA);
		this._foot1.drawCircle(0.0, 0.0, 64.0);
		this._foot1.endFill();

		this._foot2.clear();
		this._foot2.beginFill(0xAA00AA);
		this._foot2.drawCircle(0.0, 0.0, 64.0);
		this._foot2.endFill();

		//mouth points anti-clockwise
		//1
		var mp_1 = new Phaser.Point(-64.0, -8.0);
		var mp_1a = new Phaser.Point(-64.0, 8.0);
		var mp_1b = new Phaser.Point(-64.0, -8.0);

		//2
		var mp_2 = new Phaser.Point(0.0, 8.0);
		var mp_2a = new Phaser.Point(64.0, -8.0);
		var mp_2b = new Phaser.Point(64.0, 8.0);

		//3
		var mp_3 = new Phaser.Point(64.0, -8.0);
		var mp_3a = new Phaser.Point(64.0, 8.0);
		var mp_3b = new Phaser.Point(128.0, 8.0);

		var mp_4 = new Phaser.Point(0.0, 8.0);

	},
	graphics_body_render: function()
	{
		this._body.clear();
		this._body.beginFill(0xAA00AA);
		this._body.moveTo(this._graphics.x - 128.0, this._graphics.y); //top-left
		this._body.lineTo(this._foot1.x - 32.0, this._foot1.y); //foot left left edge
		this._body.lineTo(this._foot2.x + 32.0, this._foot2.y); //foot right right edge
		this._body.lineTo(this._graphics.x + 128.0, this._graphics.y); //top right
		this._body.endFill();
	},

	render: function()
	{

		//mouth

		/*
		this._mouth.clear();
		this._mouth.beginFill(0x000000);

		//point 1 top-left
		this._mouth.moveTo(mp_1.x, mp_1.y);

		//point 2 middle bottom
		this._mouth.bezierCurveTo(mp_1a.x, mp_1a.y, mp_1b.x, mp_1b.y, mp_2.x, mp_2.y);

		//point 3 top-right 
		this._mouth.bezierCurveTo(mp_2a.x, mp_2a.y, mp_2b.x, mp_2a.y, mp_3.x, mp_3.y);

		//point 4 middle top
		this._mouth.bezierCurveTo(mp_3a.x, mp_3a.y, mp_3b.x, mp_3b.x, mp_4.x, mp_4.y);

		//line 5 back to start top-left
		this._mouth.lineTo(mp_1.x, mp_1.y);
		//this._mouth.bezierCurveTo(0.0, 0.0,0.0, 0.0, mp_1.x, mp_1.y);

		this._mouth.endFill();
		*/
		/*
		this._mouth.beginFill(0x000000);
		this._mouth.drawRect(0,0,128.0,32.0);
		this._mouth.endFill();
		*/

		//this.mouth = game.add.graphics.load
		//this._mouth.beginFill(0x000000);
		//this._mouth.moveTo(-128.0, -16.0);
		//this._mouth.bezierCurveTo(-128.0, -24.0, -96.0, 24.0, -112.0, 0.0);
		//this._mouth.moveTo(-112.0, 0.0);
		//this._mouth.bezierCurveTo(128.0, 24.0, 96.0, 24.0, 112.0, 0.0);
		///this._mouth.moveTo(112.0, 0.0);
		//this._mouth.bezierCurveTo(128.0, 24.0, 96.0, 24.0, 112.0, 0.0);
		//this._mouth.moveTo(128.0, 16.0);
		//this._mouth.bezierCurveTo(-136.0, -16.0, -100.0, 16.0, -100.0, 16.0);
		//this._mouth.bezierCurveTo(120, -16.0, 130.0, 16.0, 100.0, 16.0);
		//this._mouth.endFill();

	},

	getSprite: function()
	{
		return this._sprite;
	},
	
}