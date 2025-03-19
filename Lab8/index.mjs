import express from 'express';
import mysql from 'mysql2/promise';
import bcrypt from 'bcrypt';
import session from 'express-session';

const app = express();

app.set('view engine', 'ejs');
app.use(express.static('public'));
//Express Needs the following to parse data sent using the POST method
app.use(express.urlencoded({extended:true}));

//Session Variable
app.set('trust proxy', 1) // trust first proxy
app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true,
}))

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
   res.render('login.ejs');
});

app.get('/home', isAuthenticated, (req, res) => {
    res.render('home.ejs');
 });

app.get('/logout', (req, res) => {
    req.session.destroy();
    res.redirect("/");
});

app.get('/authors', isAuthenticated, async (req, res) => {
    let sql = 'SELECT firstName, lastName, authorId FROM authors ORDER BY lastName';
    const [authors] = await conn.query(sql);
    res.render('authors.ejs', {authors});
});

app.get('/author/edit', isAuthenticated, async (req, res) => {
    let authorId = req.query.authorId;
    let sql = 'SELECT * FROM authors WHERE authorId = ?';
    let sqlParams = [authorId];
    const [authorData] = await conn.query(sql, sqlParams);
    res.render('editAuthors.ejs', {authorData});
});

app.get('/author/delete', isAuthenticated, async (req, res) => {
    let authorId = req.query.authorId;
    let sql = 'DELETE FROM authors WHERE authorId = ?';
    let sqlParams = [authorId];
    const [authorData] = await conn.query(sql, sqlParams);
    res.redirect("/authors");
});

app.post('/author/edit', async (req, res) => {
    let authorId = req.body.authorId;
    let fName = req.body.firstName;
    let lName = req.body.lastName;
    let dob = req.body.dob;
    let dod = req.body.dod;
    let sex = req.body.Sex;
    let profession = req.body.profession;
    let country = req.body.country;
    let portrait = req.body.url;
    let biograpghy = req.body.bio;
    let sql = 'UPDATE authors SET firstName = ?, lastName = ?, dob = ?, dod = ?, sex = ?, profession = ?, country = ?, portrait = ?, biography = ? WHERE authorId = ?';
    let sqlParams = [fName, lName, dob, dod, sex, profession, country, portrait, biograpghy, authorId];
    const [authorData] = await conn.query(sql, sqlParams);
    res.redirect("/authors");
});


app.get('/quotes', isAuthenticated, async (req, res) => {
    let sql = 'SELECT * FROM quotes ORDER BY quote';
    const [quotes] = await conn.query(sql);
    res.render('quotes.ejs', {quotes});
});

app.get('/quote/edit', isAuthenticated, async (req, res) => {
    let quoteId = req.query.quoteId;
    let sql = 'SELECT * FROM quotes WHERE quoteId = ?';
    let sqlParams = [quoteId];
    const [quoteData] = await conn.query(sql, sqlParams);

    let sqlAuthors = 'SELECT firstName, lastName, authorId FROM authors';
    const [rows] = await conn.query(sqlAuthors);

    let sqlCategory = 'SELECT DISTINCT category FROM quotes';
    const [rowsCategory] = await conn.query(sqlCategory);
    res.render('editQuotes.ejs', {quoteData, rows, rowsCategory});
});

app.get('/quote/delete', isAuthenticated, async (req, res) => {
    let quoteId = req.query.quoteId;
    let sql = 'DELETE FROM quotes WHERE quoteId = ?';
    let sqlParams = [quoteId];
    const [quoteData] = await conn.query(sql, sqlParams);
    res.redirect("/quotes");
});

app.post('/quote/edit', async (req, res) => {
    let quoteId = req.body.quoteId;
    let quote = req.body.Quote;
    let likes = req.body.likes;
    let author = req.body.author;
    let category = req.body.category;
    let insert = 'UPDATE quotes SET quote = ?, authorId = ?, category = ?, likes = ? WHERE quoteId = ?';
    let sqlParams = [quote, author, category, likes, quoteId];
    const [rowsAdd] = await conn.query(insert, sqlParams);
    res.redirect("/quotes");
});

//Route to Display Form
app.get('/authors/new', isAuthenticated, (req, res) => {
    res.render('newAuthor.ejs');
});

//Route to insert new author into the database
app.post('/authors/new', async (req, res) => {
    let fName = req.body.firstName;
    let lName = req.body.lastName;
    let dob = req.body.dob;
    let dod = req.body.dod;
    let sex = req.body.Sex;
    let profession = req.body.profession;
    let country = req.body.country;
    let portrait = req.body.url;
    let biograpghy = req.body.bio;
    let sql = 'INSERT INTO authors (firstName, lastName, dob, dod, sex, profession, country, portrait, biography) VALUES (?,?,?,?,?,?,?,?,?)';
    let sqlParams = [fName, lName, dob, dod, sex, profession, country, portrait, biograpghy];
    const [rows] = await conn.query(sql, sqlParams);
    res.redirect("/");
});
 
app.get('/quotes/new', isAuthenticated, async (req, res) => {
    let sql = 'SELECT firstName, lastName, authorId FROM authors';
    const [rows] = await conn.query(sql);

    let sqlCategory = 'SELECT DISTINCT category FROM quotes';
    const [rowsCategory] = await conn.query(sqlCategory);
    res.render('newQuote.ejs', {rows, rowsCategory});
});

app.post('/quotes/new',  async (req, res) => {
    let quote = req.body.Quote;
    let likes = req.body.likes;
    let author = req.body.author;
    let category = req.body.category;
    let insert = 'INSERT INTO quotes (quote, authorId, category, likes) VALUES (?, ?, ?, ?)';
    let sqlParams = [quote, author, category, likes];
    const [rowsAdd] = await conn.query(insert, sqlParams);
    res.redirect("/");
});

app.post('/login', async (req, res) => {
    let username = req.body.username;
    let password = req.body.password;

    let passwordHash = "";
    
    let sql = `SELECT * FROM admin WHERE username = ?`;
    const [rows] = await conn.query(sql, [username]);

    if(rows.length > 0){
        passwordHash = rows[0].password;
    }
    let match = await bcrypt.compare(password, passwordHash);
    
    if(match){
        req.session.fullName = rows[0].firstName + " " + rows[0].lastName;
        req.session.authenticated = true;
        res.render('home.ejs')
    } else{
        res.redirect("/")
    }
    
});

app.get("/dbTest", async(req, res) => {
    let sql = "SELECT CURDATE()";
    const [rows] = await conn.query(sql);
    res.send(rows);
});//dbTest


//Middleware Functions
function isAuthenticated(req, res, next){
    if(req.session.authenticated){
        next();
    } else {
        res.redirect("/");
    }
}

app.listen(3000, ()=>{
    console.log("Express server running")
})

 