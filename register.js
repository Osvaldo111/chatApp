/*This function is designed to register the user
 into the database*/
module.exports = {


	registerUser: function(req, repond, pool){

	var userName = req.body.userName;
	var userPassword = req.body.userPassword;
  console.log(userName, "THIS IS THE USERNAME");


// Query to verify if the user exists on the database
const queryFindUser = {
  // give the query a unique name
  name: 'fetch-user',
  text: 'SELECT * FROM users WHERE user_nme = $1',
  values: [userName]
}

const queryInsertUser = {
  text: 'INSERT INTO users(user_name, password) VALUES($1, $2)',
  values: [userName, userPassword],
}

// Find if the user is in the database. Otherwise 
// insert the new user.
pool.query(queryFindUser, (err, res) => {
  if (err) {
    console.log(err.stack, "This is an error")
  } else {
      console.log(res.rows[0], "THIS IS THE PERSON")
  }
})

	}

};


    // //Insert the user in the database.
    // pool.query(queryInsertUser, (err, res) => {
    //   if (err) {
    //     console.log(err.stack)
    //   } else {
    //     console.log(res.rows[0])
    //   }
    // })