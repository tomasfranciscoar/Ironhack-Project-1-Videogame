var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");

var frames = 0;
var interval;
var intervalTwoPlayers;
var score = 0;
var time = 0;
var fierrosViejosArr = [];
var chavoTamalArr = [];
var chavoTamal;
var camionHealth = 1000;
var chavoTamalesHealth = 1000;
var jefaHealth = 300;
var electrodomesticos = [];
var creditsLoseInterval;
var creditsWinInterval;
var exampleLose = true;
var exampleWin = true;
var fierrosViejos;
var tamalesArr = [];
var tamalesFinalesArr = [];

var mainTheme = new Audio();
mainTheme.src = "./Sounds/Super Mario World - Underground.mp3";
mainTheme.loop = true;

var audioColchones = new Audio();
audioColchones.src = "./Sounds/SeCompranColchones.m4a";
audioColchones.loop = true;

var audioGameOver = new Audio();
audioGameOver.src = "./Sounds/Super Mario World - Game Over.mp3";
audioGameOver.loop = false;

var audioGetElectro = new Audio();
audioGetElectro.src = "./Sounds/Super Mario World - Nintendo Logo.mp3";
audioGetElectro.loop = false;

var audioExplosion = new Audio();
audioExplosion.src = "./Sounds/Explosion.m4a";
audioExplosion.loop = false;

var audioBoss = new Audio();
audioBoss.src = "./Sounds/Super Mario World - Boss Battle.mp3";
audioBoss.loop = true;

var audioWinner = new Audio();
audioWinner.src = "./Sounds/Super Mario World - Invincible.mp3";
audioWinner.loop = false;

class Background {
  constructor() {
    this.x = 0;
    this.y = 0;
    this.width = canvas.width * 2;
    this.height = canvas.height;
    this.image = new Image();
    this.image.src = "./images/Fondo-doble.png";
  }
  time() {
    if (frames % 60 === 0) time++;
    ctx.font = "15px pixelart";
    ctx.fillStyle = "white";
    ctx.fillText("TIME: " + time, 330, 50);
  }
  score() {
    ctx.font = "15px pixelart";
    ctx.fillStyle = "white";
    ctx.fillText("SCORE: " + score, 60, 50);
  }
  infoNavBar() {
    ctx.fillStyle = "black";
    ctx.globalAlpha = 0.7;
    ctx.fillRect(25, 26, 750, 30);
    ctx.globalAlpha = 1.0;
  }
  audio() {
    mainTheme.play();
  }
  draw() {
    if (this.x > 0) this.x = 0;
    if (this.x < -(canvas.width * 2)) this.x = 0;
    ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
    ctx.drawImage(
      this.image,
      this.x + this.width,
      this.y,
      this.width,
      this.height
    );
  }
}

class Camion {
  constructor() {
    this.x = 100;
    this.y = 310;
    this.width = 130;
    this.height = 70;
    this.image = new Image();
    this.image.src = "./images/Camion 1 right.png";
    this.image1 = new Image();
    this.image1.src = "./images/Camion 2 right.png";
    this.imageRight = this.image;
  }
  moveForward() {
    this.x += 12;
  }
  moveBackwards() {
    this.x -= 12;
  }
  moveUp() {
    this.y -= 12;
  }
  moveDown() {
    this.y += 12;
  }
  collision(item) {
    return (
      this.x < item.x + item.width &&
      this.x + this.width > item.x &&
      this.y < item.y + item.height &&
      this.y + this.height > item.y
    );
  }
  audio() {
    if (!(frames % 3600 === 0)) {
      audioColchones.play();
    } else {
      audioColchones.pause();
    }
  }
  health() {
    if (camionHealth <= 0) {
      gameOver();
    }
  }
  camionLoses() {
    if (camionHealth <= 0) {
      clearInterval(intervalTwoPlayers);
      mainTheme.pause();
      audioWinner.play();
      ctx.fillText("Player 2 WINS!", 300, 280);
    }
  }
  draw() {
    if (this.x < 0) this.x = 0;
    if (this.x > canvas.width - this.width - 30) {
      this.x = canvas.width - this.width - 30;
      background.x -= 3;
    }
    if (this.y < 220) this.y = 220;
    if (this.y > canvas.height - this.height)
      this.y = canvas.height - this.height;
    ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
  }
  drawTwoPlayers() {
    if (this.x < 0) this.x = 0;
    if (this.x > canvas.width - this.width) {
      this.x = canvas.width - this.width;
    }
    if (this.y < 220) this.y = 220;
    if (this.y > canvas.height - this.height)
      this.y = canvas.height - this.height;
    ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
  }
}

