var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");

var frames = 0;
var interval;
var gravity = 2;
var score = 0;
var time = 0;
var chavoTamalArr = [];
var camionHealth = 100;
var jefaHealth = 100;

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
  credits(){
    ctx.fillStyle = "black";
    ctx.fillRect(0,0,canvas.width,canvas.height);
    ctx.fillStyle = "white";
    ctx.fillText("PROGRAMMING: TOMAS FREIRE", 350, canvas.height);
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
  moveForward(){
    this.x += 3
  }
  moveBackwards(){
    this.x -= 3
  }
  jump(){
    this.y -= 60
  }
  draw(){
    if(this.y < canvas.height - 140) this.y += gravity;
    ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
  }
}

class ChavoTamal{
  constructor(y){
    this.x = canvas.width;
    this.y = y;
    this.width = 130;
    this.height = 70;
    this.image = new Image();
    this.image.src = "./images/Bici tamales left.png";
  }
  draw(){
    this.x -= 2;
    ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
  }
}

var background = new Background();
var camion = new Camion();

function generateChavoTamal(){
  if(!(frames % 300 === 0)) return;
  var chavoTamal = new ChavoTamal(Math.floor(Math.random() * 100) + 230);
  chavoTamalArr.push(chavoTamal);
}

function drawChavoTamal(){
  chavoTamalArr.forEach( (chavo, index) => {
    if(chavo.x < -130){
      return chavoTamalArr.splice(index, 1);
    }
    chavo.draw();
  })
}

function update(){
  frames++;
  ctx.clearRect(0,0,canvas.width,canvas.height);
  background.draw();
  background.infoNavBar();
  background.score();
  background.time();
  generateChavoTamal();
  drawChavoTamal();
  camion.draw();
}

function restart(){
  
}

function startGame(){
  interval = setInterval(update, 1000/60)
}

addEventListener("keydown", function(e){
  if(e.keyCode === 32){
    camion.jump();
  }
  if(e.keyCode === 39){
    camion.moveForward();
    camion.image.src = "./images/Camion 1 right.png"
  }
  if(e.keyCode === 37){
    camion.moveBackwards();
    camion.image.src = "./images/Camion 1 left.png"
  }
})