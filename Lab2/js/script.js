

let randomNumber = Math.floor(Math.random() * 99) + 1;
var attempts = 0;
var wins = 0;
var losses = 0;
var retry = false;
document.querySelector("#guessBtn").addEventListener("click", checkGuess);
document.querySelector("#Games").innerText = "Wins: " + `${wins}` + " Losses: " + `${losses}`;
function checkGuess() {
    if(retry){
        retry = false;
        document.querySelector("#guessBtn").innerText = "Guess";
        document.querySelector("#Current").innerText = ("");
        return;
    }
    attempts++;
    document.querySelector("#guessBtn").innerText = "Guess";

    let userGuess = Number(document.querySelector("#guessInput").value);
    

    if(userGuess > 99 || userGuess < 1){
        document.querySelector("#Current").innerText = ("Your guess was Invalid Guess Again.");
        changeTextColor("red");
        return;
    }
    document.querySelector("#previousGuess").innerHTML += (userGuess + " ");

    if(randomNumber == userGuess){
        retry = true;
        document.querySelector("#Current").innerText = ("You Win! It took you " + `${attempts}` + "guesses. The Number was " + `${randomNumber}` + ".");
        document.querySelector("#guessBtn").innerText = "Retry";
        wins++;
        document.querySelector("#Games").innerText = "Wins: " + `${wins}` + " Losses: " + `${losses}`;
        changeTextColor("green");
        randomNumber = Math.floor(Math.random() * 99) + 1;
        attempts = 0;
        document.querySelector("#previousGuess").innerText = " ";
        //You Win
    } else if (attempts == 7){
        retry = true;
        document.querySelector("#Current").innerText = ("You Lost! It took you " + `${attempts}` + " guesses. The Number was " + `${randomNumber}` + ".");
        document.querySelector("#guessBtn").innerText = "Retry";
        losses++;
        document.querySelector("#Games").innerText = "Wins: " + `${wins}` + " Losses: " + `${losses}`;
        changeTextColor("red");
        randomNumber = Math.floor(Math.random() * 99) + 1;
        attempts = 0;
        document.querySelector("#previousGuess").innerText = " ";
        //You Lose
    } else if (randomNumber > userGuess){
        document.querySelector("#Current").innerText = ("Too Low");
        changeTextColor("blue");
        //Too Low
    } else {
        // alert("Too High");
        document.querySelector("#Current").innerText = ("Too High");
        changeTextColor("yellow");
        //Too High
    }
} 

function changeTextColor(color) {
    document.querySelector("#Current").style.color = color;
}


// <!-- onmouseover="testing()" -->