document.querySelector("button").addEventListener("click", grade);
document.getElementById("Grade").value = "";


function grade(){
    let q3Input = document.getElementById("Grade").value;

    if(q3Input == "100"){
        document.querySelector("#Score").innerText = "A+";
        document.querySelector("#Score").style.color = "green";
    } else if(q3Input == "95"){
        document.querySelector("#Score").innerText = "A";
        document.querySelector("#Score").style.color = "blue";
    } else if(q3Input == "85"){
        document.querySelector("#Score").innerText = "B";
        document.querySelector("#Score").style.color = "yellow";
    } else if(q3Input == "75"){
        document.querySelector("#Score").innerText = "C";
        document.querySelector("#Score").style.color = "red";
    }
}