class Electrodomesticos {
  constructor(width, height, imagesrc) {
    this.x = Math.floor(Math.random() * canvas.width - 60);
    this.y = 0;
    this.width = width;
    this.height = height;
    this.image = new Image();
    this.image.src = imagesrc;
  }
  draw() {
    if (this.y < 350) {
      this.y += 0.5;
    }
    ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
  }
}

class ChavoTamal {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.width = 80;
    this.height = 70;
    this.image = new Image();
    this.image.src = "./images/Bici 1 left.png";
    this.image1 = new Image();
    this.image1.src = "./images/Bici 2 left.png";
    this.imagen = this.image;
  }
  collision(item) {
    return (
      this.x < item.x + item.width &&
      this.x + this.width > item.x &&
      this.y < item.y + item.height &&
      this.y + this.height > item.y
    );
  }
  moveForward() {
    this.x -= 12;
  }
  moveBackwards() {
    this.x += 12;
  }
  moveUp() {
    this.y -= 12;
  }
  moveDown() {
    this.y += 12;
  }
  draw() {
    this.x--;
    if (time >= 50) this.x--;
    if (time >= 150) this.x--;
    if (frames % 30 === 0) {
      this.imagen = this.imagen == this.image ? this.image1 : this.image;
    }
    ctx.drawImage(this.imagen, this.x, this.y, this.width, this.height);
  }
  chavoLoses() {
    if (chavoTamalesHealth <= 0) {
      clearInterval(intervalTwoPlayers);
      mainTheme.pause();
      audioWinner.play();
      ctx.fillText("Player 1 WINS!", 300, 280);
    }
  }
  drawTwoPlayers() {
    if (this.x < 0) this.x = 0;
    if (this.x > canvas.width - this.width) {
      this.x = canvas.width - this.width;
    }
    if (this.y < 220) this.y = 220;
    if (this.y > canvas.height - this.height)
      this.y = canvas.height - this.height;
    ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
  }
}

class Credits {
  constructor() {
    this.x = 250;
    this.y = canvas.height;
    this.width = canvas.width;
    this.height = canvas.height;
  }
  draw() {
    this.y--;
    if (this.y < 160) this.y = 160;
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "white";
    ctx.font = "30px pixelart";
    ctx.fillText("GAME OVER", 270, this.y);
    ctx.font = "10px pixelart";
    ctx.fillText("(Press R to restart)", 308, this.y + 30);
    ctx.font = "15px pixelart";
    ctx.fillText("PROGRAMMING: TOMAS FREIRE", 210, this.y + 100);
    ctx.fillText("DESIGN: JOSEFINA FREIRE & AGUSTIN GALESI", 100, this.y + 140);
    ctx.fillText("MENTORS: Deivid, Foggy & Kain", 180, this.y + 180);
  }
  drawWin() {
    this.y--;
    if (this.y < 160) this.y = 160;
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "white";
    ctx.font = "30px pixelart";
    ctx.fillText("YOU WON!", 290, this.y);
    ctx.font = "15px pixelart";
    ctx.fillText("PROGRAMMING: TOMAS FREIRE", 210, this.y + 100);
    ctx.fillText("DESIGN: JOSEFINA FREIRE & AGUSTIN GALESI", 100, this.y + 140);
    ctx.fillText("MENTORS: Deivid, Foggy & Kain", 180, this.y + 180);
  }
}

var background = new Background();
var camion = new Camion();
var credits = new Credits();
var chavoTamalTwoPlayers = new ChavoTamal(620, 310);

class FierrosViejos {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.width = 50;
    this.height = 5;
    this.image = new Image();
    this.image.src = "./images/fierroViejo.png";
  }
  collision(item) {
    return (
      this.x < item.x + item.width &&
      this.x + this.width > item.x &&
      this.y < item.y + item.height &&
      this.y + this.height > item.y
    );
  }
  draw() {
    this.x += 8;
    ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
  }
}

class Tamales {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.width = 10;
    this.height = 5;
    this.image = new Image();
    this.image.src = "./images/Tamal.png";
  }
  draw() {
    this.x -= 3;
    ctx.drawImage(
      this.image,
      this.x + 40,
      this.y + 35,
      this.width,
      this.height
    );
  }
}

