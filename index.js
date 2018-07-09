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
  .get('/ajaxCall', function(req, res){


	var data = {
		name : "join"
	};

	res.send(data);


  })
  .post('/welcome',function(req,res){

	
	console.log(req.body.userName);
	console.log(req.body.userPassword);

	// Call the function to inser the user
  registerUser.registerUser(req, res, pool, function(flag){

  	console.log("THE NEW CALLBACK", flag);

// pass a local variable to the view
var params ={ name: 'Tobi' };
res.render('pages/index', params, function(err, html) {
  // ...
  console.log("LOOOOOOOOOOOOOOOKKKKKKKKKKKKKKKKKKK", params);
  res.send(html);

});
  	
  });

   //console.log("THIS IS THE RETURN VALUE", flag);
 

  })
   .post('/chat',function(req,res){


  })
  .listen(PORT, () => console.log(`Listening on ${ PORT }`))

function nameTake(){


    
 
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




