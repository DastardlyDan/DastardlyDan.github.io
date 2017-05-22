//DANIEL STEVENS VECTOR CLASS / OBJECT _proto_ template.

var Vector = {
	_x: 0.0,
	_y: 0.0,

	create: function(x, y) {
		var obj = Object.create(this);
		if(typeof x !== "undefined" && typeof y !== "undefined")
		{
			obj.setXY(x,y);
		}
		else
		{
			obj.setXY(0.0,0.0);
		}
		return obj;
	},

	toString: function(){

		var string = "V:(" + Math.round(this._x * 100) / 100 + "," + Math.round(this._y * 100) / 100  + ")";
		return string;
	},

	setX: function(value) {
		this._x = value;
	},

	getX: function() {
		return this._x;
	},

	setY: function(value) {
		this._y = value;
	},

	getY: function() {
		return this._y;
	},

	setXY: function (x, y)
	{
		this.setX(x);
		this.setY(y);
	},

	getXY: function ()
	{
		var obj = {x: this.getX(), y: this.getY()};
		return obj; //return simple xy container missing _ prefix unlike raw values store in vector object
	},

	setAngle: function(angle) {
		var length = this.getLength();
		this._x = Math.cos(angle) * length;
		this._y = Math.sin(angle) * length;
	},

	getAngle: function() {
		return Math.atan2(this._y, this._x);
	},

	setLength: function(length) {
		var angle = this.getAngle();
		this._x = Math.cos(angle) * length;
		this._y = Math.sin(angle) * length;
	},

	getLength: function() {
		return Math.sqrt(this._x * this._x + this._y * this._y);
	},

	add: function(v2) {
		return vector.create(this._x + v2.getX(), this._y + v2.getY());
	},

	subtract: function(v2) {
		return vector.create(this._x - Math.abs(v2.getX()), this._y - Math.abs(v2.getY()));
	},

	combine: function(v2){
		//takes two vectors and combines them (fix for adding a negative to a negative going positive again).
		var x_result;
		var y_result;

		//this.getY() = -3 and v2.getY() = -2; combined should return a vector with -5 on the y!

		if(this.getX() < 0 || v2.getX() < 0){ //if this vector's x is negative and the x of the one we are combining with is negative.
			//subtract a positive version of v2._x
			x_result = this.getX() - Math.abs(v2.getX());
		}
		else{

			x_result = this.getX() + v2.getX();

		}

		if(this.getY() < 0 || v2.getY() < 0){
			//subtract a positive version of v2._y
			y_result = this.getY() - Math.abs(v2.getY());

		}
		else{

			y_result = this.getY() + v2.getY();

		}



		return this.create(x_result,y_result);

	},

	multiply: function(val) {
		return this.create(this._x * val, this._y * val);
	},

	divide: function(val) {
		return this.create(this._x / val, this._y / val);
	},

	addTo: function(v2) {
		this._x += v2.getX();
		this._y += v2.getY();
	},

	subtractFrom: function(v2) {
		this._x -= v2.getX();
		this._y -= v2.getY();
	},

	multiplyBy: function(val) {
		this._x *= val;
		this._y *= val;
	},

	divideBy: function(val) {
		this._x /= val;
		this._y /= val;
	}
};