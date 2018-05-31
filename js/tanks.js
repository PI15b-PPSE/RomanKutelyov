define([
    'jquery',
    'crafty',
    'map'
], 




/**
* Инициализация обьекта Tank
*
* Производит инициализацию обьект ,
* назначая клавишу и размер обьекта.
*  
* @return void Ничего не возвращает
*/
function($, Crafty, Map) {
    //local config
    var Config = {
        fireKey: 32, //Space Key
        tunnelWidth: Map.grid.tile.width / 4
    };
    Config.maxOffsetFromTunnel = Config.tunnelWidth / 2;
	
/**
* Константа 0
*
* Используется для подсчета
* количества убитых танков.
* Дополнительная детализация
* не нужна
*
* @var object count
*/	
var count = 0;
/**
* Производит изменения направления
*
* Производит направления при движении обьекта.
* @param direction Текущее направление
*  
* @return char Измененное направление
*/
    function convertDirection(direction) {
        if (direction === 'up') {
            return 'n';
        } else if (direction === 'right') {
            return 'e';
        } else if (direction === 'down') {
            return 's';
        } else if (direction === 'left') {
            return 'w';
        }
    }

/**
* Производит движение в зависимости от направление 
*
* Производит  движение в зависимости от направление 
* с заданной скоростью.
* @param direction Текущее направление
* @param int speed Скорость движения
*  
* @return int speed Текущая скорость
*/
    function getMovementObjFromDirection(direction, speed) {
        if (direction === 'up') {
            return {
                x: 0,
                y: -speed
            };
        } else if (direction === 'right') {
            return {
                x: speed,
                y: 0
            };
        } else if (direction === 'down') {
            return {
                x: 0,
                y: speed
            };
        } else if (direction === 'left') {
            return {
                x: -speed,
                y: 0
            };
        }
    }

    //Bot
    Crafty.c('Bot', {
        fireIntervalMax: 3,
        _movement: {
            x: 0,
            y: 0
        },
		
/**
* Производит инициализацию ботов 
*
* Производит  инициализацию основных 
* параметров ботов
*  
* @return void Ничего не возвращает
*/
        init: function() {
            var botComponent = this;
            botComponent.requires('Tank')
                .setLife(2)
                .setSpeed(1)
                .autochangeDirection()
                .autoFire()
                .run();
        },
		
/**
* Производит инициализацию параметров стрельбы ботов 
*
* Устанавливает случайный интервал 
* стрельбы у ботов
*  
* @return tankComponent Обьект текущего танка
*/
        // fire in a random periond of time
        autoFire: function() {
            var tankComponent = this;
            this.timeout(function() {
                if (tankComponent.destroyed ===
                    false) {
                    tankComponent.fire();
                }
                tankComponent.autoFire();
            }, Math.floor(Math.random() *
                tankComponent.fireIntervalMax *
                1000) + 1000);
            return this;
        },
		
/**
* Производит изменение направления ботов 
*
* Изменение направления ботов 
*  
* @return tankComponent Обьект текущего танка
*/
        autochangeDirection: function() {
            this.setDirection(this.directions[Math.floor(
                Math.random() * this.directions
                .length)]);
            return this;
        },
        run: function() {
            this._movement = getMovementObjFromDirection(
                this.currentDirection, this.speedUnit);
            this.move(convertDirection(this.currentDirection),
                this.speedUnit);
            this.timeout(this.run, 5);
            return this;
        }
    });
	
/**
* Инициализация танка игрока 
*
* Создает танк игрока,
* устанавливает необходимые параметры. 
*  
* @return void Ничего не возвращает
*/
    Crafty.c('MyTank', {
        init: function() {
            var tankComponent = this;
            tankComponent.requires(
                    'Tank, Multiway, spr_tank1_s2')
                .setSpeed(2)
                .multiway(this.speedUnit, {
                    UP_ARROW: -90,
                    DOWN_ARROW: 90,
                    RIGHT_ARROW: 0,
                    LEFT_ARROW: 180
                });
            //bind bullet firing
            Crafty.bind('KeyDown', function(e) {
                if (e.keyCode === Config.fireKey) { //space
                    tankComponent.fire();
                }
            });
        }
    });
	
/**
* Инициализация танков ботов 
*
* Создает танки ботов,
* устанавливает необходимые параметры. 
*  
* @return void Ничего не возвращает
*/
    Crafty.c('Tank', {
        destroyed: false,
        speedUnit: 1,
        directions: ['up', 'right', 'down', 'left'],
        currentDirection: 'up',
        life: 1,
        init: function() {
            var tankComponent = this;
            tankComponent.requires(
                    'Block, Solid, Canvas, Collision, SpriteAnimation, spr_tank1_s2'
                )
                .attr({
                    w: Map.grid.tile.width,
                    h: Map.grid.tile.height
                })
                .stopOnSolids()
                .slowOnWater()
                //setup animation
                .animate('TankMoveUp', 0, 3, 0)
                .animate('TankMoveRight', 0, 0, 0)
                .animate('TankMoveDown', 0, 1, 0)
                .animate('TankMoveLeft', 0, 2, 0);

            // Watch for a change of direction and switch sprites
            tankComponent.bind('NewDirection', function(
                data) {
                if (data.x > 0) {
                    // start animation
                    tankComponent.animate(
                        'TankMoveRight', 1, -1);
                    //set current direction of the tank
                    tankComponent.currentDirection =
                        tankComponent.directions[1];
                } else if (data.x < 0) {
                    // start animation
                    tankComponent.animate(
                        'TankMoveLeft', 1, -1);
                    tankComponent.currentDirection =
                        tankComponent.directions[3];
                } else if (data.y > 0) {
                    // start animation
                    tankComponent.animate(
                        'TankMoveDown', 1, -1);
                    tankComponent.currentDirection =
                        tankComponent.directions[2];
                } else if (data.y < 0) {
                    // start animation
                    tankComponent.animate(
                        'TankMoveUp', 1, -1);
                    tankComponent.currentDirection =
                        tankComponent.directions[0];
                } else {
                    //					console.log('stop');
                }
            });
            // destructor
            tankComponent.bind('Remove', function() {
                this.destroyed = true;
            });
        },
		
/**
* Устанавливает скорость обьекта 
*
* Устанавливает скорость премещения обьекта.
*  
* @return tankComponent Обьект текущего танка
*/
        setSpeed: function(speed) {
            this.speedUnit = speed;
            return this;
        },
		
/**
* Вычисляет координаты при изменнении направления 
*
*Вычисляет необходимые значения при изменнении направления
*движения обьекта.
*  
* @return void Ничего не возвращает
*/
        easeChangeDirection: function() {
            var mod = this.x % Config.tunnelWidth;
            if (mod <= Config.maxOffsetFromTunnel) {
                this.x = this.x - mod;
            } else if (mod >= (Config.tunnelWidth - Config.maxOffsetFromTunnel)) {
                this.x = this.x + (Config.tunnelWidth - mod);
            }
            var mod = this.y % Config.tunnelWidth;
            if (mod <= Config.maxOffsetFromTunnel) {
                this.y = this.y - mod;
            } else if (mod >= (Config.tunnelWidth - Config.maxOffsetFromTunnel)) {
                this.y = this.y + (Config.tunnelWidth - mod);
            }
        },
		
/**
* Вызов остановки движения 
*
* Вызывает функцию остановки движения когда обьект
* сталкивается с компонентом Solid.
*  
* @return tankComponent Обьект текущего танка
*/		
        stopOnSolids: function() {
            this.onHit('Solid', this.stopMovement);
            return this;
        },
		
/**
* Остановка движения
*
* Останавливает движения обьекта.
*  
* @return void Ничего не возвращает
*/
        stopMovement: function() {
            this.easeChangeDirection();
            if (typeof this.autochangeDirection ===
                'function') {
                this.autochangeDirection();
            }
        },
		
/**
* Уменьшение скорости 
*
* Производит уменьшения скорости при
* движении по воде.
*  
* @return tankComponent Обьект текущего танка
*/				
        slowOnWater: function() {
            this.onHit('Water', this.slowMovement);
            return this;
        },
		
/**
* Уменьшение скорости 
*
* Производит уменьшения скорости. 
*  
* @return void Ничего не возвращает
*/
        slowMovement: function() {
            if (this._movement) {
                this.x -= (this._movement.x + this._movement
                    .x);
                this.y -= (this._movement.y + this._movement
                    .y);
            }
        },
		
/**
* Устанавливает направление 
*
* Устанавливает текущее направления для обьекта.
*  
* @return tankComponent Обьект текущего танка
*/		
        setDirection: function(direction) {
            this.currentDirection = direction;
            this.animate('TankMove' + direction.charAt(0).toUpperCase() +
                direction.slice(1), 1, -1);
            return this;
        },
		
/**
* Устанавливает жизни ботов 
*
* Устанавливает текущее значении здоровья ботов.
*  
* @return tankComponent Обьект текущего танка
*/			
        setLife: function(life) {
            this.life = life;
            return this;
        },
		
/**
* Урон обьектам 
*
* Производит вычесления наносимого урона обьекту. 
*  
* @return void Ничего не возвращает
*/		
        damage: function() {
            this.life--;
            console.log('tank damage');
            if (this.life <= 0) {
                console.log('tank destroy');
                this.destroy();
                if (this.has('MyTank')) {
                    // game over
                    Crafty.gameOver();
                }
                if (this.has('Bot')) {
                    count = count + 1;
                    if (count == 7) {
                        Crafty.gameWin();
                    }
                }
            }
        },
		
/**
*Вызов выстрела 
*
* Производит вызов функции выстрела. 
*  
* @return void Ничего не возвращает
*/
        fire: function() {
            Crafty.e('Bullet').fire(this);
        }
    });
	
/**
*Инициализация выстрела 
*
* Производит установления параметров для выстрела. 
*  
* @return void Ничего не возвращает
*/	
    Crafty.c('Bullet', {
        tank: false,
        init: function() {
            this.requires(
                    '2D, Canvas, Solid, Collision, SpriteAnimation, spr_bullet'
                )
                .attr({
                    w: 8,
                    h: 8
                })
                .explodeOnSolids()
                .damageTanks()
                //setup animation
                .animate('BulletMoveUp', 0, 0, 0)
                .animate('BulletMoveRight', 0, 1, 0)
                .animate('BulletMoveDown', 0, 2, 0)
                .animate('BulletMoveLeft', 0, 3, 0);
        },
		
/**
* Механика выстрела  
*
* Реализует механику выстрела танка,
* производит необходимые расчеты.
*  
* @return tankComponent Обьект текущего танка
*/
        fire: function(Tank) {
            var bulletComponent = this;
            bulletComponent.tank = Tank;
            var offsetX = 0,
                offsetY = 0;
            if (Tank.currentDirection === 'up') {
                bulletComponent.dir = 'n';
                offsetX = Map.grid.tile.width / 2 -
                    bulletComponent.w / 2;
            } else if (Tank.currentDirection === 'right') {
                bulletComponent.dir = 'e';
                offsetX = Map.grid.tile.width;
                offsetY = Map.grid.tile.height / 2 -
                    bulletComponent.h / 2;
            } else if (Tank.currentDirection === 'down') {
                bulletComponent.dir = 's';
                offsetX = Map.grid.tile.width / 2 -
                    bulletComponent.w / 2;
                offsetY = Map.grid.tile.height;
            } else if (Tank.currentDirection === 'left') {
                bulletComponent.dir = 'w';
                offsetY = Map.grid.tile.height / 2 -
                    bulletComponent.h / 2;
            }
            //place bullet at position
            bulletComponent.attr({
                x: (Tank.x + offsetX),
                y: (Tank.y + offsetY)
            });

            // start sprite animation
            bulletComponent.animate('BulletMove' + Tank.currentDirection
                .charAt(0).toUpperCase() + Tank.currentDirection
                .slice(1), 1, -1);
            //start moving to direction
            //TODO: better flying of the bullet
            setInterval(function() {
                bulletComponent.move(
                    bulletComponent.dir, 6);
            }, 20);
            return this;
        },
		
/**
* Взрыв при столкновении с блоком  
*
* Вызывает функция взрыва при столкновении с блоком.
*  
* @return tankComponent Обьект текущего танка
*/
        explodeOnSolids: function() {
            this.onHit('Solid', this.explode);
            return this;
        },
		
/**
* Наносимый урон танку 
*
* Вычисляет наносимый урон по танку.
*  
* @return tankComponent Обьект текущего танка
*/
        damageTanks: function() {
            this.onHit('Tank', function(bots) {
                console.log('hit tank');
                if (bots.length > 0) {
                    for (var i = 0; i < bots.length; i++) {
                        if (typeof(bots[i].obj.damage) ===
                            'function') {
                            if (
                                (this.tank.has(
                                        'Bot') && !
                                    bots[i].obj.has(
                                        'Bot')) ||
                                (!this.tank.has(
                                        'Bot') &&
                                    bots[i].obj.has(
                                        'Bot'))
                            ) {
                                bots[i].obj.damage();
                            }
                        }
                    }
                }
            });
            return this;
        },
		
/**
* Механика взрыва 
*
* Звдвет параметры для взрыва.
*  
* @return tankComponent Обьект текущего танка
*/				
        explode: function() {
            Crafty.e('Explosion').explode(this.x, this.y,
                this.dir);
            this.timeout(this.destroy, 10);
        }
    });
});