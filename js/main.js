var audio = document.getElementById("myaudio");
audio.volume = 0.1;

var imagetank = 'image/tank-up.png'; 

//элемент отрисовки
var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");

//Даннные игрока
var x = canvas.width/2;
var y = canvas.height/2;
var speed=10;

//функция обработки клавиш
function keypressed (e) {
    switch (e.keyCode) {       
        case 37:  // если нажата клавиша влево           
            x = x - speed; 
            imagetank = 'image/tank-left.png'; 
            break;
        case 38:   // если нажата клавиша вверх
            y = y - speed;
            imagetank = 'image/tank-up.png'; 
            break;
        case 39:   // если нажата клавиша вправо
            x = x + speed;
            imagetank = 'image/tank-right.png'; 
            break;
        case 40:   // если нажата клавиша вниз
            y = y + speed;
            imagetank = 'image/tank-down.png'; 
            break;
    }
}
 
addEventListener("keydown", keypressed);

//Функция отрисовки игрока
function drawtank () {
	var example = document.getElementById("myCanvas");
    example.width = window.innerWidth;
    example.height = window.innerHeight;
    ctx = example.getContext('2d'); 
    ctx.fillRect(0, 0, screen.width, screen.height)
    pic = new Image();             
    pic.src = imagetank;  
    pic.onload = function () {    
        ctx.drawImage(pic, x, y);  
    };
}

function render () {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawtank();
}

setInterval(render, 10);
