const express = require('express')
const path = require('path')
const PORT = process.env.PORT || 5000




// Initialize the pool
const { Pool} = require('pg')
//Connection with the Heroku database.
const connectionString = process.env.DATABASE_URL;
//Create the "pool" object
const pool = new Pool({
 	connectionString: connectionString,
})

// Register a User
var registerUser = require("./register.js");


// In order to use JSON 
var bodyParser = require('body-parser');
express()
  .use(bodyParser.json()) // for parsing application/json
  .use(bodyParser.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded
  .use(express.static(path.join(__dirname, 'public')))
  .set('views', path.join(__dirname, 'views'))
  .set('view engine', 'ejs')
  .get('/', function(req, res){

	res.render('pages/index');


  })
  .post('/welcome',function(req,res){

	res.render('pages/welcome');
	console.log(req.body.userName);
	console.log(req.body.userPassword);

	// Call the function to inser the user
   // registerUser(req, res);

   var flaggy = null;
   var flag = function (registerUser){

   	return(registerUser.registerUser(req, res, pool, flaggy));

   	
   }

   console.log("THIS IS THE RETURN VALUE", flag);
   console.log("THE WEIRD PART OF NODE", flag);

  })
   .post('/chat',function(req,res){


  })
  .listen(PORT, () => console.log(`Listening on ${ PORT }`))

function nameTake(){


    alert('You did did');
 
}



/*	// Query
	const query = {
	  // give the query a unique name
	  name: 'fetch-user',
	  text: 'SELECT * FROM users WHERE user_id = $1',
	  values: [1]
	}*/


/*	// callback
	pool.query(query, (err, res) => {
	  if (err) {
	    console.log(err.stack, "HAHAHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHH")
	  } else {
	  	 console.log("LOOOOOOOOOOOOOOOKKKKKKKKKKKKKKKKKKK");
	    console.log(res.rows[0])
	  }
	})
*/




