var loadState =
{
    preload: function()
    {
        game.stage.backgroundColor = "#FF00FF";
        var loadingLabel = game.add.text(80, 150, 'loading...', { font: '30px Arial', fill: '#ffffff' });

        var url_textures = "assets/textures/";
        //load assets
        game.load.image('background', url_textures + 'debug-64-repeat.png');
        game.load.image('player', url_textures + 'debug-player-64.png');
        game.load.image('debug_tile', url_textures + 'debug-tile.png');
        game.load.image('tiles', url_textures + 'tileset.png');

        //game.load.tilemap('level', 'test2.csv', null, Phaser.Tilemap.CSV);

        //Settings

        game.time.desiredFps = 60;
        game.time.advancedTiming = true;

        key_1 = game.input.keyboard.addKey(Phaser.Keyboard.ONE);
        key_2 = game.input.keyboard.addKey(Phaser.Keyboard.TWO);

    },

    create: function()
    {
        console.log("load");
        game.state.start('menu');
    }
}
