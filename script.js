var p1score = document.querySelector("#player");
var tiescore = document.querySelector("#tie");
var p2score = document.querySelector("#p2");
var main = Array.from(document.querySelectorAll(".box"));
var filler = document.querySelectorAll(".fill");
var line = document.querySelector(".line");
var playagain = document.querySelector("#playagain");
var resultshow = document.getElementById("result");
var p1 = 0;
var p2 = 0;
var tie = 0;
var moves = 0;
var turn = 'X';
var result = "";
var body = document.querySelector(".game_body");
var turnaudio = new Audio('ting.mp3');
var gameoveraudio = new Audio('gameover.mp3');

function checkwin(){
  const conditon = [
    [0,1,2,],
    [3,4,5,],
    [6,7,8,],
    [0,3,6,],
    [1,4,7,],
    [2,5,8,],
    [0,4,8,],
    [2,4,6,],
  ]
  for(let [a, b, c] of conditon) {
    if(main[a].innerText && main[a].innerText === main[b].innerText && main[a].innerText === main[c].innerText){
        main[a].style.background = "aqua";
        main[b].style.background = "aqua";
        main[c].style.background = "aqua";
        return "win";
    }
  }
  if(moves==9){
    document.getElementById("result").innerHTML = `MATCH IS TIED!!`;
    return "tie";
  }
  return "Not";
}
function gameover(){
  gameoveraudio.play();
  for(let i=0;i<9;i++){
    main[i].removeEventListener("click", click);
  }
  p1score.innerHTML = `${p1}`;
  tiescore.innerHTML = `${tie}`;
  p2score.innerHTML= `${p2}`;
  
  playagain.style.display="block"; 
}
function changeturn(){
  if(result === "win"){

    if(turn === 'X'){
    resultshow.innerHTML = `<b id="X">X Wins</b>`;
    p1++;
    gameover();
    }
    else{
    resultshow.innerHTML = `<b id="O">O Wins</b>`;
    p2++;
    gameover();
    }
  }
  else if(result === "tie"){
    tie++;
    gameover();
  }
  else{
    turnaudio.play();
    turn==='X'?turn='O':turn='X';  
  }
}

playagain.addEventListener("click",function plays(e){
  filler.forEach((element) => {
    element.innerText = "";
  })
  resultshow.innerHTML = "";
  for(let i=0;i<9;i++){
    main[i].style.background = "white";
  }
  playagain.style.display="none";
  moves = 0;
  result="";
  for(let i=0;i<9;i++){
    main[i].addEventListener("click", click);
  }
})

function click(e){
  e.target.innerText = turn;
  ++moves;
 //to check the win
  e.target.parentElement.removeEventListener("click", click);
  result = checkwin();
  changeturn();
}
for(let i=0;i<9;i++){
  main[i].addEventListener("click", click);
}
