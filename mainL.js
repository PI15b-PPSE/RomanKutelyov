<!doctype html> 
<html>
  <meta charset='utf-8'>

  <head>
    <title>Tank Game</title>
    <audio autoplay id="myaudio">
  <source src="sounds/music.mp3">
</audio>
  </head>
  <body>
    <canvas id="myCanvas"' style="position: absolute; left: 0; top: 0">Tanks Game</canvas>
<script type="text/javascript">
var audio = document.getElementById("myaudio");
audio.volume = 0.1;
var imagetank = 'image/tank-up.png'; 
//������� ���������
var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");
//������� ������
var x = canvas.width/2;
var y = canvas.height/2;
var speed=10;
//������� ��������� ������
function key_Pressed(e){
    switch(e.keyCode){
         
        case 37:  // ���� ������ ������� �����           
            x = x - speed; 
            imagetank = 'image/tank-left.png'; 
            break;
        case 38:   // ���� ������ ������� �����
            y = y - speed;
            imagetank = 'image/tank-up.png'; 
            break;
        case 39:   // ���� ������ ������� ������
            x = x + speed;
            imagetank = 'image/tank-right.png'; 
            break;
        case 40:   // ���� ������ ������� ����
             y = y + speed;
             imagetank = 'image/tank-down.png'; 
            break;
    }
}
 
addEventListener("keydown", key_Pressed);
//������� ��������� ������
function drawTank() {
	var example = document.getElementById("myCanvas");
    example.width = window.innerWidth;
    example.height = window.innerHeight;
    ctx = example.getContext('2d'); 
    ctx.fillRect(0, 0, screen.width, screen.height)
    pic = new Image();             
    pic.src = imagetank;  
    pic.onload = function() {    
    ctx.drawImage(pic, x, y);  
    };
}
function Render() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawTank();
}
setInterval(Render, 10);
</script>
  
  </body>
</html>