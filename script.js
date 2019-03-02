var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");

// ctx.fillRect(0,0,canvas.width,canvas.height);

var frames = 0;
var interval;
// var gravity = 2;
var score = 0;
var time = 0;
var chavoTamalArr = [];
var camionHealth = 100;
var jefaHealth = 100;
var electrodomesticos = [];
var creditsInterval;
var example = true

var mainTheme = new Audio();
mainTheme.src = "./Sounds/Tetris - A-Type Music (version 1.0).mp3";
mainTheme.loop = true;

var audioColchones = new Audio();
audioColchones.src = "./Sounds/SeCompranColchones.m4a"
audioColchones.loop = true;

class Background{
  constructor(){
    this.x = 0;
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
    ctx.font = "15px pixelart";
    ctx.fillStyle = "white";
    ctx.fillText("SCORE: " + score, 60, 50)
  }
  healthBar(){
    ctx.image = new Image();
    ctx.image.src = "./images/HB 075.png"
    ctx.drawImage(ctx.image, 540, 31, 200, 20);

  }
  infoNavBar(){
    ctx.fillStyle = "black";
    ctx.globalAlpha = 0.7;
    ctx.fillRect(25,26,750,30);
    ctx.globalAlpha = 1.0;
  }
  audio(){
    // mainTheme.play();
  }
  draw(){
    // ctx.fillStyle = grey;
    // ctx.fillRect(0,0,canvas.width,canvas.height);
    // this.x--
    if(this.x > 0) this.x = 0;
    if(this.x < -(canvas.width*2)) this.x = 0;
    ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
    ctx.drawImage(this.image, this.x + this.width, this.y, this.width, this.height);
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
  collision(item){
    return (this.x < item.x + item.width) &&
        (this.x + this.width > item.x) &&
        (this.y < item.y + item.height) &&
        (this.y + this.height > item.y);
  }
  audio(){
    if(!(frames % 3600 === 0)) {audioColchones.play()
    } else {
      audioColchones.pause()}
  }
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
    this.x = Math.floor(Math.random() * canvas.width - 60);
    this.y = 0;
    this.width = width;
    this.height = height;
    this.image = new Image();
    this.image.src = imagesrc;
  }
  draw(){
    this.y += .5;
    ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
  }
}

class ChavoTamal{
  constructor(y){
    this.x = canvas.width;
    this.y = y;
    this.width = 80;
    this.height = 70;
    this.image = new Image();
    this.image.src = "./images/Bici 1 left.png";
  }
  draw(){
    this.x--;
    if(time >= 50) this.x--;
    if(time >= 150) this.x--;
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
      ctx.fillText("DESIGN: JOSEFINA FREIRE & AGUSTIN GALESI", 100, this.y + 150)
  }
}

var background = new Background();
var camion = new Camion();
var credits = new Credits();

// class FierrosViejos{
//   constructor(){
//     this.x = camion.x;
//     this.y = camion.y;
//     this.width = 50;
//     this.height = 5;
//     this.image = new Image();
//     this.image.src = "./images/fierroViejo.png"
//   }
//   draw(){
//     this.x++;
//     ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
//   }
// }

function generateElectrodomesticosHor(){
  if(!(frames % 350 === 0)) return;
  let electrodomesticosHor = ["./images/Electrodomesticos/Microondas.png", "./images/Electrodomesticos/Radiador.png"];
  let electroHor = new Electrodomesticos(60, 35, electrodomesticosHor[Math.floor(Math.random() * electrodomesticosHor.length)]);
  electrodomesticos.push(electroHor);
}

function drawElectrodomesticosHor(){
  electrodomesticos.forEach( (electro, index) => {
    if(electro.y > canvas.height + electro.height){
      return electrodomesticos.splice(index, 1);
    }
    electro.draw()
    if(camion.collision(electro)){
      score++;
    }
  })
}