class TamalesFinales {
  constructor() {
    this.x = canvas.width;
    this.y = Math.floor(Math.random() * canvas.height + 50);
    this.width = 10;
    this.height = 5;
    this.image = new Image();
    this.image.src = "./images/Tamal.png";
  }
  draw() {
    this.x -= 3;
    ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
  }
}

class HealthBar {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.width = 200;
    this.height = 20;
    this.image100 = new Image();
    this.image100.src = "./images/HB 100.png";
    this.image090 = new Image();
    this.image090.src = "./images/HB 090.png";
    this.image080 = new Image();
    this.image080.src = "./images/HB 080.png";
    this.image070 = new Image();
    this.image070.src = "./images/HB 070.png";
    this.image060 = new Image();
    this.image060.src = "./images/HB 060.png";
    this.image050 = new Image();
    this.image050.src = "./images/HB 050.png";
    this.image040 = new Image();
    this.image040.src = "./images/HB 040.png";
    this.image030 = new Image();
    this.image030.src = "./images/HB 030.png";
    this.image020 = new Image();
    this.image020.src = "./images/HB 020.png";
    this.image010 = new Image();
    this.image010.src = "./images/HB 010.png";
  }
  draw() {
    switch (true) {
      default:
        return ctx.drawImage(
          this.image100,
          this.x,
          this.y,
          this.width,
          this.height
        );
      case camionHealth >= 801:
        return ctx.drawImage(
          this.image090,
          this.x,
          this.y,
          this.width,
          this.height
        );
        break;
      case camionHealth >= 701:
        return ctx.drawImage(
          this.image080,
          this.x,
          this.y,
          this.width,
          this.height
        );
        break;
      case camionHealth >= 601:
        return ctx.drawImage(
          this.image070,
          this.x,
          this.y,
          this.width,
          this.height
        );
        break;
      case camionHealth >= 501:
        return ctx.drawImage(
          this.image060,
          this.x,
          this.y,
          this.width,
          this.height
        );
        break;
      case camionHealth >= 401:
        return ctx.drawImage(
          this.image050,
          this.x,
          this.y,
          this.width,
          this.height
        );
        break;
      case camionHealth >= 301:
        return ctx.drawImage(
          this.image040,
          this.x,
          this.y,
          this.width,
          this.height
        );
        break;
      case camionHealth >= 201:
        return ctx.drawImage(
          this.image030,
          this.x,
          this.y,
          this.width,
          this.height
        );
        break;
      case camionHealth >= 101:
        return ctx.drawImage(
          this.image020,
          this.x,
          this.y,
          this.width,
          this.height
        );
        break;
      case camionHealth < 101:
        return ctx.drawImage(
          this.image010,
          this.x,
          this.y,
          this.width,
          this.height
        );
        break;
    }
  }
  drawPlayerOne() {
    switch (true) {
      default:
        return ctx.drawImage(
          this.image100,
          this.x,
          this.y,
          this.width,
          this.height
        );
      case camionHealth >= 801:
        return ctx.drawImage(
          this.image090,
          this.x,
          this.y,
          this.width,
          this.height
        );
        break;
      case camionHealth >= 701:
        return ctx.drawImage(
          this.image080,
          this.x,
          this.y,
          this.width,
          this.height
        );
        break;
      case camionHealth >= 601:
        return ctx.drawImage(
          this.image070,
          this.x,
          this.y,
          this.width,
          this.height
        );
        break;
      case camionHealth >= 501:
        return ctx.drawImage(
          this.image060,
          this.x,
          this.y,
          this.width,
          this.height
        );
        break;
      case camionHealth >= 401:
        return ctx.drawImage(
          this.image050,
          this.x,
          this.y,
          this.width,
          this.height
        );
        break;
      case camionHealth >= 301:
        return ctx.drawImage(
          this.image040,
          this.x,
          this.y,
          this.width,
          this.height
        );
        break;
      case camionHealth >= 201:
        return ctx.drawImage(
          this.image030,
          this.x,
          this.y,
          this.width,
          this.height
        );
        break;
      case camionHealth >= 101:
        return ctx.drawImage(
          this.image020,
          this.x,
          this.y,
          this.width,
          this.height
        );
        break;
      case camionHealth < 101:
        return ctx.drawImage(
          this.image010,
          this.x,
          this.y,
          this.width,
          this.height
        );
        break;
    }
  }
  drawPlayerTwo() {
    switch (true) {
      default:
        ctx.drawImage(this.image100, this.x, this.y, this.width, this.height);
      case chavoTamalesHealth >= 801:
        ctx.drawImage(this.image090, this.x, this.y, this.width, this.height);
        break;
      case chavoTamalesHealth >= 701:
        ctx.drawImage(this.image080, this.x, this.y, this.width, this.height);
        break;
      case chavoTamalesHealth >= 601:
        ctx.drawImage(this.image070, this.x, this.y, this.width, this.height);
        break;
      case chavoTamalesHealth >= 501:
        ctx.drawImage(this.image060, this.x, this.y, this.width, this.height);
        break;
      case chavoTamalesHealth >= 401:
        ctx.drawImage(this.image050, this.x, this.y, this.width, this.height);
        break;
      case chavoTamalesHealth >= 301:
        ctx.drawImage(this.image040, this.x, this.y, this.width, this.height);
        break;
      case chavoTamalesHealth >= 201:
        ctx.drawImage(this.image030, this.x, this.y, this.width, this.height);
        break;
      case chavoTamalesHealth >= 101:
        ctx.drawImage(this.image020, this.x, this.y, this.width, this.height);
        break;
      case chavoTamalesHealth < 101:
        ctx.drawImage(this.image010, this.x, this.y, this.width, this.height);
        break;
    }
  }
}

