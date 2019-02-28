var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");

var frames = 0;
var interval;
// var gravity = 2;
var score = 0;
var time = 0;
var chavoTamalArr = [];
var camionHealth = 100;
var jefaHealth = 100;
var electrodomesticos = [];

class Background{
  constructor(){
    this.x = -80;
    this.y = 0;
    this.width = canvas.width*2;
    this.height = canvas.height;
    this.image = new Image();
    this.image.src = "./images/Fondo-doble.png";
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
    ctx.fillStyle = "red";
    ctx.globalAlpha = 0.4;
    ctx.fillRect(25,18,750,50);
    ctx.globalAlpha = 1.0;
  }
  draw(){
    // ctx.fillStyle = grey;
    // ctx.fillRect(0,0,canvas.width,canvas.height);
    // this.x--
    if(this.x > 0) this.x = 0;
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
    this.x += 4
  }
  moveBackwards(){
    this.x -= 4
  }
  moveUp(){
    this.y -= 4
  }
  moveDown(){
    this.y += 4
  }
  // jump(){
  //   this.y -= 60
  // }
  draw(){
    if(this.x < 0) this.x = 0;
    if(this.x > canvas.width-this.width-30){
      this.x = canvas.width-this.width-30;
      background.x -= 3
    };
    if(this.y < 220) this.y = 220;
    if(this.y > 370) this.y = 370;
    ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
  }
}

class Electrodomesticos{
  constructor(width, height, imagesrc){
    this.x = Math.floor(Math.random() * canvas.width);
    this.y = 0;
    this.width = width;
    this.height = height;
    this.image = new Image();
    this.image.src = imagesrc;
  }
  draw(){
    this.y++
    ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
  }
}

class ChavoTamal{
  constructor(y){
    this.x = canvas.width;
    this.y = y;
    this.width = 130;
    this.height = 110;
    this.image = new Image();
    this.image.src = "./images/Bici 1 left.png";
  }
  draw(){
    this.x -= 2;
    ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
  }
}

class Credits{
  constructor(){
    this.x = 250;
    this.y = canvas.height;
    this.width = canvas.width;
    this.height = canvas.height;
  }
  draw(){
    this.y--
    if(this.y < 160) this.y = 160;
    ctx.fillStyle = "black";
    ctx.fillRect(0,0,canvas.width,canvas.height);
    ctx.fillStyle = "white";
    ctx.font = "30px pixelart";
    ctx.fillText("GAME OVER", 270, this.y)
    ctx.font = "15px pixelart";
    ctx.fillText("PROGRAMMING: TOMAS FREIRE", 210, this.y + 100);
    ctx.fillText("DESIGN: JOSEFINA FREIRE & AGUSTIN GALESI", 100, this.y + 150);
  }
}

var background = new Background();
var camion = new Camion();
var credits = new Credits();

function generateElectrodomesticos(){
  if(!(frames % 350 === 0)) return;
  let electrodomesticosSqr = ["./images/Electrodomesticos/Colchon.png", "./images/Electrodomesticos/Horno.png"];
  let electrodomesticosVer = ["./images/Electrodomesticos/Heladera.png", "./images/Electrodomesticos/Lavarropas.png"];
  let electrodomesticosHor = ["./images/Electrodomesticos/Microondas.png", "./images/Electrodomesticos/Radiador.png"];
  let electroSqr = new Electrodomesticos(50, 50, electrodomesticosSqr[Math.floor(Math.random() * electrodomesticosSqr.length)]);
  let electroVer = new Electrodomesticos(50, 80, electrodomesticosVer[Math.floor(Math.random() * electrodomesticosVer.length)]);
  let electroHor = new Electrodomesticos(80, 50, electrodomesticosHor[Math.floor(Math.random() * electrodomesticosHor.length)]);
  electrodomesticos.push(electroSqr);
  electrodomesticos.push(electroVer);
  electrodomesticos.push(electroHor);
}

function drawElectrodomesticos(){
  electrodomesticos.forEach( (electro, index) => {
    if(electro.y > canvas.height + electro.height){
      return electrodomesticos.splice(index, 1);
    }
    electro.draw()
  })
}

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
  generateElectrodomesticos();
  drawElectrodomesticos();
  camion.draw();
}

function restart(){
  
}

function startGame(){
  interval = setInterval(update, 1000/60)
}

addEventListener("keydown", function(e){
  // if(e.keyCode === 32){camion.jump()}
  if(e.keyCode === 39){camion.moveForward(); camion.image.src = "./images/Camion 1 right.png"; background.x--}
  if(e.keyCode === 37){camion.moveBackwards(); camion.image.src = "./images/Camion 1 left.png"; background.x++}
  if(e.keyCode === 38){camion.moveUp()}
  if(e.keyCode === 40){camion.moveDown()}
})