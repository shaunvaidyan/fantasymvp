require("dotenv").config();
//const db = require("./db.js");
const mysql = require('mysql');
const express = require('express');
const session = require('express-session');
const path = require('path');
const bcrypt = require("bcryptjs"); // bcryptjs on linux server

const DB_HOST = process.env.DB_HOST;
const DB_USER = process.env.DB_USER;
const DB_PASSWORD = process.env.DB_PASSWORD;
const DB_DATABASE = process.env.DB_DATABASE;
const DB_PORT = process.env.DB_PORT;
const SECRET = process.env.SECRET;

const db = mysql.createPool({
	connectionLimit: 100,
	host: 'db',
	user: DB_USER,
	password: DB_PASSWORD,
	database: DB_DATABASE,
	port: DB_PORT
 });
 
const app = express();

app.use(session({
	secret: SECRET,
	resave: true,
	saveUninitialized: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// app.use((req, res, next)=>{
// 	res.redirect("/");
// });

// http://localhost:3000/
app.get('/', function(request, response) {
	// Render login template
	response.sendFile(path.join(__dirname + '/login.html'));
});

// http://localhost:3000/auth
app.post("/auth", (req, res)=> {
   const username = req.body.username
   const password = req.body.password
   if (username && password) {
      db.getConnection ( async (err, connection)=> { 
         if (err) throw (err)
         const sqlSearch = "Select * from accounts where username = ?"
         const search_query = mysql.format(sqlSearch,[username]) 
         await connection.query (search_query, async (err, result) => {  
         
         connection.release()
         
         if (err) throw (err)  
         if (result.length == 0) {
         console.log("--------> User does not exist")
         res.send('User Does Not Exist')
         } else {
           const hashedPassword = result[0].password //get the hashedPassword
           if (await bcrypt.compare(password, hashedPassword)) {
           console.log("---------> Login Successful")
           req.session.loggedin = true;
           req.session.username = username;
           res.redirect('/home');
           } else {
               console.log("---------> Password Incorrect")
               res.send("Password incorrect!")
               }
         }
      })
   })
   } else {
      res.send('Please enter Username and Password!');
      res.end();
   }
});


// http://localhost:3000/registration.html
app.get('/registration', function(request, response) {
	// Render login template
	response.sendFile(path.join(__dirname + '/registration.html'));
});

app.get('/logout', function(request, response) {
	// Render login template
	response.sendFile(path.join(__dirname + '/login.html'));
});

//CREATE USER
app.post("/createUser", async (req,res) => {
	let username = req.body.username;
	let email = req.body.email;
	let hashedPassword = await bcrypt.hash(req.body.password,10);

	db.getConnection( async (err, connection) => { 
	if (err) throw (err)
	const sqlSearch = "SELECT * FROM accounts WHERE username = ?"
	const search_query = mysql.format(sqlSearch,[username])
	const sqlInsert = "INSERT INTO accounts VALUES (0,?,?,?)"
	const insert_query = mysql.format(sqlInsert,[username, hashedPassword, email])

	await connection.query (search_query, async (err, result) => {
		if (err) throw (err)
  		console.log("------> Search Results")
  		console.log(result.length)
  		if (result.length != 0) {
   		connection.release()
  		console.log("User already exists")
   		res.sendStatus(409) 
  		} else {
   			await connection.query (insert_query, (err, result)=> {   connection.release()   

   			if (err) throw (err)
   			console.log('New User Created Successfully!');
			res.redirect('/');
  })
 }
}) //end of connection.query()
}) //end of db.getConnection()
}) //end of app.post()

// http://localhost:3000/home
app.get('/home', function(req, res) {
	// If the user is loggedin
	if (req.session.loggedin) {
		// Output username
		res.redirect('app.html');
	} else {
		// Not logged in
		res.redirect('/');
	}
	res.end();
});

app.listen(3000);
