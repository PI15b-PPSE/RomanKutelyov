"use strict";
require.config({
    baseUrl: 'js',
    paths: {
        jquery: 'vendor/jquery-2.0.3.min',
        crafty: 'vendor/crafty'
    }
});

require(['game'], 
/**
* Старт игры
*
* Произвдит старт главного цикла игры.
*  
* @return void Ничего не возвращает
*/
function(Game) {
    //start the game
    Game.start();
});