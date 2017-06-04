var menuState =
{
    preload: function ()
    {

    },

    create: function ()
    {
        //game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
        //game.scale.setGameSize(window.innerWidth, window.innerHeight);
        game.stage.backgroundColor = "#00FF00";
        console.log("menu");
        game.state.start('edit');
    },

    update: function ()
    {

       
    },

    render: function ()
    {


    },
}
