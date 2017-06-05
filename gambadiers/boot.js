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
        key_3 = game.input.keyboard.addKey(Phaser.Keyboard.THREE);

        key_dbg = game.input.keyboard.addKey(Phaser.Keyboard.EQUALS);

        touch_area_left = new Phaser.Rectangle(0, browsersize.height / 5, browsersize.width / 4, browsersize.height / 1.3);
        touch_area_right = new Phaser.Rectangle(browsersize.width - (browsersize.width / 4), browsersize.height / 5, browsersize.width / 3, browsersize.height / 1.3);
        touch_area_jump = new Phaser.Rectangle(browsersize.width / 4, browsersize.height - (browsersize.height / 6), browsersize.width / 2, browsersize.height / 3);

        //game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
        //game.scale.setGameSize(window.innerWidth, window.innerHeight);
        game.physics.startSystem(Phaser.Physics.ARCADE);

        game.stage.backgroundColor = "#0000FF";

        console.log("boot");
        game.state.start('load');
    }

}