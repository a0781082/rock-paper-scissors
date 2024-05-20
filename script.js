var humanChoice;
var computerChoice;
var computerScore = 0;
var humanScore = 0;
var playerName;
var s2;
var winner;

window.onload = function () {
  playerName = prompt("Please enter your name: ");
  let i=0;
  for (i = 0 ; i < 5 ; i++) {
    winner=playTheGame();
    switch (winner) {
      case "human":
        humanScore = humanScore + 1;
        break;
      case "computer":
        computerScore = computerScore + 1;
        break;
    }
    alert("Current score: " + playerName + ": " + humanScore + " : Computer: " + computerScore)
  }
};

function playTheGame() {
  humanChoice = prompt("Rock, Paper or Scissors - " + playerName + "?");
  let s2=validateInput(humanChoice);
  computerChoice = getComputerChoice();

  var theResult = getResult(computerChoice, s2);
  switch (theResult) {
    case "human":
      alert(
        playerName +
          " selected " +
          s2 +
          ", the computer selected " +
          computerChoice +
          ":" +
          playerName +
          " wins"
      );
      return "human"
      break;
    case "computer":
      alert(
        playerName +
          " selected " +
          humanChoice +
          ", the computer selected " +
          computerChoice +
          ": computer wins"
      );
      return "computer"
      break;
    default:
      alert("You both selected " + computerChoice + " so it is a draw!");
      return "draw"
  }
}

function validateInput(input) {
  if (input != "") {
    //convert input to common format
    var s1 = input.toLocaleLowerCase();
    var s2 = s1.charAt(0).toUpperCase() + s1.slice(1);
  }

  switch (s2) {
    case "Rock":
      break;
    case "Paper":
      break;
    case "Scissors":
      break;
    default:
      alert(
        "You entered an invalid choice " + playerName + " - please try again!"
      );
      let newInput = prompt("Rock, Paper or Scissors - " + playerName + "?");
      s2=validateInput(newInput);
  }
  return s2
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
  console.log("decisionNum: " + decisionNum);

  if (decisionNum <= 33.3) {
    generatedChoice = "Rock";
  } else if (decisionNum < 66.6) {
    generatedChoice = "Paper";
  } else {
    generatedChoice = "Scissors";
  }

  return generatedChoice;
}

function getHumanChoice() {
  prompt;
}
