document.querySelector("#betBtn").addEventListener("click", Gamble);
document.querySelector("#BalloonBox").addEventListener("change", AlterBalloon);
document.querySelector("#CherryBox").addEventListener("change", AlterCherry);
document.querySelector("#GoldBarBox").addEventListener("change", AlterGold);

let balloonMult = 0;
let cherryMult = 0;
let goldMult = 0;
document.querySelector("#numberBox").value = 10;
AlterBalloon();
AlterCherry();
AlterGold();

function AlterBalloon(){
    balloonMult = document.querySelector("#BalloonBox").value;

    if(balloonMult > 3){
        balloonMult = 3;
        document.querySelector("#BalloonBox").value = 3;
    }

    if(balloonMult < 1){
        balloonMult = 1;
        document.querySelector("#BalloonBox").value = 1;
    }
}

function AlterCherry(){
    cherryMult = document.querySelector("#CherryBox").value;

    if(cherryMult > 3){
        cherryMult = 3;
        document.querySelector("#CherryBox").value = 3;
    }

    if(cherryMult < 1){
        cherryMult = 1;
        document.querySelector("#CherryBox").value = 1;
    }
}

function AlterGold(){
    goldMult = document.querySelector("#GoldBarBox").value;

    if(goldMult > 3){
        goldMult = 3;
        document.querySelector("#GoldBarBox").value = 3;
    }

    if(goldMult < 1){
        goldMult = 1;
        document.querySelector("#GoldBarBox").value = 1;
    }
}


function Gamble(){
    let price = document.querySelector("#numberBox").value;

    if(price > 1000){
        price = 1000;
        document.querySelector("#numberBox").value = 1000;
    }
    if(price < 10){
        price = 10;
        document.querySelector("#numberBox").value = 10;
    }

    document.querySelector("#Error").innerText = ""

    let slotArray = new Array(3);
    for (let i = 0; i < 3; i++) {
        slotArray[i] = getRandomInt(3) + 1;
    }


    let balloonArray = new Array(3);
    for (let i = 0; i < 3; i++) {
        balloonArray[i] = false;
    }

    let barArray = new Array(3);
    for (let i = 0; i < 3; i++) {
        barArray[i] = false;
    }

    let cherryArray = new Array(3);
    for (let i = 0; i < 3; i++) {
        cherryArray[i] = false;
    }

    for(let i = 0; i < 3; i++){
        if(slotArray[i] == 1){
            document.querySelector(`.Slot${i + 1}`).src = 'Balloon7.png';
            balloonArray[i] = true;
        } else if(slotArray[i] == 2){
            document.querySelector(`.Slot${i + 1}`).src = 'Cherry1.png';
            cherryArray[i] = true;
        } else {
            document.querySelector(`.Slot${i + 1}`).src = 'GoldBar.png';
            barArray[i] = true;
        }
    }

    document.querySelector("#Winnings").classList.add("Winner");
    document.querySelector("#GameTitle").classList.add("Winner");
    document.querySelector("#WinBet").classList.add("Winner");
    document.querySelector("#WinMult").classList.add("Winner");
    if(balloonArray[0] && balloonArray[1] && balloonArray[2]){
        document.querySelector("#Winnings").innerText = "You Won $" + (price * balloonMult);
    } else if(cherryArray[0] && cherryArray[1] && cherryArray[2]){
        document.querySelector("#Winnings").innerText = "You Won $" + (price * cherryMult);
    } else if(barArray[0] && barArray[1] && barArray[2]){
        document.querySelector("#Winnings").innerText = "You Won $" + (price * goldMult);
    } else {
        document.querySelector("#Winnings").innerText = "You Lost your Money :(";
        document.querySelector("#Winnings").classList.remove("Winner");
        document.querySelector("#Winnings").style.backgroundColor = "red";
        document.querySelector("#GameTitle").classList.remove("Winner");
        document.querySelector("#GameTitle").style.backgroundColor = "darkturquoise";
        document.querySelector("#WinMult").classList.remove("Winner");
        document.querySelector("#WinBet").classList.remove("Winner");
    }
}

function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}