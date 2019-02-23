var onePlayer = document.getElementById("onePlayerGame");
var mainPannel = document.getElementsByClassName("main-pannel")[0];
var mainGame = document.getElementsByClassName("main-game")[0];
var menuButton = document.getElementById("menu-btn");

onePlayer.onclick = function(){
  mainPannel.setAttribute("class", "main-pannel-off");
  mainGame.setAttribute("class", "main-game-on")
}

menuButton.onclick = function(){
  mainGame.setAttribute("class", "main-game-off");
  mainPannel.setAttribute("class", "main-pannel main-pannel-on")
}