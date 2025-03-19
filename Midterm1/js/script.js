document.querySelector("#PetInsertButton").addEventListener("click", AddPet);
document.querySelector("#PetShow").addEventListener("click", ShowPet);
document.querySelector("#currAnimal").addEventListener("click", ShowTheImage);
document.querySelector("#ShuffleButton").addEventListener("change", Shuffle);

let pets = [];
pets.push("Dog", "Cat", "Hamster");

let shuffle = false;
let showSize = 0;

for (let i in pets) {
    document.querySelector("#Array").innerHTML += pets[i] + " "; 
}

function AddPet(){
    document.querySelector("#Array").innerText = "";
    let petValue = document.querySelector("#PetInsert").value;

    pets.unshift(petValue);

    for(let i = 0; i < pets.length; i++){
        document.querySelector("#Array").innerHTML += pets[i] + " ";
    }
}

async function ShowTheImage() {
    let imageValue = document.querySelector('#ShowingPetsNow input[name="pet"]:checked').value;
    let url = `https://loremflickr.com/320/240/${imageValue}`;
    let response = await fetch(url);
    document.querySelector("#currAnimal").src = `https://loremflickr.com/320/240/${imageValue}`;
}


function ShowPet(){
    showSize = document.querySelector("#numberBox").value;
    if(showSize > pets.length){
        ShowSize();
        return;
    }

    if(shuffle){
        pets = _.shuffle(pets);
    } else {
        pets.sort();
    }

    document.querySelector("#ShowingPetsNow").innerHTML = "";
    for(let i = 0; i < showSize; i++){
        let inputEl = document.createElement("input");
        inputEl.name = "pet";
        inputEl.type = "radio";
        inputEl.value = pets[i];

        let labelEl = document.createElement("label");
        labelEl.innerText = pets[i];

        labelEl.prepend(inputEl);
        document.querySelector("#ShowingPetsNow").appendChild(labelEl);
    }
}

function Shuffle(){
    shuffle = !shuffle;
}

function ShowSize(){
    document.querySelector("#size").style.color = "red";
    document.querySelector("#size").innerHTML = "Must Not Exceed " + pets.length;
}
