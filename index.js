const express = require('express')
const path = require('path')
const PORT = process.env.PORT || 5000
const app = express()

// Initialize the pool
const { Pool} = require('pg')
//Connection with the Heroku database.
const connectionString = process.env.DATABASE_URL;
//Create the "pool" object
const pool = new Pool({
 	connectionString: connectionString,
})

// Module to register a User
var registerUser = require("./register.js");

// Modulte to check if the user exists
var verifyUser = require("./verifyUser.js");

// Variables needed to use Socket.io
var http = require('http').Server(app)
var io = require('socket.io')(http)

// In order to use JSON 
var bodyParser = require('body-parser');
app
  .use(bodyParser.json()) // for parsing application/json
  .use(bodyParser.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded
  .use(express.static(path.join(__dirname, 'public')))
  .set('views', path.join(__dirname, 'views'))
  .set('view engine', 'ejs')
  .get('/', function(req, res){

	res.render('pages/index');


  })
  .get('/SignUp', function(req, res){

	res.render('pages/SignUp');


  })
  .post('/registerUser',function(req,res){

	// Just for debuggin purposes	
	console.log(req.body.username);
	console.log(req.body.password);

	// Call the function to inser the user
    registerUser.registerUser(req, res, pool, function(flag){

  	console.log("Design to check if the user is in the DB", flag);	
	
	// Send the result back to the client. 
	res.send(flag);

  });

  })
  .post('/verifyLogin',function(req,res){

	// Just for debuggin purposes	
	console.log(req.body.username);
	console.log(req.body.password);

	// Function to verify if the user exists
	verifyUser.verifyUser(req, res, pool, function(result){

		// Send the callback to the client. True if the user exist
		// or false if it doesn't.
		res.send(result);
	});

  })
  .get('/welcome2',function(req,res){

  	res.render('pages/welcome');
  })
   .post('/chat',function(req,res){


  })
  .get('/chat', function(req, res){

	res.render('pages/chat');


  });


   io.on('connection', function(socket){
  socket.on('chat message', function(msg){
    io.emit('chat message', msg);
  });
});
  http.listen(PORT, () => console.log(`Listening on ${ PORT }`))




