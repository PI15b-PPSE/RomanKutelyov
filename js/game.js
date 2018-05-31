define([
    'jquery',
    'crafty',
    'components',
    'tanks',
    'map',
    'scenes'
], 
/**
* Инициализация сцены
*
* Произвдит начальную инициализацию сцены,
* загружает ее. 
* @param Сrafty Обьект сцены
* @param Tanks Танк игрока
* @param Map Карта сцены
* @param Scenes текущая сцены
* @return start Текущую сцену
*/
function($, Crafty, C, Tanks, Map, Scenes) {
    var start = function() {
        //Init
        Crafty.init(Map.width(), Map.height());
        Crafty.background(Map.bgcolor);
        console.log('bg color');
        Crafty.scene('Loading');
    };
    return {
        start: start
    };
});