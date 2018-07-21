/*This function is designed to check if the user exist in the
 DataBase. Especially when the user tries to log in.*/
module.exports = {

	verifyUser : function(req, res, pool, session, callback){


		var bcrypt = require('bcrypt');
		var userName = req.body.username;
		var userPassword = req.body.password;


		console.log("This function verifyUser", userName, "  ", userPassword);
		// The result that is going to be send if the user exists
		var result = null;

		// Query to verify if the user exists on the database
		// according to the username and the password.
		const queryFindUser = {
		  // give the query a unique name
		  name: 'fetch-user',
		  // Because we avoid repetition when the name was stored, it is not neccesary
		  // use a case sentitive query. 
		  text: 'SELECT user_name, password FROM users WHERE user_name = $1',  //SELECT user_name, password FROM users WHERE exists(SELECT 1 FROM users WHERE user_name ILIKE $1 LIMIT 1)
		  values: [userName]
		}


		// Find if the user is in the database.
		pool.query(queryFindUser, (err, res, result) => {

			console.log("This is the query verify", res);


			if (err) {
		    console.log(err.stack, "This is an error")
		 	 }
		 	 // Check if the query exist 
		 	 else if(res.rows[0]){    

		    	// Use the function of "bcrypt" to check if the password of the
		    	// query match with the password provided by the user.
			    if(bcrypt.compareSync(userPassword, res.rows[0].password))
			    {	
			    	// Assign the result to "true"
			    	result = true;

			    	 
 					 req.session.username = userName;
			    }else{

			    	// If the password doesn't match 
			    	// assign the result to "false".
			    	result = false;
			    }
		  } 
		  // If the query doesn't exist. This means the user is not in the DB.
		  else {

		    // Assign the result to "false".
		    result = false; 
		  }
		  // Use the callback to get the value of the result.
		  callback(result);
		})
	}
};