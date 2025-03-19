import express from 'express';
import fetch from 'node-fetch';

const planets = (await import('npm-solarsystem')).default;

const app = express();
app.set("view engine", "ejs");
app.use(express.static("public"));

app.get('/', async (req, res) => {
    let url = 'https://api.unsplash.com/photos/random/?client_id=uWmteld4ogCCEFGS0SnstuPXXKfBxL-Af8db1hwJI9Q&featured=true&query=solar%20system&orientation=landscape';
    let response = await fetch(url);
    let data = await response.json();
    // console.log(data);
    res.render('home.ejs', {data});
});

app.get('/planet', (req, res) => {
    let planet = req.query.planetName;
    console.log(planet);
    let planetInfo;
    planetInfo = planets[`get${planet}`]();
    res.render('planet.ejs', {planetInfo, planet});
});

app.get('/spaceRock', (req, res) => {
    let rock = req.query.spaceRocks;
    console.log(rock);
    let rockInfo;
    rockInfo = planets[`get${rock}`]();
    res.render('spaceRock.ejs', {rock, rockInfo});
});

app.get('/nasa', async (req, res) => {
    const date = new Date();
    let DateMonth = req.query.dayPick;
    let DateDay = req.query.day;
    let DateYear = req.query.year;
    let url;

    if(!DateMonth || !DateDay || !DateYear){
        url = `https://api.nasa.gov/planetary/apod?api_key=9mUzIkhlZCZaOoMfspg7jMmwZCZ4LiRHtkgkambD&date=${date.getFullYear()}-${date.getMonth()+1}-${date.getDate()}`;
    } else {
        url = `https://api.nasa.gov/planetary/apod?api_key=9mUzIkhlZCZaOoMfspg7jMmwZCZ4LiRHtkgkambD&date=${DateYear}-${DateMonth}-${DateDay}`;
    }
    let response = await fetch(url);
    let data = await response.json();
    res.render('nasa.ejs', {data});
});
 

app.listen(10041, () => {
   console.log('server started');
});