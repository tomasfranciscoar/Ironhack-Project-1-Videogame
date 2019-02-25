var onePlayer = document.getElementById("onePlayerGame");
var mainPannel = document.getElementsByClassName("main-pannel")[0];
var mainGame = document.getElementsByClassName("main-game")[0];
var menuButton = document.getElementById("menu-btn");
var startGameButton = document.getElementById("start-game-btn");
var instructionsButton = document.getElementById("instructions");
var instructionsDetail = document.getElementsByClassName("instructions-detail")[0];

onePlayer.onclick = function(){
  mainPannel.setAttribute("class", "main-pannel-off");
  mainGame.setAttribute("class", "main-game-on")
}

menuButton.onclick = function(){
  // score = 0;
  clearInterval(interval);
  mainGame.setAttribute("class", "main-game-off");
  mainPannel.setAttribute("class", "main-pannel main-pannel-on")
}

startGameButton.onclick = function(){
  startGame();
}

instructionsButton.onmouseover = function(){
  instructionsDetail.setAttribute("class", "instructions-detail")
}

instructionsButton.onmouseout = function(){
  instructionsDetail.setAttribute("class", "instructions-detail instructions-detail-off")
}