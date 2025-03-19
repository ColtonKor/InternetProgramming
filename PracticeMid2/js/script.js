displayRandomQuote();
randomBackgroundImg();

document.querySelector("#getQuotes").addEventListener("click", getQuotes);
document.querySelector("#authorInfoBtn").addEventListener("click", displayAuthorInfo);
let languages = [];
languages.push("English", "Spanish", "French", "Esperanto")
displayLanguages();

let data;

async function displayRandomQuote() {
    let url = "https://webspace.csumb.edu/~lara4594/ajax/quotes/getRandomQuote.php";
    let response = await fetch(url);
    data = await response.json();
    document.querySelector("#randomQuote").innerText = data.quoteText;
    document.querySelector("#quoteAuthor").innerText = `-${data.firstName} ${data.lastName}`;
}

function displayAuthorInfo() {
    document.querySelector("#authorPic").innerHTML = "";
    document.querySelector("#authorBio").innerText = data.bio;
    let authorImg = document.createElement("img");
    authorImg.src = data.picture;
    document.querySelector("#authorPic").appendChild(authorImg);

}

function displayLanguages() {
    document.querySelector("#langChoices").innerHTML = "";
    languages = _.shuffle(languages);
    for(let i = 0; i < languages.length; i++) {
        let inputEl = document.createElement("input");
        inputEl.name = "language";
        inputEl.type = "radio";
        inputEl.value = languages[i];

        let labelEl = document.createElement("label");
        labelEl.innerText = languages[i];
        labelEl.prepend(inputEl);
        document.querySelector("#langChoices").appendChild(labelEl);
    }
}

async function randomBackgroundImg() {
    let url = "https://api.unsplash.com/photos/random/?client_id=7756a1e81f817c186cf57294e1c19b37b49c54b8f34e7c499ee0ce5cd86cd16e&featured=true&query=flowers";
    let response = await fetch(url);
    let data = await response.json();

    document.querySelector("body").style.backgroundImage = `url(${data.urls.full}`;
}

async function getQuotes() {
    let numQuotes = document.querySelector("#quoteCount").value;
    if(numQuotes > 5 || numQuotes < 0 || !numQuotes) {
        document.querySelector("#numError").style.color = "red";
        document.querySelector("#numError").innerText = "Please pick a valid number";
        return;
    }

    let url = `https://webspace.csumb.edu/~lara4594/ajax/quotes/getQuotes.php?n=${numQuotes}`;
    let response = await fetch(url);
    let data = await response.json();
    let quoteDiv = document.querySelector("#quotes");
    quoteDiv.innerHTML = "";
    for(let i = 0; i < numQuotes; i++) {
        let newQuote = document.createElement("h4");
        newQuote.innerText = `${data[i].quoteText} \n-${data[i].firstName} ${data[i].lastName}` ;
        quoteDiv.appendChild(newQuote);
    }
}