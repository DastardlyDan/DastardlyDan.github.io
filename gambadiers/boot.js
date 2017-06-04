var browsersize =
{
    width: window.innerWidth,
    height: window.innerHeight
}

var bootState =
{
    create: function()
    {
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

        key_1 = game.input.keyboard.addKey(Phaser.Keyboard.ONE);
        key_2 = game.input.keyboard.addKey(Phaser.Keyboard.TWO);

        game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
        game.scale.setGameSize(window.innerWidth, window.innerHeight);
        game.physics.startSystem(Phaser.Physics.ARCADE);

        game.stage.backgroundColor = "#0000FF";

        console.log("boot");
        game.state.start('load');
    }

}