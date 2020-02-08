var onePlayer = document.getElementById("onePlayerGame");
var twoPlayer = document.getElementById("twoPlayerGame");
var mainPannel = document.getElementsByClassName("main-pannel")[0];
var mainGame = document.getElementsByClassName("main-game")[0];
var menuButton = document.getElementById("menu-btn");
var startGameButton = document.getElementById("start-game-btn");
var twoPlayerButton = document.getElementById("two-player-btn");
var instructionsButton = document.getElementById("instructions");
var instructionsDetail = document.getElementsByClassName("instructions-detail")[0];
var instructionsCont = document.getElementsByClassName("instructions-cont")[0]
var closeButton = document.getElementById("close-button")

onePlayer.onclick = function(){
  mainPannel.setAttribute("class", "main-pannel-off");
  mainGame.setAttribute("class", "main-game-on")
  twoPlayerButton.setAttribute("class", "button-off")
  startGameButton.setAttribute("class", "button")
}

twoPlayer.onclick = function(){
  mainPannel.setAttribute("class", "main-pannel-off");
  mainGame.setAttribute("class", "main-game-on");
  startGameButton.setAttribute("class", "button-off")
  twoPlayerButton.setAttribute("class", "button");
}

menuButton.onclick = function(){
  score = 0;
  time = 0;
  clearInterval(interval);
  clearInterval(creditsLoseInterval);
  clearInterval(creditsWinInterval);
  clearInterval(intervalTwoPlayers);
  mainTheme.pause();
  audioColchones.pause();
  audioGameOver.pause();
  audioWinner.pause();
  mainGame.setAttribute("class", "main-game-off");
  mainPannel.setAttribute("class", "main-pannel main-pannel-on")
}

startGameButton.onclick = function(){
  startGame();
}

twoPlayerButton.onclick = function(){
  startGameTwoPlayers();
}

instructionsButton.onclick = function(){
  instructionsDetail.setAttribute("class", "instructions-detail")
  instructionsCont.setAttribute("class", "instructions-cont")
}

closeButton.onclick = function(){
  instructionsDetail.setAttribute("class", "instructions-detail instructions-detail-off")
}

document.addEventListener("click", e => console.log(e)) 