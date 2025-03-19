let authorLinks = document.querySelectorAll(".authorLink");
for(let i of authorLinks){
    i.addEventListener("click", displayAuthorInfo);
}


async function displayAuthorInfo(){
    let authorId = this.getAttribute('authorId');
    let url = `/api/author/${authorId}`;
    let response = await fetch(url);
    let data = await response.json();

    let dobFormatted = new Date(data[0].dob);
    let dodFormatted = new Date(data[0].dod);

    document.querySelector("#authorName").innerText = data[0].firstName + " " + data[0].lastName;
    document.querySelector("#authorImage").src = data[0].portrait;
    document.querySelector("#dob").innerText = "Date of Birth: " + (dobFormatted.getMonth() + 1)+"/"+dobFormatted.getDate()+"/"+dobFormatted.getFullYear();
    document.querySelector("#dod").innerText = "Date of Death: " + (dodFormatted.getMonth() + 1)+"/"+dodFormatted.getDate()+"/"+dodFormatted.getFullYear();
    if(data[0].sex == "M"){
        document.querySelector("#sex").innerText = "Gender: Male";
    } else if(data[0].sex == "F") {
        document.querySelector("#sex").innerText = "Gender: Female";
    }
    document.querySelector("#country").innerText = "Country of Origin: " + data[0].country;
    document.querySelector("#profession").innerText = "Profession: " + data[0].profession;
    document.querySelector("#bio").innerText = "Biography of Author: " + data[0].biography;
    //Add rest of the Data for user
    const myModal = new bootstrap.Modal('#authorModal');
    myModal.show();
}