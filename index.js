const express = require('express')
const path = require('path')
const PORT = process.env.PORT || 5000
const { Pool, Client } = require('pg')
const connectionString = 'postgres://sedeggwijpebdf:b308fcb24aa52b76b98e51ba0456d02926573d5393e1f8edd111045d4e937968@ec2-54-243-61-173.compute-1.amazonaws.com:5432/d7enbr73t7iv7u'

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
    registerUser(req, res);
  })
  .listen(PORT, () => console.log(`Listening on ${ PORT }`))

/*This function is designed to register the user
 into the database*/
function registerUser(req,respond){


	var userName = req.body.userName;
	var userPassword = req.body.userPassword;


	const { Pool} = require('pg')
	const connectionString = process.env.DATABASE_URL;

	const pool = new Pool({
 	 connectionString: connectionString,
	})


// Insert the user into the database
const query = {
  text: 'INSERT INTO users(user_name, password) VALUES($1, $2)',
  values: [userName, userPassword],
}


// callback
pool.query(query, (err, res) => {
  if (err) {
    console.log(err.stack)
  } else {
    console.log(res.rows[0])
  }
})

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


}


