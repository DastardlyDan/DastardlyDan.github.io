var Tile = 
{
	//properties
    //_sprite: null,

    index: null, //phaser point (x,y)
    shape: 0, //0 none, 1 square, 2,3,4,5 = slope in different directions.
    position: null,
    sprite: null,
    colour32: null, //Phaser Colour object

	create: function(_index, _position, _shape, _colour) //phaser point, 0-5, phaser.colour obj
	{
		var obj = Object.create(this);
		obj.index = _index;

		obj.shape = _shape;
		obj.colour32 = _colour.color32;
		obj.position = _position;
		//obj.sprite = game.add.sprite(_position.x, _position.y, 'debug_tile');
		obj.init();

		return obj;
	},

	init: function()
	{


        /*
	    this._sprite = game.make.sprite(position.getX(), position.getY());
	    this._sprite.loadTexture('debug_tile');
	    game.physics.p2.enable(this._sprite);
	    this._sprite.body.kinematic = true;
	    this._sprite.anchor = new Phaser.Point(0.0, 0.0); //top left anchor
	    this._sprite.body.collides([tileCollisionGroup, playerCollisionGroup]);

        */
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

	addSprite: function()
	{
	    //adds a new sprite, takes optional colour argument
	    //console.log(this.sprite);
	    //console.log(this.sprite);
	    if (this.sprite === null) //only create a new tile if the was deleted
	    {
	        //console.log("Sprite added");
	        this.sprite = game.add.sprite(this.position.x, this.position.y, 'debug_tile');

	        this.sprite.tint = this.colour32;
	        this.sprite.autoCull = true;
	        this.sprite.inputEnabled = true;
	        this.sprite.anchor.x = 0.0;
	        this.sprite.anchor.y = 0.0;
	        //this.sprite.visible = true;
	        this.sprite.alpha = 1.0;
	        this.sprite.smoothed = false;
	        //this.sprite.syncBounds = true;

	        /*
            game.physics.p2.enable(this.sprite, false);
            this.sprite.body.static = true;
            this.sprite.body.setCollisionGroup(tileCollisionGroup);
            this.sprite.enableBody = false;
            */
	        game.physics.arcade.enable(this.sprite);
	        this.sprite.body.immovable = true;
	        this.sprite.body.allowGravity = false;
	        //this.sprite.body.enable = false;
	        //this.sprite.body.static = true;
	        //this.sprite.body.syncBounds = false;
	        
	        this.sprite.events.onInputDown.add(this.clickedTile, { tile: this });

	        layer_tiles.add(this.sprite);
	    }


	},

    removeSprite: function()
    {
        if (this.sprite != null)
        {
            this.sprite.destroy();
            this.sprite = null;
        }
    },

	clickedTile: function()
	{
        /*
	    if (this.sprite.visible == 0)
	    {
	        this.sprite.visible = 1;
	    }
	    else
	    {
	        this.sprite.visible = 0;
	    }
        */



        //console.log(this.tile);
	    
	    if (this.tile.index.x > 0 && this.tile.index.x < 127)
	    {
	        if(this.tile.index.y > 0 && this.tile.index.y < 63)
	        {
	            //console.log(this.tile.index);
	            //this.tile.toggleVisible();
	            //this.tile.toggleSprite();
	        }
	    }
	    

	},

	toggleSprite: function()
	{
	    //re adds sprite or deletes sprite if it exists

	    if(this.sprite != null)
        {
	        this.removeSprite();
	    }
	    else
	    {
	        this.addSprite();
	    }

	},

	toggleVisible: function ()
	{
	    if (this.sprite.alpha > 0)
	    {
	        this.setVisible(false);
	        this.sprite.body.enable = false;
	        //this.sprite.enableBody = false;
	    }
	    else
	    {
	        this.setVisible(true);
	        //this.sprite.enableBody = true;
	        this.sprite.body.enable = true;
	    }
	},

	setVisible: function(state)
	{

        //add remove / add collision
	    if (state)
	    {

	        this.sprite.alpha = 1.0;
	        this.sprite.body.enable = true;
	    }
	    else
	    {
	        this.sprite.alpha = 0;
	        this.sprite.body.enable = false;
	    }

	},

	update: function()
	{
	    //this.sprite.body.setSize(64 * worldScale, 64 * worldScale, (64 * (1 - worldScale)) / 2, (64 * (1 - worldScale)) / 2);
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