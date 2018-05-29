/**
* Логический канвас
*
* Используем объект document и метод
* getElementById для присоединения
* canvas с документа html. Дополнительная
* детализация не нужна
*
* @var object canvas
*/
var canvas;

/**
* Контекст для канваса
*
* Позволяет рисовать по канвасу
* в 2d режиме. Дполнительная
* детализация не нужна
*
* @var object context
*/
var context; 

/**
* Изображение для кирпичного блока
*
* Содержит адрес изобрражение для кирпичного блока.
* Долнительная детализация не нужна
*
* @var object imgBrick
*/
var imgBrick;

/**
* Изображение для стального блока
*
* Содержит адрес изобрражение для стального блока.
* Долнительная детализация не нужна
*
* @var object imgSteel
*/
var imgSteel;

/**
* Изображение для водного блока
*
* Содержит адрес изобрражение для водного блока.
* Долнительная детализация не нужна
*
* @var object imgWater
*/
var imgWater;

/**
* Изображение для лесного блока
*
* Содержит адрес изобрражение для лесного блока.
* Долнительная детализация не нужна
*
* @var object imgForest
*/
var imgForest;

/**
* Изображение для танка
*
* Содержит адрес изобрражение для танка.
* Долнительная детализация не нужна
*
* @var object imgTank
*/
var imgTank; 

/**
* Массив для хранения карты
*
* Содержит массив значений для хранения и отрисовки карты.
* Долнительная детализация не нужна
*
* @var object aMap
*/
var aMap;

/**
* Обьект текущего танка
*
* Содержит все необходимые значения, текущего танка,
* для его отрисовки, перемещения.
* Долнительная детализация не нужна
*
* @var object oTank
*/
var oTank; 

/**
* Константа 24
*
* Используется в отрисовке
* карты для определения размера одного блока.
* Дополнительная детализация
* не нужна
*
* @var object iCellSize
*/
var iCellSize = 24; 

/**
* Константа 26
*
* Используется в отрисовке
* карты для определения количества блоков по X.
* Дополнительная детализация
* не нужна
*
* @var object iXCnt
*/
var iXCnt = 26; 

/**
* Константа 26
*
* Используется в отрисовке
* карты для определения количества блоков по Y.
* Дополнительная детализация
* не нужна
*
* @var object iYCnt
*/
var iYCnt = 26; 

/**
* Работа со свойствами танка
*
* Если аргументы определены, то устанавливается новое
* значения свойств Tank.
*  
* @param int x Текущая координата X
* @param int y Текущая координата Y
* @param int w Текущая ширина изображения танка
* @param int h Текущая высота изображения танка
* @param Image image Текущее изображение для отрисовки танка
* @return void Ничего не возвращает
*/
function Tank(x, y, w, h, image) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.i = 0;
    this.image = image;
}

/**
* Работа со свойствами context
*
* Позволяет очистить элемент отрисовки.
*  
* @return void Ничего не возвращает
*/
function clear() { 
    context.clearRect(0, 0, canvas.width, canvas.height);
}

/**
* Отрисовка сцены
*
* Отрисовывает текущую сцену
* при изменении положения обьектов.
*  
* @return void Ничего не возвращает
*/
function drawScene() { 
    clear(); 
    context.fillStyle = '#111';
    context.fillRect(0, 0, canvas.width, canvas.height);
    context.save();
    for (var y = 0; y < iYCnt; y++) { 
        for (var x = 0; x < iXCnt; x++) {
            switch (aMap[y][x]) {
                case 0: 
                    break;
                case 1: 
                    context.drawImage(imgBrick, 0, 0, iCellSize, iCellSize, x*iCellSize, y*iCellSize, iCellSize, iCellSize);
                    break;
                case 2: 
                    context.drawImage(imgSteel, 0, 0, iCellSize, iCellSize, x*iCellSize, y*iCellSize, iCellSize, iCellSize);
                    break;
                case 3: 
                    context.drawImage(imgForest, 0, 0, iCellSize, iCellSize, x*iCellSize, y*iCellSize, iCellSize, iCellSize);
                    break;
                case 4: 
                    context.drawImage(imgWater, 0, 0, iCellSize, iCellSize, x*iCellSize, y*iCellSize, iCellSize, iCellSize);
                    break;
            }
        }
    }
    context.restore();
    context.drawImage(oTank.image, oTank.i*oTank.w, 0, oTank.w, oTank.h, oTank.x, oTank.y, oTank.w, oTank.h);
}

