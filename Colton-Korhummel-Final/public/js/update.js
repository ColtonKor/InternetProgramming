displayChoices();

function displayChoices(){
  let q2Choices = ['fire', 'electric', 'water', 'grass', 'normal'];

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

document.querySelector("#check").addEventListener('click', checkAnswer);


function checkAnswer(){
  let q1UserAnswer = document.querySelector("input[name=q2]:checked").value;
  let type = document.querySelector("#type").value;
  console.log(type);
  if(q1UserAnswer == type){
    document.querySelector("#resultText").innerText = "Correct";
    document.querySelector("#resultText").style.color = "green";
  } else {
    document.querySelector("#resultText").innerText = "Wrong";
    document.querySelector("#resultText").style.color = "red";
  }
}