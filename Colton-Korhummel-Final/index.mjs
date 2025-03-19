import express from 'express';
import mysql from 'mysql2/promise';

const app = express();

app.set('view engine', 'ejs');
app.use(express.static('public'));
//Express Needs the following to parse data sent using the POST method
app.use(express.urlencoded({extended:true}));

//Session Variable
app.set('trust proxy', 1) // trust first proxy

const pool = mysql.createPool({
    host: "colton-korhummel-csumb.online",
    user: "coltonko_webuser",
    password: "DatabasePassword",
    database: "coltonko_quotes",
    connectionLimit: 10,
    waitForConnections: true
});
const conn = await pool.getConnection();

//routes
app.get('/', async (req, res) => {
    let sql = 'SELECT * FROM exam_monsters ORDER BY score DESC';
    const [pokemon] = await conn.query(sql);
   res.render('home.ejs', {pokemon});
});

app.get('/list', async (req, res) => {
    let sql = 'SELECT * FROM exam_monsters NATURAL JOIN exam_elements ORDER BY name';
    const [pokemon] = await conn.query(sql);
    let sqlType = 'SELECT * FROM exam_elements';
    const [pokemonType] = await conn.query(sqlType);
   res.render('list.ejs', {pokemon, pokemonType});
});

app.post('/addPokemon', async (req, res) => {
    let name = req.body.name;
    let moveSet = req.body.moveSet;
    let description = req.body.description; 
    let score = req.body.score;
    let imgName = req.body.imgName;
    let type = req.body.type;
    let currentDate = new Date();
    let formattedDate = currentDate.toISOString().split('T')[0];
    let sql = 'INSERT INTO exam_monsters (name, moveSet, description, firstCaught, score, imgName, elementId) VALUES (?, ?, ?, ?, ?, ?, ?)';
    let sqlParams = [name, moveSet, description, formattedDate, score, imgName, type];
    const [pokemon] = await conn.query(sql, sqlParams);
    res.redirect('/list');
});

app.post('/updatePokemon', async (req, res) => {
    let name = req.body.name;
    let moveSet = req.body.moveSet;
    let description = req.body.description; 
    let score = req.body.score;
    let imgName = req.body.imgName;
    let type = req.body.type;
    let currentDate = new Date();
    let formattedDate = currentDate.toISOString().split('T')[0];
    let sql = 'INSERT INTO exam_monsters (name, moveSet, description, firstCaught, score, imgName, elementId) VALUES (?, ?, ?, ?, ?, ?, ?)';
    let sqlParams = [name, moveSet, description, formattedDate, score, imgName, type];
    const [pokemon] = await conn.query(sql, sqlParams);
    res.redirect('/list');
});

app.get('/quiz', async (req, res) => {
    let sql = 'SELECT * FROM exam_monsters NATURAL JOIN exam_elements ORDER BY RAND() LIMIT 1';
    const [pokemon] = await conn.query(sql);
    let sqlType = 'SELECT * FROM exam_elements WHERE elementId = ?';
    let sqlTypeParams = [pokemon[0].elementId];
    const [pokemonType] = await conn.query(sqlType, sqlTypeParams);
    res.render('quiz.ejs', {pokemon, pokemonType});
});

app.get("/dbTest", async(req, res) => {
    let sql = "SELECT CURDATE()";
    const [rows] = await conn.query(sql);
    res.send(rows);
});//dbTest


app.listen(3000, ()=>{
    console.log("Express server running")
})

 