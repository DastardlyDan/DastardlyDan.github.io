var game = new Phaser.Game(browsersize.width, browsersize.height, Phaser.CANVAS);
var build = "build 2a";
var cursors;
var wasd;
var key_1;
var key_2;

var layer_background;
var layer_tiles;
var layer_entities;

var dbg_colours =
{
    good: "#00FF00",
    okay: "#ffc800",
    bad: "#ff0000",
};

var dbg_dt;

var fps;
var fps_colour;

var renderer = 'Renderer: ';

game.state.add('boot', bootState);
game.state.add('load', loadState);
game.state.add('menu', menuState);
game.state.add('edit', editState);
game.state.add('play', playState);

game.state.start('boot');

/*

function preload()
{

}

function resizeGame()
{
    game.scale.setGameSize(window.innerWidth, window.innerHeight);
}

window.onresize = function ()
{

    resizeGame();

};

function create() 
{

    if (game.renderType == 0) {
        renderer = "AUTO";
    }
    else if (game.renderType == 1) {
        renderer = "CANVAS2D";
    }
    else if (game.renderType == 2) {
        renderer = "WEBGL";
    }
    else if (game.renderType == 3) {
        renderer = "HEADLESS";
    }

}

function update() 
{

}

function render() {

}

*/