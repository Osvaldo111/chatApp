/*This function is designed to register the user
 into the database*/
module.exports = {


	registerUser: function(req, repond, pool){

	var userName = req.body.userName;
	var userPassword = req.body.userPassword;

// Query to verify if the user exists on the database
const queryFindUser = {
  // give the query a unique name
  name: 'fetch-user',
  text: 'SELECT * FROM users WHERE user_name = $1',
  values: [userName]
}

const queryinsertUser = {
  text: 'INSERT INTO users(user_name, password) VALUES($1, $2)',
  values: [userName, userPassword],
}

// callback
pool.query(queryFindUser, (err, res) => {
  // check for any unexpected error
  if (err) {
    console.log(err.stack, "VALUE NOT FOUND")
  }
  // Check if the name not match in order to insert it
  // in the database 
  else if (res.row[0].user_name != userName){
    
	pool.query(query, (err, res) => {
	  if (err) {
	    console.log(err.stack)
	  } else {
	    console.log(res.rows[0])
	  }
	})
  
  }//else
})


// callback




	}

};