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
   res.send('Hello Express app!')
});


app.get("/allAuthors", async(req, res) => {
    let sql = "SELECT * FROM authors";
    const [rows] = await conn.query(sql);
    res.send(rows);
});//dbTest


app.get("/dbTest", async(req, res) => {
    let sql = "SELECT CURDATE()";
    const [rows] = await conn.query(sql);
    res.send(rows);
});//dbTest

app.listen(3001, ()=>{
    console.log("Express server running")
})