function generateElectrodomesticosSqr(){
  if(!(frames % 900 === 0)) return;
  let electrodomesticosSqr = ["./images/Electrodomesticos/Colchon.png", "./images/Electrodomesticos/Horno.png"];
  let electroSqr = new Electrodomesticos(35, 35, electrodomesticosSqr[Math.floor(Math.random() * electrodomesticosSqr.length)]);
  electrodomesticos.push(electroSqr);
}

function drawElectrodomesticosSqr(){
  electrodomesticos.forEach( (electro, index) => {
    if(electro.y > canvas.height + electro.height){
      return electrodomesticos.splice(index, 1);
    }
    electro.draw()
    if(camion.collision(electro)){
      score++;
    }
  })
}

function generateElectrodomesticosVer(){
  if(!(frames % 1200 === 0)) return;
  let electrodomesticosVer = ["./images/Electrodomesticos/Heladera.png", "./images/Electrodomesticos/Lavarropas.png"];
  let electroVer = new Electrodomesticos(35, 60, electrodomesticosVer[Math.floor(Math.random() * electrodomesticosVer.length)]);
  electrodomesticos.push(electroVer);
}

function drawElectrodomesticosVer(){
  electrodomesticos.forEach( (electro, index) => {
    if(electro.y > canvas.height + electro.height){
      return electrodomesticos.splice(index, 1);
    }
    electro.draw()
    if(camion.collision(electro)){
      score++;
    }
  })
}

function generateChavoTamal(){
  if(!(frames % 600 === 0)) return;
  var chavoTamal = new ChavoTamal(Math.floor(Math.random() * 100) + 230);
  chavoTamalArr.push(chavoTamal);
}

function drawChavoTamal(){
  chavoTamalArr.forEach( (chavo, index) => {
    if(chavo.x < -130){
      return chavoTamalArr.splice(index, 1);
    }
    chavo.draw();
    if(camion.collision(chavo)){
      gameOver();
    }
  })
}

function update(){
  frames++;
  ctx.clearRect(0,0,canvas.width,canvas.height);
  background.draw();
  background.infoNavBar();
  background.score();
  background.time();
  background.healthBar();
  background.audio();
  generateChavoTamal();
  camion.draw();
  camion.audio();
  generateElectrodomesticosHor();
  drawElectrodomesticosHor();
  generateElectrodomesticosVer();
  drawElectrodomesticosVer();
  generateElectrodomesticosSqr();
  drawElectrodomesticosSqr();
  drawChavoTamal();
}

function startGame(){
  if(interval !== undefined) return;
  interval = setInterval(update, 1000/60)
}

function gameOver(){
  audioColchones.pause();
  mainTheme.pause();
  clearInterval(interval);
  interval = undefined
  example = false
  creditsInterval = setInterval(function(){
    if(!example){
    frames++
    credits.draw();
    }
  },1000/60)
}

function restart(){
  console.log('fin')
  if(interval !== undefined) return;
    score = 0;
    time = 0;
    frames = 0;
    interval = undefined;
    creditsInterval = undefined;
    electrodomesticos = [];
    chavoTamalArr = [];
    camion.x = 100;
    camion.y = 310;
    background.x = 0;
    background.y = 0;
    mainTheme.currentTime = 0;
    audioColchones.currentTime = 0;
    clearInterval(creditsInterval);
    creditsInterval = undefined;
    example = true
    credits = new Credits()
    startGame();
}

addEventListener("keydown", function(e){
  // if(e.keyCode === 32){camion.jump()}
  if(e.keyCode === 39){camion.moveForward(); camion.image.src = "./images/Camion 1 right.png"; background.x--}
  if(e.keyCode === 37){camion.moveBackwards(); camion.image.src = "./images/Camion 1 left.png"; background.x++}
  if(e.keyCode === 38){camion.moveUp()}
  if(e.keyCode === 40){camion.moveDown()}
  if(e.keyCode === 82){restart()}
})