class JefaFinal {
  constructor() {
    this.x = canvas.width;
    this.y = 250;
    this.width = 80;
    this.height = 150;
    this.image1 = new Image();
    this.image1.src = "./images/Jefa 1 left.png";
    this.image2 = new Image();
    this.image2.src = "./images/Jefa 2 left.png";
    this.image3 = new Image();
    this.image3.src = "./images/Jefa 3 left.png";
    this.image4 = new Image();
    this.image4.src = "./images/Jefa 4 left.png";
    this.image = this.image3;
  }
  health() {
    if (jefaHealth < 0) {
      winner();
    }
  }
  draw() {
    if (score > 50) {
      audioColchones.pause();
      mainTheme.pause();
      audioBoss.play();
      if (this.x > 400) this.x--;
      if (frames % 30 === 0) {
        this.image = this.image == this.image3 ? this.image4 : this.image3;
      }
      ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
    }
  }
}

var jefaFinal = new JefaFinal();
var healthBar = new HealthBar(540, 31);
var healthBarPlayerOne = new HealthBar(60, 31);
var healthBarPlayerTwo = new HealthBar(540, 31);

function drawFierrosViejos() {
  fierrosViejosArr.forEach((fierros, index) => {
    if (fierros.x > canvas.width || fierros.x < 0 - canvas.width) {
      return fierrosViejosArr.splice(index, 1);
    }
    fierros.draw();
    if (fierros.collision(jefaFinal)) {
      jefaHealth--;
    }
    if (fierros.collision(chavoTamalTwoPlayers)) {
      chavoTamalesHealth--;
    }
  });
}

function generateElectrodomesticosHor() {
  if (!(frames % 350 === 0)) return;
  let electrodomesticosHor = [
    "./images/Electrodomesticos/Microondas.png",
    "./images/Electrodomesticos/Radiador.png"
  ];
  let electroHor = new Electrodomesticos(
    60,
    35,
    electrodomesticosHor[
      Math.floor(Math.random() * electrodomesticosHor.length)
    ]
  );
  electrodomesticos.push(electroHor);
}

function drawElectrodomesticosHor() {
  electrodomesticos.forEach((electro, index) => {
    if (electro.y > canvas.height + electro.height) {
      return electrodomesticos.splice(index, 1);
    }
    electro.draw();
    if (camion.collision(electro)) {
      score++;
      electrodomesticos.splice(index, 1);
      audioGetElectro.play();
    }
  });
}

function generateElectrodomesticosSqr() {
  if (!(frames % 900 === 0)) return;
  let electrodomesticosSqr = [
    "./images/Electrodomesticos/Colchon.png",
    "./images/Electrodomesticos/Horno.png"
  ];
  let electroSqr = new Electrodomesticos(
    35,
    35,
    electrodomesticosSqr[
      Math.floor(Math.random() * electrodomesticosSqr.length)
    ]
  );
  electrodomesticos.push(electroSqr);
}

