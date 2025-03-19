document.querySelector("#Villains").addEventListener("click", ShowVillains);
document.querySelector("#Results").addEventListener("click", ShowResults);

let currentNamePick;
let currentBirthPick;
let superheroName = [];
let birthPlace = [];
birthPlace.push("New-York", "Krypton", "Bulgaria", "Gotham-City", "Ohio");
ShowBirthPlace();
GetSuperhero();
let data;

async function GetSuperhero(){
    let url = `https://csumb.space/api/superheroesAPI.php`;
    let response = await fetch(url);
    data = await response.json();
    console.log(data);

    document.querySelector("#SupeImage").src = `img/${data[0].image}.png`;


    document.querySelector("#SuperheroName").innerText = "Where was " + data[0].name + " born?";

    for(let i of data){
        superheroName.push(i.firstName + " " + i.lastName);
    }
    superheroName = _.shuffle(superheroName);
    for(let i of superheroName) {
        let optEl = document.createElement("option");
        optEl.innerText = i;
        optEl.value = i;
        document.querySelector("#nameSelect").appendChild(optEl);
    }
}

function ShowBirthPlace(){
    birthPlace = _.shuffle(birthPlace);
    for(let i = 0; i < birthPlace.length; i++){
        let inputEl = document.createElement("input");
        inputEl.name = "SuperBirth";
        inputEl.type = "radio";
        inputEl.value = birthPlace[i];

        let labelEl = document.createElement("label");
        labelEl.innerText = birthPlace[i];

        labelEl.prepend(inputEl);
        document.querySelector("#birthPlace").appendChild(labelEl);
    }
}

async function ShowResults(){
    let birthPicked = document.querySelector("input[name=SuperBirth]:checked").value;
    let namePicked = document.querySelector("#nameSelect").value;

    let url = `https://csumb.space/api/superheroesAPI.php?heroId=${data[0].id}&pob=${birthPicked}`;
    let response = await fetch(url);
    let dataResult = await response.json();
    console.log(dataResult);
    if(dataResult.answer == "right"){
        document.querySelector("#birthResult").innerText = "Correct!";
        document.querySelector("#birthResult").style.backgroundColor = "green";
    } else {
        document.querySelector("#birthResult").innerText = "Wrong!";
        document.querySelector("#birthResult").style.backgroundColor = "red";
    }

    if(namePicked == data[0].firstName + " " + data[0].lastName){
        document.querySelector("#nameResults").innerText = "Correct!";
        document.querySelector("#nameResults").style.backgroundColor = "green";
    } else {
        document.querySelector("#nameResults").innerText = "Wrong!";
        document.querySelector("#nameResults").style.backgroundColor = "red";
    }
}


async function ShowVillains(){
    document.querySelector("#villains").innerHTML = "";
    let url = `https://csumb.space/api/superheroesAPI.php?heroId=${data[0].id}&data=villains`;
    let response = await fetch(url);
    let dataResult = await response.json();
    for(let i of dataResult){
        let figureEl = document.createElement("figure");

        let imgEl = document.createElement("img");
        imgEl.src = i.villainImage;

        let figcaptionEl = document.createElement("figcaption");
        figcaptionEl.textContent = i.villainName;

        figureEl.appendChild(imgEl);
        figureEl.appendChild(figcaptionEl);

        document.querySelector("#villains").appendChild(figureEl);
    }
}