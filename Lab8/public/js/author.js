document.querySelector("form").addEventListener("submit", validateAuthor);



function validateAuthor(event){
    let fName = document.querySelector("input[name=firstName]").value;
    let lName = document.querySelector("input[name=lastName]").value;
    // let dob = document.querySelector("input[name=dob]").value;
    // let dod = document.querySelector("input[name=dod]").value;
    // let country = document.querySelector("input[name=country]").value;
    // let sex = document.querySelector("input[name=Sex]").value;
    // let profession = document.querySelector("input[name=profession]").value;
    // let portrait = document.querySelector("input[name=url]").value;
    // let bio = document.querySelector("input[name=bio]").value;
    let isValid = true;
    if(fName.length < 3){
        isValid = false;
    }
    if(lName.length < 3){
        isValid = false;
    }
    // if(dob === ""){
    //     isValid = false;
    // }
    // if(dod === ""){
    //     isValid = false;
    // }
    // if(country.length < 3){
    //     isValid = false;
    // }
    // if(sex === ""){
    //     isValid = false;
    // }
    // if(profession === ""){
    //     isValid = false;
    // }
    // if(portrait === ""){
    //     isValid = false;
    // }
    // if(bio === ""){
    //     isValid = false;
    // }

    if(!isValid){
        event.preventDefault();
    }
}