function drawElectrodomesticosSqr() {
  electrodomesticos.forEach((electro, index) => {
    if (electro.y > canvas.height + electro.height) {
      return electrodomesticos.splice(index, 1);
    }
    electro.draw();
    if (camion.collision(electro)) {
      score += 2;
      electrodomesticos.splice(index, 1);
      audioGetElectro.play();
    }
  });
}

function generateElectrodomesticosVer() {
  if (!(frames % 1200 === 0)) return;
  let electrodomesticosVer = [
    "./images/Electrodomesticos/Heladera.png",
    "./images/Electrodomesticos/Lavarropas.png"
  ];
  let electroVer = new Electrodomesticos(
    35,
    60,
    electrodomesticosVer[
      Math.floor(Math.random() * electrodomesticosVer.length)
    ]
  );
  electrodomesticos.push(electroVer);
}

function drawElectrodomesticosVer() {
  electrodomesticos.forEach((electro, index) => {
    if (electro.y > canvas.height + electro.height) {
      return electrodomesticos.splice(index, 1);
    }
    electro.draw();
    if (camion.collision(electro)) {
      score += 3;
      electrodomesticos.splice(index, 1);
      audioGetElectro.play();
    }
  });
}

function generateChavoTamal() {
  if (!(frames % 180 === 0)) return;
  chavoTamal = new ChavoTamal(
    canvas.width,
    Math.floor(Math.random() * 100) + 230
  );
  chavoTamalArr.push(chavoTamal);
}

function drawChavoTamal() {
  chavoTamalArr.forEach((chavo, index) => {
    if (chavo.x < -130) {
      return chavoTamalArr.splice(index, 1);
    }
    if (score <= 50) {
      chavo.draw();
    }
    if (chavo.collision(camion)) {
      camionHealth--;
    }
    if (chavo.collision(fierrosViejos)) chavoTamalArr.splice(index, 1);
  });
}

function generateTamales() {
  if (!(frames % 180 === 0)) return;
  tamales = new Tamales(chavoTamal.x, chavoTamal.y);
  tamalesArr.push(tamales);
}

function drawTamales() {
  tamalesArr.forEach((tamal, index) => {
    if (tamal.x < 0 - tamales.width) {
      return tamalesArr.splice(index, 1);
    }
    if (score <= 50) {
      tamal.draw();
    }
    if (camion.collision(tamal)) {
      camionHealth--;
    }
  });
}

function generateTamalesFinales() {
  if (frames % 60 === 0) {
    tamalesFinales = new TamalesFinales();
    tamalesFinalesArr.push(tamalesFinales);
  }
}

function drawTamalesFinales() {
  tamalesFinalesArr.forEach((superTamales, index) => {
    if (superTamales.x < 0 - superTamales.width) {
      return tamalesFinalesArr.splice(index, 1);
    }
    if (score > 50) {
      superTamales.draw();
    }
    if (camion.collision(superTamales)) camionHealth -= 0.5;
  });
}

function update() {
  frames++;
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  background.draw();
  background.infoNavBar();
  background.score();
  background.time();
  background.audio();
  generateChavoTamal();
  camion.draw();
  camion.audio();
  healthBar.draw();
  generateElectrodomesticosHor();
  drawElectrodomesticosHor();
  generateElectrodomesticosVer();
  drawElectrodomesticosVer();
  generateElectrodomesticosSqr();
  drawElectrodomesticosSqr();
  generateTamales();
  drawTamales();
  jefaFinal.draw();
  drawFierrosViejos();
  generateTamalesFinales();
  drawTamalesFinales();
  camion.health();
  jefaFinal.health();
  drawChavoTamal();
}

function startGame() {
  if (interval !== undefined) return;
  interval = setInterval(update, 1000 / 60);
  addEventListener("keydown", function(e) {
    if (e.keyCode === 39) {
      camion.moveForward();
      background.x--;
      if (score <= 10) {
        camion.image.src = "./images/Camion 1 right.png";
      } else if (score > 10 && score <= 20) {
        camion.image.src = "./images/Camion semi lleno right.png";
        camion.height = 90;
      } else if (score > 20) {
        camion.image.src = "./images/Camion lleno right.png";
        camion.height = 100;
      }
    }
    if (e.keyCode === 37) {
      camion.moveBackwards();
      background.x++;
      if (score <= 10) {
        camion.image.src = "./images/Camion 1 left.png";
      } else if (score > 10 && score <= 20) {
        camion.image.src = "./images/Camion semi lleno left.png";
        camion.height = 90;
      } else if (score > 20) {
        camion.image.src = "./images/Camion lleno left.png";
        camion.height = 100;
      }
    }
    if (e.keyCode === 38) {
      camion.moveUp();
    }
    if (e.keyCode === 40) {
      camion.moveDown();
    }
    if (e.keyCode === 82) {
      restart();
    }
    if (e.keyCode === 71) {
      gameOver();
    }
    if (e.keyCode === 87) {
      winner();
    }
    if (e.keyCode === 67) {
      score = 51;
    }
    if (e.keyCode === 32) {
      audioExplosion.play();
      fierrosViejosArr.push(
        (fierrosViejos = new FierrosViejos(
          camion.x + 120,
          camion.y + camion.height - 40
        ))
      );
    }
  });
}