/**
* События нажатия клавиш
*
* Производит обработку нажатия всех клавиш,
* изменяет данные карты при перемещении обьектов.
*  
* @return void Ничего не возвращает
*/
$(function () {
    canvas = document.getElementById('scene');
    canvas.width  = iXCnt * iCellSize;
    canvas.height = iYCnt * iCellSize;
    context = canvas.getContext('2d');
    aMap = ([
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0],
      [0, 0, 1, 1, 4, 4, 4, 4, 0, 0, 2, 2, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 1, 1, 4, 4, 4, 4, 0, 0, 2, 2, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 4, 4, 4, 4, 1, 1, 3, 3, 3, 3, 3, 3, 4, 4, 4, 4, 0, 0, 2, 2, 0, 0],
      [0, 0, 0, 0, 4, 4, 4, 4, 1, 1, 3, 3, 3, 3, 3, 3, 4, 4, 4, 4, 0, 0, 2, 2, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 3, 3, 3, 3, 3, 4, 4, 4, 4, 1, 1, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 3, 3, 3, 3, 3, 4, 4, 4, 4, 1, 1, 0, 0, 0, 0],
      [0, 0, 2, 2, 0, 0, 0, 0, 4, 4, 4, 4, 0, 0, 3, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 2, 2, 0, 0, 0, 0, 4, 4, 4, 4, 0, 0, 3, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [3, 3, 3, 3, 1, 1, 0, 0, 4, 4, 4, 4, 2, 2, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0],
      [3, 3, 3, 3, 1, 1, 0, 0, 4, 4, 4, 4, 2, 2, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0],
      [3, 3, 3, 3, 3, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 2, 0, 0, 0, 0, 2, 2],
      [3, 3, 3, 3, 3, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 2, 0, 0, 0, 0, 2, 2],
      [0, 0, 1, 1, 4, 4, 4, 4, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 1, 1, 4, 4, 4, 4, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [2, 2, 0, 0, 4, 4, 4, 4, 3, 3, 3, 3, 4, 4, 4, 4, 3, 3, 3, 3, 0, 0, 1, 1, 0, 0],
      [2, 2, 0, 0, 4, 4, 4, 4, 3, 3, 3, 3, 4, 4, 4, 4, 3, 3, 3, 3, 0, 0, 1, 1, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 3, 3, 0, 0, 4, 4, 4, 4, 3, 3, 3, 3, 4, 4, 4, 4, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 3, 3, 0, 0, 4, 4, 4, 4, 3, 3, 3, 3, 4, 4, 4, 4, 0, 0],
      [0, 0, 0, 0, 0, 0, 2, 2, 3, 3, 0, 0, 0, 0, 0, 0, 3, 3, 3, 3, 4, 4, 4, 4, 0, 0],
      [0, 0, 0, 0, 0, 0, 2, 2, 3, 3, 0, 0, 0, 0, 0, 0, 3, 3, 3, 3, 4, 4, 4, 4, 0, 0],
      [0, 0, 0, 0, 1, 1, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 1, 1, 0, 0, 1, 1, 0, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 1, 1, 2, 2, 0, 0, 0, 0],
      [1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 1, 1, 2, 2, 0, 0, 0, 0]
    ]);

    imgBrick = new Image();
    imgBrick.src = 'images/brick.png';
    imgSteel = new Image();
    imgSteel.src = 'images/steel.png';
    imgWater = new Image();
    imgWater.src = 'images/water.png';
    imgForest = new Image();
    imgForest.src = 'images/forest.png';
    imgTank = new Image();
    imgTank.src = 'images/tank.png';
    oTank = new Tank(iCellSize*9, iCellSize*24, 48, 48, imgTank);

    $(window).keydown(function(event){ 
        switch (event.keyCode) {
            case 38: 
                oTank.i = 2;
                var iCurCelX = (2 * oTank.x) / 48;
                var iCurCelY = (2 * oTank.y) / 48;
                if (iCurCelY) {
                    var iTest1 = aMap[iCurCelY-1][iCurCelX];
                    var iTest2 = aMap[iCurCelY-1][iCurCelX+1];

                    if ((iTest1 == 0 || iTest1 == 3) && (iTest2 == 0 || iTest2 == 3)) {
                        oTank.y-=24;
                        if (oTank.y < 0) {
                            oTank.y = 0;
                        }
                    }
                }
                break;
            case 40: 
                oTank.i = 3;
                var iCurCelX = (2 * oTank.x) / 48;
                var iCurCelY = (2 * oTank.y) / 48;
                if (iCurCelY+2 < iYCnt) {
                    var iTest1 = aMap[iCurCelY+2][iCurCelX];
                    var iTest2 = aMap[iCurCelY+2][iCurCelX+1];

                    if ((iTest1 == 0 || iTest1 == 3) && (iTest2 == 0 || iTest2 == 3)) {
                        oTank.y+=24;
                        if (oTank.y > 576) { 
                            oTank.y = 576;
                        }
                    }
                }
                break;
            case 37: 
                oTank.i = 1;
                var iCurCelX = (2 * oTank.x) / 48;
                var iCurCelY = (2 * oTank.y) / 48;
                var iTest1 = aMap[iCurCelY][iCurCelX-1];
                var iTest2 = aMap[iCurCelY+1][iCurCelX-1];

                if ((iTest1 == 0 || iTest1 == 3) && (iTest2 == 0 || iTest2 == 3)) {
                    oTank.x-=24;
                    if (oTank.x < 0) {
                        oTank.x = 0;
                    }
                }
                break;
            case 39: 
                oTank.i = 0;
                var iCurCelX = (2 * oTank.x) / 48;
                var iCurCelY = (2 * oTank.y) / 48;
                var iTest1 = aMap[iCurCelY][iCurCelX+2];
                var iTest2 = aMap[iCurCelY+1][iCurCelX+2];

                if ((iTest1 == 0 || iTest1 == 3) && (iTest2 == 0 || iTest2 == 3)) {
                    oTank.x+=24;
                    if (oTank.x > 576) { 
                        oTank.x = 576;
                    }
                }
                break;
        }
    });
    setInterval(drawScene, 40); 
});