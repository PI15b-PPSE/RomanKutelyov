var audio = document.getElementById("myaudio");
audio.volume = 0.1;

var imageTank = 'image/tank-up.png'; 

//элемент отрисовки
var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");

//Даннные игрока
var x = canvas.width/2;
var y = canvas.height/2;
var speed=10;

//функция обработки клавиш
function key_Pressed(e){
    switch(e.keyCode){
         
        case 37:  // если нажата клавиша влево           
            x = x - speed; 
            imageTank = 'image/tank-left.png'; 
            break;
        case 38:   // если нажата клавиша вверх
            y = y - speed;
            imageTank = 'image/tank-up.png'; 
            break;
        case 39:   // если нажата клавиша вправо
            x = x + speed;
            imageTank = 'image/tank-right.png'; 
            break;
        case 40:   // если нажата клавиша вниз
            y = y + speed;
            imageTank = 'image/tank-down.png'; 
            break;
    }
}
 
addEventListener("keydown", key_Pressed);

//Функция отрисовки игрока
function drawTank() {
	var example = document.getElementById("myCanvas");
    example.width = window.innerWidth;
    example.height = window.innerHeight;
    ctx = example.getContext('2d'); 
    ctx.fillRect(0, 0, screen.width, screen.height)
    pic = new Image();             
    pic.src = imageTank;  
    pic.onload = function() {    
		ctx.drawImage(pic, x, y);  
    };
}

function Render() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawTank();
}

setInterval(Render, 10);
