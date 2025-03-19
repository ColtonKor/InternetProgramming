document.querySelector("button").addEventListener("click", gradeQuiz);

document.querySelector("#RETRY").addEventListener("click", Restart);
let maxAttempts = localStorage.getItem("Attempts");
document.querySelector("#TotalAttempts").innerText = "Quiz was taken " + maxAttempts + " times.";


displayQ2Choices();

displayQ4Choices();

document.getElementById("RETRY").style.display = "none";
document.getElementById("squared").value = "";


let finalScore = 0;

function displayQ2Choices(){
    let q2Choices = ["333555", "500000", "659", "49"];

    q2Choices = _.shuffle(q2Choices);

    for(let choice of q2Choices){
        let inputEl = document.createElement("input");
        inputEl.name = "q2";
        inputEl.type = "radio";
        inputEl.value = choice;

        let labelEl = document.createElement("label");
        labelEl.innerText = choice;


        labelEl.prepend(inputEl);

        document.querySelector("#q2Choices").appendChild(labelEl);
    }
}

function displayQ4Choices(){
    let q4Choices = ["3.14", "3.1415", "3.15", "3.1514"];
    q4Choices = _.shuffle(q4Choices);

    for (let choice of q4Choices) {
        let inputEle = document.createElement("input");
        inputEle.name = "q4";
        inputEle.type = "checkbox";
        inputEle.value = choice;

        let labelEle = document.createElement("label");
        labelEle.innerText = choice;

        labelEle.prepend(inputEle);
        document.querySelector("#q4Choices").appendChild(labelEle);
    }
}

function gradeQuiz(){
    let q1UserAnswer = document.querySelector("input[name=q2]:checked").value;
    let input = document.getElementById("q1").value;
    let q3Input = document.getElementById("squared").value;
    let q5Input = document.getElementById("numberBox").value;
    let q4UserAnswer = document.querySelectorAll("input[name=q4]:checked");
    let answersArray = Array.from(q4UserAnswer).map(checkbox => checkbox.value);

    if(q1UserAnswer == "333555"){
        // alert("Right!");
        document.querySelector("#question1").style.color = "green";
        document.querySelector("#question1").innerText = "Correct";
        finalScore += 20;
        document.querySelector('.Q1programImage').src = 'C:/Users/tomko/OneDrive/Pictures/Screenshots/GreenCheck.png';
    } else {
        // alert("Wrong!");
        document.querySelector("#question1").style.color = "red";
        document.querySelector("#question1").innerText = "Wrong";
        document.querySelector('.Q1programImage').src = 'C:/Users/tomko/OneDrive/Pictures/Screenshots/RedX.png';
    }

    if(input == "56"){
        // alert("Right!");
        document.querySelector("#question2").style.color = "green";
        document.querySelector("#question2").innerText = "Correct";
        finalScore += 20;
        document.querySelector('.Q2programImage').src = 'C:/Users/tomko/OneDrive/Pictures/Screenshots/GreenCheck.png';
    } else {
        // alert("Wrong!");
        document.querySelector("#question2").style.color = "red";
        document.querySelector("#question2").innerText = "Wrong";
        document.querySelector('.Q2programImage').src = 'C:/Users/tomko/OneDrive/Pictures/Screenshots/RedX.png';
    }

    if(q3Input == "25"){
        // alert("Right!");
        document.querySelector("#question3").style.color = "green";
        document.querySelector("#question3").innerText = "Correct";
        finalScore += 20;
        document.querySelector('.Q3programImage').src = 'C:/Users/tomko/OneDrive/Pictures/Screenshots/GreenCheck.png';
    } else {
        // alert("Wrong!");
        document.querySelector("#question3").style.color = "red";
        document.querySelector("#question3").innerText = "Wrong";
        document.querySelector('.Q3programImage').src = 'C:/Users/tomko/OneDrive/Pictures/Screenshots/RedX.png';
    }

    let has3_14 = answersArray.includes("3.14");
    let has3_1415 = answersArray.includes("3.1415");
    let has3_15 = answersArray.includes("3.15");
    let has3_1514 = answersArray.includes("3.1514");

    if (has3_14 && has3_1415 && !has3_15 && !has3_1514) {
        // alert("Right!");
        document.querySelector("#question4").style.color = "green";
        document.querySelector("#question4").innerText = "Correct";
        finalScore += 20;
        document.querySelector('.Q4programImage').src = 'C:/Users/tomko/OneDrive/Pictures/Screenshots/GreenCheck.png';
    } else {
        // alert("Wrong!");
        document.querySelector("#question4").style.color = "red";
        document.querySelector("#question4").innerText = "Wrong";
        document.querySelector('.Q4programImage').src = 'C:/Users/tomko/OneDrive/Pictures/Screenshots/RedX.png';
    }


    if(q5Input == "7"){
        // alert("Right!");
        document.querySelector("#question5").style.color = "green";
        document.querySelector("#question5").innerText = "Correct";
        finalScore += 20;
        document.querySelector('.Q5programImage').src = 'C:/Users/tomko/OneDrive/Pictures/Screenshots/GreenCheck.png';
    } else {
        // alert("Wrong!");
        document.querySelector("#question5").style.color = "red";
        document.querySelector("#question5").innerText = "Wrong";
        document.querySelector('.Q5programImage').src = 'C:/Users/tomko/OneDrive/Pictures/Screenshots/RedX.png';
    }

    document.querySelector("#FinalScore").innerText = finalScore + "/100";
    document.getElementById("RETRY").style.display = "inline";
    if(finalScore >= 80){
        document.querySelector("#Message").innerText = "Congratulations You Passed!!!";
        document.querySelector("#FinalScore").style.color = "green";
    } else {
        document.querySelector("#FinalScore").style.color = "red";
    }
    localStorage.setItem("Attempts", ++maxAttempts);
    document.querySelector("#TotalAttempts").innerText = "Quiz was taken " + maxAttempts + " times.";
}

function Restart(){
    finalScore = 0;
    document.getElementById("RETRY").style.display = "none";
    document.querySelector("#Message").innerText = "";
    document.querySelector("#FinalScore").innerText = "";
    let q2Radios = document.querySelectorAll("input[name=q2]");
    q2Radios.forEach(radio => radio.checked = false);
    let q4Checkboxes = document.querySelectorAll("input[name=q4]");
    q4Checkboxes.forEach(checkbox => checkbox.checked = false);
    document.getElementById("q1").value = "";
    document.getElementById("squared").value = "";
    document.getElementById("numberBox").value = "";
    document.querySelector("#question1").innerText = "";
    document.querySelector("#question2").innerText = "";
    document.querySelector("#question3").innerText = "";
    document.querySelector("#question4").innerText = "";
    document.querySelector("#question5").innerText = "";
    document.querySelector(".Q1programImage").src = "";
    document.querySelector(".Q2programImage").src = "";
    document.querySelector(".Q3programImage").src = "";
    document.querySelector(".Q4programImage").src = "";
    document.querySelector(".Q5programImage").src = "";
}