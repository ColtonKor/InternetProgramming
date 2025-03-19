// document.querySelector("#submitBtn").addEventListener("click", submitPressed);
document.querySelector("#passwd").addEventListener("click", suggestPassword);
document.querySelector("#passwd").addEventListener("blur", onClickOff);
document.querySelector("#stateSelect").addEventListener("change", displayCounties);
document.querySelector("#zipCode").addEventListener("change", displayCityInfo);
document.querySelector("#username").addEventListener("change", usernameCheck);
document.querySelector("#passwd").addEventListener("change", checkPassword);
document.querySelector("#vPass").addEventListener("change", verPassword);
document.querySelector("#submitBtn").addEventListener("click", validateAccount);

displayStates();

let username = "";
let password = "";
let verifyPassword = "";

async function displayCityInfo() {
    let cityInfoUrl =`https://csumb.space/api/cityInfoAPI.php?zip=${document.querySelector("#zipCode").value}`;
    let response = await fetch(cityInfoUrl);
    let data = await response.json();
    if(!data){
        document.querySelector("#NoZipCode").innerHTML = "Zip code not found!";
        document.querySelector("#NoZipCode").style.color = "red";
        document.querySelector("#city").innerHTML = "";
        document.querySelector("#longitude").innerHTML = "";
        document.querySelector("#latitude").innerHTML = "";
        return;
    }
    document.querySelector("#NoZipCode").innerHTML = "";
    document.querySelector("#city").innerHTML = data.city;
    document.querySelector("#longitude").innerHTML = data.longitude;
    document.querySelector("#latitude").innerHTML = data.latitude;
    
}

async function displayStates() {
    let statesUrl = `https://csumb.space/api/allStatesAPI.php`;
    let response = await fetch(statesUrl);
    let data = await response.json();
    for(let i of data) {
        let optEl = document.createElement("option");
        optEl.innerText = i.state;
        optEl.value = i.usps;
        document.querySelector("#stateSelect").appendChild(optEl);
    }
    displayCounties();
}

async function displayCounties() {
    document.querySelector("#countySelect").innerHTML = "";
    let countyURL = `https://csumb.space/api/countyListAPI.php?state=${document.querySelector("#stateSelect").value}`;
    let response = await fetch(countyURL);
    let data = await response.json();

    for(let i of data) {
        let optEl = document.createElement("option");
        optEl.innerText = i.county;
        document.querySelector("#countySelect").appendChild(optEl);
    }

}

async function usernameCheck() {
    username = document.querySelector("#username").value
    let url = `https://csumb.space/api/usernamesAPI.php?username=${username}`;
    let response = await fetch(url);
    let data = await response.json();

    if(data.available) {
        document.querySelector("#available").innerText = "Username is available";
        document.querySelector("#available").style.color = "green";
    } else {
        document.querySelector("#available").innerText = "Username is not available";
        document.querySelector("#available").style.color = "red";
    }
}

async function suggestPassword() {
    let url = `https://csumb.space/api/suggestedPassword.php?length=8`;
    let response = await fetch(url);
    let data = await response.json();

    document.querySelector("#suggest").innerText = data.password;
}

function checkPassword() {
    password = document.querySelector("#passwd").value;
    if(password.length < 6) {
        document.querySelector("#passwdError").innerText = "Password too short!";
        document.querySelector("#passwdError").style.color = "red";
    } else {
        document.querySelector("#passwdError").innerText = "";
    }
}

function verPassword() {
    verifyPassword = document.querySelector("#vPass").value;
    if(verifyPassword.length < 6) {
        document.querySelector("#passwdError").innerText = "Password too short!";
        document.querySelector("#passwdError").style.color = "red";
    } else {
        document.querySelector("#passwdError").innerText = "";
    }
}


function onClickOff(){
    document.querySelector("#suggest").innerText = "";
}

async function validateAccount(){

    if(username.length < 3){
        document.querySelector("#passwdError").innerText = "Username is too short!";
        document.querySelector("#passwdError").style.color = "red";
        return;
    } else if(password.length < 6){
        document.querySelector("#passwdError").innerText = "Password is too short!";
        document.querySelector("#passwdError").style.color = "red";
        return;
    } else if(password != verifyPassword){
        document.querySelector("#passwdError").innerText = "Password and Confirm Password are not the same!";
        document.querySelector("#passwdError").style.color = "red";
        return;
    } else {
        document.querySelector("#passwdError").innerText = "Account Created";
        document.querySelector("#passwdError").style.color = "Green";
    }
}
