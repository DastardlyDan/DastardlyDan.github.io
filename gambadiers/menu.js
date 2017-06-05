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

        rangeSlider = document.getElementById('range');

        rangeSliderValueElement = document.getElementById('range-value');

        noUiSlider.create(rangeSlider,
        {
            start: [0.5],
            range: {
                'min': [0],
                'max': [1]
            }
        });
        game.state.start('edit');
    },

    update: function ()
    {

       
    },

    render: function ()
    {


    },
}
