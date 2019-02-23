var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");

frames = 0;

class Background{
  constructor(){
    this.x = 0;
    this.y = 0;
    this.width = canvas.width*2;
    this.height = canvas.height;
    this.image = new Image();
    this.image.src = "./images/Fondo doble.png";
  }
  draw(){
    if(this.x < -canvas.width*2) this.x = 0;
    ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
    ctx.drawImage(this.image, this.x + this.width - 130, this.y, this.width, this.height);
  }
}

class Camion{
  constructor(){
    
  }
}

var background = new Background();

setInterval(function(){
  frames++;
  ctx.clearRect(0,0,canvas.width,canvas.height);
  background.draw()
}, 1000/60)