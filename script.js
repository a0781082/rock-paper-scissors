var humanChoice;
var computerChoice;
var computerScore = 0;
var computerScoreEl;
var playerScore = 0;
var playerScoreEl;
var playerName;
var s2;
var winner;
var rockButton;
var paperButton;
var scissorsButton;
var initialise = true;

window.onload = async function () {
  playerName = await prompt("Please enter your name: ");
  if (playerName == "") {
    playerName = "Captain Nemo";
  }
  
  const pName = document.getElementById("playerName");
  pName.textContent = playerName;
  pName.classList.add("boldText");

  //get the width of the widest button so we can make all buttons the same width
  rockButton = document.getElementById("rockButton");
  paperButton = document.getElementById("paperButton");
  scissorsButton = document.getElementById("scissorsButton");
  let buttonRect = scissorsButton.getBoundingClientRect();
  /*let buttonRect = document.getElementById("scissorsButton").getBoundingClientRect();*/
  let buttonWidth = buttonRect.width + "px";
  rockButton.style.width = buttonWidth;
  paperButton.style.width = buttonWidth;
  document.getElementById("rockButton").style.width = buttonWidth;
  document.getElementById("paperButton").style.width = buttonWidth;

  //create eventListeners for the buttons
  rockButton.addEventListener("click", function (rock) {
    playRound("Rock");
  });

  paperButton.addEventListener("click", function (paper) {
    playRound("Paper");
  });

  scissorsButton.addEventListener("click", function (scissors) {
    playRound("Scissors");
  });

  //get element objects that will be reused
  playerScoreEl = document.getElementById("playerScoreElement");
  computerScoreEl = document.getElementById("computerScoreElement");
};

function initialiseScore () {
  //reset score and the marquee
  playerScore = 0;
  playerScoreEl.textContent = playerScore.toString();
  computerScore = 0;
  computerScoreEl.textContent = computerScore.toString();

  //remove all table rows except the first
  $("#myTable").find("tr:gt(0)").remove();
  document.getElementById("winnerMarquee").textContent = "";
}

function playRound(humanChoice) {

  if (initialise) {
    initialiseScore();
    initialise = false;
  }

  computerChoice = getComputerChoice();
  var theResult = getResult(computerChoice, humanChoice);

  //add the round data to the screen
  const table = document.getElementById("roundList");
  const row = document.createElement("tr");
  table.appendChild(row);

  const cell1 = document.createElement("td");
  cell1.textContent = " ";
  row.appendChild(cell1);

  const cell2 = document.createElement("td");
  cell2.textContent = humanChoice;
  row.appendChild(cell2);

  const cell3 = document.createElement("td");
  cell3.textContent = "    ";
  row.appendChild(cell3);

  const cell4 = document.createElement("td");
  cell4.textContent = ":";
  row.appendChild(cell4);

  const cell5 = document.createElement("td");
  cell5.textContent = "    ";
  row.appendChild(cell5);

  const cell6 = document.createElement("td");
  cell6.textContent = computerChoice;
  row.appendChild(cell6);

  const cell7 = document.createElement("td");
  cell7.textContent = " ";
  row.appendChild(cell7);

  //update the score
  switch (theResult) {
    case "human":
      playerScore = playerScore + 1;
      cell2.classList.add("boldText");
      break;
    case "computer":
      computerScore = computerScore + 1;
      cell6.classList.add("boldText");
      break;
    default:
      playerScore = playerScore + 0.5;
      computerScore = computerScore + 0.5;
  }

  playerScoreEl.textContent = playerScore.toString();
  computerScoreEl.textContent = computerScore.toString();
 checkWinner();
}

async function checkWinner() {
//first to 5 wins...
if (playerScore >= 5) {
  const winnerMarquee = document.getElementById("winnerMarquee");
  winnerMarquee.textContent = playerName + " Wins.  Congratulations!!!";
  animate(winnerMarquee);
  initialise = true;
} else if (computerScore >= 5) {
  const winnerMarquee = document.getElementById("winnerMarquee");
  winnerMarquee.textContent = "Computer Wins.  Sorry " + playerName + " You Lost!";
  animate(winnerMarquee);
  initialise = true;
}
}

function getResult(computerChoice, humanChoice) {
  //Rock wins against scissors; paper wins against rock; and scissors wins against paper

  switch (computerChoice) {
    case "Rock":
      switch (humanChoice) {
        case "Rock":
          return "draw";
        case "Paper":
          return "human";
        case "Scissors":
          return "computer";
      }
      break;
    case "Paper":
      switch (humanChoice) {
        case "Rock":
          return "computer";
        case "Paper":
          return "draw";
        case "Scissors":
          return "human";
      }
      break;
    case "Scissors":
      switch (humanChoice) {
        case "Rock":
          return "human";
        case "Paper":
          return "computer";
        case "Scissors":
          return "draw";
      }
      break;
  }
}

function getComputerChoice() {
  var seedNum = Math.random();
  var decisionNum = seedNum * 100;
  var generatedChoice = "";

  if (decisionNum <= 33.3) {
    generatedChoice = "Rock";
  } else if (decisionNum < 66.6) {
    generatedChoice = "Paper";
  } else {
    generatedChoice = "Scissors";
  }
  return generatedChoice;
}

function animate(element) { 
  let elementWidth = element.offsetWidth; 
  let parentWidth = element.parentElement.offsetWidth; 
  let flag = 0; 

  setInterval(() => { 
      element.style.marginLeft = --flag + "px"; 

      if (elementWidth == -flag) { 
          flag = parentWidth; 
      } 
  }, 10); 
}