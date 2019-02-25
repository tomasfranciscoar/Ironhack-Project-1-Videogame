var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");

var frames = 0;
var interval;
var score = 0;
var time = 0;

class Background{
  constructor(){
    this.x = -80;
    this.y = 0;
    this.width = canvas.width*2;
    this.height = canvas.height;
    this.image = new Image();
    this.image.src = "./images/Fondo doble.png";
  }
  time(){
    if(frames % 60 === 0) time++
    ctx.font = "15px pixelart";
    ctx.fillStyle = "white";
    ctx.fillText("TIME: " + time, 330, 50)
  }
  score(){
    if(frames % 60 === 0) score++;
    ctx.font = "15px pixelart";
    ctx.fillStyle = "white";
    ctx.fillText("SCORE: " + score, 60, 50)
  }
  infoNavBar(){
    ctx.fillStyle = "gray";
    ctx.globalAlpha = 0.5;
    ctx.fillRect(25,18,750,50);
    ctx.globalAlpha = 1.0;
  }
  draw(){
    // ctx.fillStyle = grey;
    // ctx.fillRect(0,0,canvas.width,canvas.height);
    this.x--
    if(this.x < -canvas.width*2) this.x = -80;
    ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
    ctx.drawImage(this.image, this.x + this.width - 130, this.y, this.width, this.height);
  }
}

class Camion{
  constructor(){
    this.x = 100;
    this.y = 310;
    this.width = 130;
    this.height = 70;
    this.image = new Image();
    this.image.src = "./images/Camion 1 right.png"
  }
  draw(){
    ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
  }
}

var background = new Background();
var camion = new Camion();

function update(){
  frames++;
  ctx.clearRect(0,0,canvas.width,canvas.height);
  background.draw();
  background.infoNavBar();
  background.score();
  background.time();
  camion.draw();
}

function restart(){
  
}

function startGame(){
  interval = setInterval(update, 1000/60)
}