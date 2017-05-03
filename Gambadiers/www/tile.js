var Tile = 
{
	//properties
	_sprite: null,

	create: function(position)
	{
		var obj = Object.create(this);

		obj.init(position);

		return obj;
	},

	init: function(position)
	{
	    this._sprite = game.make.sprite(position.getX(), position.getY());
	    this._sprite.loadTexture('debug_tile');
	    game.physics.p2.enable(this._sprite);
	    this._sprite.body.kinematic = true;
	    this._sprite.anchor = new Phaser.Point(0.0, 0.0); //top left anchor
	    this._sprite.body.collides([tileCollisionGroup, playerCollisionGroup]);
        /*
		this._sprite = game.add.sprite(position.getX(), position.getY());
		this._sprite.loadTexture('debug_tile');
		
		game.physics.p2.enable(this._sprite);
		
		this._sprite.body.kinematic = true;
		this._sprite.anchor = new Phaser.Point(0.0,0.0); //top left anchor

		this._sprite.body.collides([tileCollisionGroup, playerCollisionGroup]);

		layer_tiles.add(this._sprite);
        */

	},

	update: function()
	{


	},

	render: function()
	{
		//custom drawing code here

	},

	getSprite: function()
	{
		return this._sprite;
	},
	
};