import express from 'express';
import mysql from 'mysql2/promise';
import bcrypt from 'bcrypt';
import session from 'express-session';

const app = express();

app.set('view engine', 'ejs');
app.use(express.static('public'));

//for Express to get values using POST method
app.use(express.urlencoded({extended:true}));

//Session Variable
app.set('trust proxy', 1) // trust first proxy
app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true,
}))

//setting up database connection pool
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
   res.render('login.ejs')
});

app.get('/logout', (req, res) => {
    req.session.destroy();
    res.redirect("/");
});

app.get('/profile', isAuthenticated, (req, res) => {
    res.render('profile.ejs')
});

app.get('/settings', isAuthenticated, (req, res) => {
    res.render('settings.ejs')
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
        res.render('welcome.ejs')
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