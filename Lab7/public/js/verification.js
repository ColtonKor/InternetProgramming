document.querySelector("#keywordSearch").addEventListener("submit", validateKeyWord);
document.querySelector("#authorSearch").addEventListener("submit", validateAuthor);
document.querySelector("#categorySearch").addEventListener("submit", validateCategory);
document.querySelector("#likeSearch").addEventListener("submit", validateLikes);



function validateKeyWord(event){
    let keyword = document.querySelector("input[name=keyword]").value;
    let isValid = true;
    if(keyword.length < 3){
        isValid = false;
    }

    if(!isValid){
        event.preventDefault();
        document.querySelector("#error").innerHTML = "Keyword needs to have 3 or more letters";
    } else {
        document.querySelector("#error").innerHTML = "";
    }
}

function validateAuthor(event){
    let author = document.querySelector("select[name=author]").value;
    let isValid = true;
    if(author == ""){
        isValid = false;
    }

    if(!isValid){
        event.preventDefault();
        document.querySelector("#error").innerHTML = "You need to select an author";
    } else {
        document.querySelector("#error").innerHTML = "";
    }
}


function validateCategory(event){
    let category = document.querySelector("select[name=category]").value;
    let isValid = true;
    if(category == ""){
        isValid = false;
    }

    if(!isValid){
        event.preventDefault();
        document.querySelector("#error").innerHTML = "You need to select a category";
    } else {
        document.querySelector("#error").innerHTML = "";
    }
}


function validateLikes(event){
    let minimum = document.querySelector("input[name=minimum]").value;
    let maximum = document.querySelector("input[name=maximum]").value;
    let isValid = true;
    if(minimum == ""){
        isValid = false;
    }
    if(maximum == ""){
        isValid = false;
    }

    if(!isValid){
        event.preventDefault();
        document.querySelector("#error").innerHTML = "You need to select a minimum and maximum amount of likes";
    } else {
        document.querySelector("#error").innerHTML = "";
    }
}