define([
    'jquery',
    'crafty',
    'map'
], 
/**
* Определение элемента Canvas 
*
* Производит начальную инициализацию элемента Canvas
* необходимого для отрисовки сцен. 
*  
* @return void Ничего не возвращает
*/
function($, Crafty, Map) {
    Crafty.c('Borders', {
        init: function() {
            this.requires('2D, Canvas, Solid');
        }
    });
	
/**
* Определение элемента Drid 
*
* Производит начальную инициализацию элемента Grid, необходимого
* для правильного отображения карты. 
*  
* @return void Ничего не возвращает
*/  
    Crafty.c('Grid', {
        init: function() {
            this.attr({
                w: Map.grid.tile.width,
                h: Map.grid.tile.height
            });
        },
        // Locate this entity at the given position on the grid
        at: function(x, y, offsetX, offsetY) {
            if (offsetX === undefined) offsetX = 0;
            if (offsetY === undefined) offsetY = 0;
            if (x === undefined && y === undefined) {
                return {
                    x: this.x / Map.grid.tile.width +
                        offsetX,
                    y: this.y / Game.map_grid.tile.height +
                        offsetY
                }
            } else {
                this.attr({
                    x: x * Map.grid.tile.width +
                        offsetX,
                    y: y * Map.grid.tile.height +
                        offsetY
                });
                return this;
            }
        }
    });
	
/**
* Определение элемента Block 
*
* Производит начальную элемента Block, необходимого
* для создания карты. 
*  
* @return void Ничего не возвращает
*/  
    Crafty.c('Block', {
        init: function() {
            this.requires('2D, Grid');
        },
        place: function(type, cols, rows) {
            if (typeof(cols) === 'undefined') {
                if (type === 'Bricks') {
                    cols = 4;
                } else {
                    cols = 2;
                }
            }
            if (typeof(rows) === 'undefined') {
                if (type === 'Bricks') {
                    rows = 4;
                } else {
                    rows = 2;
                }
            }
            for (var i = 0; i < rows; i++) {
                for (var j = 0; j < cols; j++) {
                    var blockType = Crafty.e(type);
                    blockType.attr({
                        x: this.x + j * blockType.w,
                        y: this.y + i * blockType.h
                    });
                }
            }
        }
    });
	
/**
* Определение элемента BaseDefence 
*
* Производит начальную элемента BaseDefence, необходимого
* для создания карты. 
*  
* @return void Ничего не возвращает
*/ 
    Crafty.c('BaseDefence', {
        init: function() {
            this.requires('2D, Canvas');
        },
        place: function(type) {
            var x = Map.grid.tile.width * 5 + Map.grid.tile
                .width / 2;
            var y = Map.grid.tile.height * 12 - Map.grid.tile
                .height / 2;
            //left side
            if (type === 'Bricks') {
                cols = 2;
            } else {
                cols = 1;
            }
            if (type === 'Bricks') {
                rows = 6;
            } else {
                rows = 3;
            }
            for (var i = 0; i < rows; i++) {
                for (var j = 0; j < cols; j++) {
                    var blockType = Crafty.e(type);
                    blockType.attr({
                        x: x + j * blockType.w,
                        y: y + i * blockType.h
                    });
                }
            }
            //top
            var x = Map.grid.tile.width * 6;
            var y = Map.grid.tile.height * 12 - Map.grid.tile
                .height / 2;
            if (type === 'Bricks') {
                cols = 4;
            } else {
                cols = 2;
            }
            if (type === 'Bricks') {
                rows = 2;
            } else {
                rows = 1;
            }
            for (var i = 0; i < rows; i++) {
                for (var j = 0; j < cols; j++) {
                    var blockType = Crafty.e(type);
                    blockType.attr({
                        x: x + j * blockType.w,
                        y: y + i * blockType.h
                    });
                }
            }
            //right side
            var x = Map.grid.tile.width * 7;
            var y = Map.grid.tile.height * 12 - Map.grid.tile
                .height / 2;
            if (type === 'Bricks') {
                cols = 2;
            } else {
                cols = 1;
            }
            if (type === 'Bricks') {
                rows = 6;
            } else {
                rows = 3;
            }
            for (var i = 0; i < rows; i++) {
                for (var j = 0; j < cols; j++) {
                    var blockType = Crafty.e(type);
                    blockType.attr({
                        x: x + j * blockType.w,
                        y: y + i * blockType.h
                    });
                }
            }

        }
    });
	
/**
* Определение элемента Bricks 
*
* Производит инициализацию элемента Bricks, необходимого
* для создания карты. 
*  
* @return void Ничего не возвращает
*/ 
    Crafty.c('Bricks', {
        init: function() {
            this.requires(
                '2D, Canvas, Solid, SpriteAnimation, spr_bricks'
            );
            this.attr({
                    w: 8,
                    h: 8
                })
                .animate('Bricks', 0, 0, 0)
                .animate('Bricks', 1, -1);
        },
        explode: function() {
            this.destroy();
        }
    });
	
/**
* Определение элемента Trees 
*
* Производит инициализацию элемента Trees, необходимого
* для создания карты. 
*  
* @return void Ничего не возвращает
*/ 	
    Crafty.c('Trees', {
        init: function() {
            this.requires(
                '2D, Canvas, SpriteAnimation, spr_trees'
            );
            this.attr({
                    w: 16,
                    h: 16
                })
                .animate('Trees', 0, 0, 0)
                .animate('Trees', 1, -1);
        }
    });
	
/**
* Определение элемента Steel 
*
* Производит инициализацию элемента Steel, необходимого
* для создания карты. 
*  
* @return void Ничего не возвращает
*/ 
    Crafty.c('Steel', {
        init: function() {
            this.requires(
                '2D, Canvas, Solid, SpriteAnimation, spr_steel'
            );
            this.attr({
                    w: 16,
                    h: 16
                })
                .animate('Steel', 0, 0, 0)
                .animate('Steel', 1, -1);
        }
    });
	
/**
* Определение элемента Explosion 
*
* Производит инициализацию элемента Explosion, необходимого
* для отображения анимации взрыва. 
*  
* @return void Ничего не возвращает
*/
    Crafty.c('Explosion', {
        init: function() {
            this.requires(
                    '2D, Canvas, Collision, SpriteAnimation, spr_small_explosion'
                )
                .attr({
                    w: 32,
                    h: 32
                })
                //setup animation
                .animate('Explode', 0, 0, 0);
        },
        explode: function(x, y, dir) {
            var explosion = this;
            var offsetX = explosion.w / 2 - 4;
            var offsetY = explosion.h / 2 - 4;
            this.attr({
                x: (x - offsetX),
                y: (y - offsetY)
            });
            // start sprite animation
            explosion.animate('Explode', 1, 1);
            setTimeout(function() {
                explosion.destroy();
            }, 100);
            //create impact
            Crafty.e('ExplosionImpact').impact(x, y, dir);
        }
    });
	
/**
* Определение элемента ExplosionImpact 
*
* Производит отображение анимации взрыва. 
*  
* @return void Ничего не возвращает
*/	
    Crafty.c('ExplosionImpact', {
        init: function() {
            this.requires('2D, Canvas, Collision');
        },
        impact: function(x, y, dir) {
            var impactObject = this;
            var impactWidth = 32;
            var impactHeight = 6;
            //orientation of the impact
            if (dir === 'e' || dir === 'w') {
                this.attr({
                    w: impactHeight,
                    h: impactWidth
                });
            } else {
                this.attr({
                    w: impactWidth,
                    h: impactHeight
                });
            }
            this.attr({
                x: (x - impactObject.w / 2 + 4),
                y: (y - impactObject.h / 2 + 4)
            });
            this.onHit('Solid', function(solidObjs) {
                if (solidObjs.length > 0) {
                    for (var i = 0; i < solidObjs.length; i++) {
                        if (typeof(solidObjs[i].obj
                                .explode) ===
                            'function') {
                            solidObjs[i].obj.explode();
                        }
                    }
                }
            });
            setTimeout(function() {
                impactObject.destroy();
            }, 100);
        }
    });
	
/**
* Добавление элемента в список 
*
* Добавляет элемент в список для удаления с карты. 
*  
* @return void Ничего не возвращает
*/	
    Crafty.c('Item', {
        init: function() {
            this.requires('Block, Color')
                .color('rgb(170, 125, 40)');
        },
        collect: function() {
            this.destroy();
            Crafty.trigger('ItemCollected', this);
        }
    });
/**
* Определение элемента Base
*
* Производит инициализацию элемента Base, необходимого
* для создания карты. 
*  
* @return void Ничего не возвращает
*/
    Crafty.c('Base', {
        init: function() {
            this.requires(
                '2D, Canvas, Grid, Solid, SpriteAnimation, spr_base'
            );
            this.attr({
                    w: 32,
                    h: 32
                })
                .animate('Base', 0, 0, 0)
                .animate('BaseHit', 0, 1, 0)
                .animate('Base', 1, -1);
        },
        explode: function() {
            this.animate('BaseHit', 1, -1);
            // game over
            Crafty.gameOver();
        }
    });
});