import express from 'express';
import mysql from 'mysql2/promise';

const app = express();

app.set('view engine', 'ejs')
app.use(express.static('public'))

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
    let sql = "SELECT DISTINCT firstName, lastName FROM quotes NATURAL JOIN authors ORDER BY lastName";
    const [rows] = await conn.query(sql);
    let sqlCategory = "SELECT DISTINCT category FROM quotes NATURAL JOIN authors";
    const [rowsCategory] = await conn.query(sqlCategory);
    res.render('home.ejs', {rows, rowsCategory});
});

app.get('/api/author/:authorId', async (req, res) => {
    let authorId = req.params.authorId;
    let sql = `SELECT * FROM authors WHERE authorId = ?`;
    let sqlParams = [authorId];
    const [rows] = await conn.query(sql, sqlParams);
    res.send(rows);
});

app.get('/searchByKeyword', async (req, res) => {
    let keyword = req.query.keyword;
    let sql = "SELECT * FROM quotes NATURAL JOIN authors WHERE quote LIKE ?";
    let sqlParams = [`%${keyword}%`];
    const [rows] = await conn.query(sql, sqlParams);
    res.render('quotes.ejs', {rows});
});

app.get('/searchByAuthor', async (req, res) => {
    let author = req.query.author;
    let [firstName, lastName] = author.split(' ');
    let sql = "SELECT * FROM quotes NATURAL JOIN authors WHERE firstName = ? AND lastName = ?";
    let sqlParams = [firstName, lastName];
    const [rows] = await conn.query(sql, sqlParams);
    res.render('quotes.ejs', {rows});
});

app.get('/searchByCategory', async (req, res) => {
    let category = req.query.category;
    let sql = "SELECT * FROM quotes NATURAL JOIN authors WHERE category = ?";
    let sqlParams = [category];
    const [rows] = await conn.query(sql, sqlParams);
    res.render('quotes.ejs', {rows});
});

app.get('/searchByLikes', async (req, res) => {
    let minimum = req.query.minimum;
    let maximum = req.query.maximum;
    let sql = "SELECT * FROM quotes NATURAL JOIN authors WHERE likes > ? AND likes < ?";
    let sqlParams = [minimum, maximum];
    const [rows] = await conn.query(sql, sqlParams);
    res.render('quotes.ejs', {rows});
});

app.get("/dbTest", async(req, res) => {
    let sql = "SELECT CURDATE()";
    const [rows] = await conn.query(sql);
    res.send(rows);
});//dbTest

app.listen(3001, ()=>{
    console.log("Express server running");
})