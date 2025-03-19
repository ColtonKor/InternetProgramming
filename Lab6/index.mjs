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
app.get('/', (req, res) => {
//    res.send('Hello Express app!')
   res.render('home.ejs');
});


app.get("/allAuthors", async(req, res) => {
    let sql = "SELECT * FROM authors";
    const [rows] = await conn.query(sql);
    // res.send(rows);
    res.render('authors.ejs', {rows});
});//dbTest

app.get("/femaleAuthors", async(req, res) => {
    let sql = "SELECT * FROM authors WHERE sex = ?";
    let sqlParams = ['F'];
    const [rows] = await conn.query(sql, sqlParams);
    // res.send(rows);
    res.render('authors.ejs', {rows});
});//dbTest

app.get("/americanMaleAuthors", async(req, res) => {
    let sql = "SELECT * FROM authors WHERE sex = ? AND country = ? ORDER BY lastName";
    let sqlParams = ['M', 'USA'];
    const [rows] = await conn.query(sql, sqlParams);
    // res.send(rows);
    res.render('authors.ejs', {rows});
});//dbTest

app.get("/cAuthors", async(req, res) => {
    let sql = "SELECT firstName, lastName, country FROM authors WHERE lastName LIKE ?";
    let sqlParams = ['C%'];
    const [rows] = await conn.query(sql, sqlParams);
    // res.send(rows);
    res.render('authors.ejs', {rows});
});//dbTest

app.get("/authorBirthPlaces", async(req, res) => {
    let sql = "SELECT DISTINCT(country) FROM authors ORDER BY country DESC";
    const [rows] = await conn.query(sql);
    // res.send(rows);
    res.render('authorBirthPlaces.ejs', {rows});
});//dbTest

app.get("/inspirational", async(req, res) => {
    let sql = "SELECT * FROM quotes ORDER BY quote";
    const [rows] = await conn.query(sql);
    // res.send(rows);
    res.render('Quotes.ejs', {rows});
});//dbTest

app.get("/inspQuote", async(req, res) => {
    let sql = "SELECT * FROM quotes WHERE category = ?";
    let sqlParams = ['Inspirational'];
    const [rows] = await conn.query(sql, sqlParams);
    // res.send(rows);
    res.render('Quotes.ejs', {rows});
});//dbTest

app.get("/lifeQuotes", async(req, res) => {
    let sql = "SELECT * FROM quotes WHERE quote LIKE ?";
    let sqlParams = ['%like%'];
    const [rows] = await conn.query(sql, sqlParams);
    // res.send(rows);
    res.render('Quotes.ejs', {rows});
});//dbTest

app.get("/wisdomThingQuotes", async(req, res) => {
    let sql = "SELECT * FROM quotes WHERE quote LIKE ? AND category = ?";
    let sqlParams = ['%thing%', 'Wisdom'];
    const [rows] = await conn.query(sql, sqlParams);
    // res.send(rows);
    res.render('Quotes.ejs', {rows});
});//dbTest

app.get("/likedQuotes", async(req, res) => {
    let sql = "SELECT * FROM quotes WHERE likes > 50 AND likes < 100 ORDER BY likes";
    const [rows] = await conn.query(sql);
    // res.send(rows);
    res.render('Quotes.ejs', {rows});
});//dbTest

app.get("/liked3Quotes", async(req, res) => {
    let sql = "SELECT * FROM quotes ORDER BY likes DESC LIMIT 3";
    const [rows] = await conn.query(sql);
    // res.send(rows);
    res.render('Quotes.ejs', {rows});
});//dbTest

app.get("/category", async(req, res) => {
    let sql = "SELECT DISTINCT category FROM quotes ORDER BY category";
    const [rows] = await conn.query(sql);
    // res.send(rows);
    res.render('Category.ejs', {rows});
});//dbTest

app.get("/photo", async(req, res) => {
    let sql = "SELECT firstName, lastName, portrait FROM authors";
    const [rows] = await conn.query(sql);
    // res.send(rows);
    res.render('image.ejs', {rows});
});//dbTest

app.get("/dbTest", async(req, res) => {
    let sql = "SELECT CURDATE()";
    const [rows] = await conn.query(sql);
    res.send(rows);
});//dbTest

app.listen(3001, ()=>{
    console.log("Express server running")
})