function updateTwoPlayers() {
  frames++;
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  background.draw();
  background.infoNavBar();
  background.time();
  background.audio();
  camion.drawTwoPlayers();
  chavoTamalTwoPlayers.drawTwoPlayers();
  healthBarPlayerOne.drawPlayerOne();
  healthBarPlayerTwo.drawPlayerTwo();
  drawFierrosViejos();
  drawTamales();
  camion.camionLoses();
  chavoTamalTwoPlayers.chavoLoses();
}

function startGameTwoPlayers() {
  if (intervalTwoPlayers !== undefined) return;
  intervalTwoPlayers = setInterval(updateTwoPlayers, 1000 / 60);
  addEventListener("keydown", function(e) {
    if (e.keyCode === 68) {
      camion.moveForward();
      camion.image.src = "./images/Camion 1 right.png";
    }
    if (e.keyCode === 65) {
      camion.moveBackwards();
      camion.image.src = "./images/Camion 1 left.png";
    }
    if (e.keyCode === 87) {
      camion.moveUp();
    }
    if (e.keyCode === 83) {
      camion.moveDown();
    }
    if (e.keyCode === 37) {
      chavoTamalTwoPlayers.moveForward();
      chavoTamalTwoPlayers.image.src = "./images/Bici 1 left.png";
    }
    if (e.keyCode === 39) {
      chavoTamalTwoPlayers.moveBackwards();
      chavoTamalTwoPlayers.image.src = "./images/Bici 1 right.png";
    }
    if (e.keyCode === 38) {
      chavoTamalTwoPlayers.moveUp();
    }
    if (e.keyCode === 40) {
      chavoTamalTwoPlayers.moveDown();
    }
    if (e.keyCode === 67) {
      audioExplosion.play();
      fierrosViejosArr.push(
        (fierrosViejos = new FierrosViejos(
          camion.x + 120,
          camion.y + camion.height - 40
        ))
      );
    }
    if (e.keyCode === 77) {
      audioExplosion.play();
      tamalesArr.push(
        (tamales = new Tamales(chavoTamalTwoPlayers.x, chavoTamalTwoPlayers.y))
      );
    }
  });
}

function gameOver() {
  audioColchones.pause();
  mainTheme.pause();
  audioBoss.pause();
  audioGameOver.play();
  clearInterval(interval);
  interval = undefined;
  exampleLose = false;
  creditsLoseInterval = setInterval(function() {
    if (!exampleLose) {
      frames++;
      credits.draw();
    }
  }, 1000 / 60);
}

function winner() {
  audioColchones.pause();
  mainTheme.pause();
  audioBoss.pause();
  audioWinner.play();
  clearInterval(interval);
  clearInterval(creditsLoseInterval);
  interval = undefined;
  exampleWin = false;
  creditsWinInterval = setInterval(function() {
    if (!exampleWin) {
      frames++;
      credits.drawWin();
    }
  }, 1000 / 60);
}

function restart() {
  if (interval !== undefined) return;
  score = 0;
  time = 0;
  frames = 0;
  interval = undefined;
  creditsWinInterval = undefined;
  creditsLoseInterval = undefined;
  electrodomesticos = [];
  chavoTamalArr = [];
  camion.x = 100;
  camion.y = 310;
  camion.height = 70;
  camionHealth = 1000;
  tamalesArr = [];
  audioGameOver.pause();
  audioWinner.pause();
  tamalesFinalesArr = [];
  background.x = 0;
  background.y = 0;
  mainTheme.currentTime = 0;
  audioColchones.currentTime = 0;
  clearInterval(creditsLoseInterval);
  clearInterval(creditsWinInterval);
  exampleLose = true;
  exampleWin = true;
  credits = new Credits();
  startGame();
}
