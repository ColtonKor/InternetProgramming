import { shuffle } from 'fast-shuffle';
import fetch from 'node-fetch';
const quotes = (await import("success-motivational-quotes")).default;

let url = "https://csumb.space/api/famousQuotes/getRandomQuote.php";
let response = await fetch(url);
let data = await response.json();
console.log(data);


//funtion expression - need to be before call
const displayQuote = () => {
    console.log(quotes.getTodaysQuote());
}
// or
// const displayQuote = function(){
//     console.log(quotes.getTodaysQuote());
// }
displayQuote()

let letters = ["a", "b", "c", "d", "e"];

const shuffled = shuffle(letters);

console.log(letters);
console.log(shuffled);

//function declaration
function displayQuote_Declaration(){
    console.log(quotes.getTodaysQuote());
}

