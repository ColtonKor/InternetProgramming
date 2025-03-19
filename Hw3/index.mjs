import express from 'express';
import fetch from 'node-fetch';


const app = express();
app.set("view engine", "ejs");
app.use(express.static("public"));

app.get('/', async (req, res) => {
   let urlCharacters = 'https://rickandmortyapi.com/api/character';
   let responseCharacters = await fetch(urlCharacters);
   let dataCharacters = await responseCharacters.json();
   // console.log(dataCharacters)

   let urlLocations = 'https://rickandmortyapi.com/api/location';
   let responseLocations = await fetch(urlLocations);
   let dataLocations = await responseLocations.json();
   // console.log(dataLocations);

   let urlEpisodes = 'https://rickandmortyapi.com/api/episode';
   let responseEpisodes = await fetch(urlEpisodes);
   let dataEpisodes = await responseEpisodes.json();
   // console.log(dataEpisodes);
   res.render('home.ejs', {dataCharacters, dataLocations, dataEpisodes});
});

app.get('/Characters', async (req, res) => {
   let character = req.query.character;
   let url = `https://rickandmortyapi.com/api/character/${character}`;
   let response = await fetch(url);
   let data = await response.json();
   res.render('character.ejs', {data});
});

app.get('/Locations', async (req, res) => {
   let location = req.query.location;
   let url = `https://rickandmortyapi.com/api/location/${location}`;
   let response = await fetch(url);
   let data = await response.json();
   let characterPromises = data.residents.map(async (characterUrl) => {
      let characterResponse = await fetch(characterUrl);
      return characterResponse.json();
   });
   let characters = await Promise.all(characterPromises);
   data.charactersData = characters;
   res.render('location.ejs', {data});
});

app.get('/Episodes', async (req, res) => {
   let episode = req.query.episode;
   let url = `https://rickandmortyapi.com/api/episode/${episode}`;
   let response = await fetch(url);
   let data = await response.json();
   let characterPromises = data.characters.map(async (characterUrl) => {
      let characterResponse = await fetch(characterUrl);
      return characterResponse.json();
   });
   let characters = await Promise.all(characterPromises);
   data.charactersData = characters;
   res.render('episode.ejs', {data});
});

app.get('/CharactersNav', async (req, res) => {
   let randomID = Math.floor(Math.random() * 20) + 1;
   let url = `https://rickandmortyapi.com/api/character/${randomID}`;
   let response = await fetch(url);
   let data = await response.json();
   res.render('character.ejs', {data});
});

app.get('/LocationsNav', async (req, res) => {
   let randomID = Math.floor(Math.random() * 20) + 1;
   let url = `https://rickandmortyapi.com/api/location/${randomID}`;
   let response = await fetch(url);
   let data = await response.json();
   let characterPromises = data.residents.map(async (characterUrl) => {
      let characterResponse = await fetch(characterUrl);
      return characterResponse.json();
   });
   let characters = await Promise.all(characterPromises);
   data.charactersData = characters;
   res.render('location.ejs', {data});
});

app.get('/EpisodesNav', async (req, res) => {
   let randomID = Math.floor(Math.random() * 20) + 1;
   let url = `https://rickandmortyapi.com/api/episode/${randomID}`;
   let response = await fetch(url);
   let data = await response.json();
   let characterPromises = data.characters.map(async (characterUrl) => {
      let characterResponse = await fetch(characterUrl);
      return characterResponse.json();
   });
   let characters = await Promise.all(characterPromises);
   data.charactersData = characters;
   res.render('episode.ejs', {data});
});

app.listen(10041, () => {
   console.log('server started');
});