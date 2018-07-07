module.exports = {


	registerUser: function(req, repond){

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

	}

};