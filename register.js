/*This function is designed to register the user
 into the database*/
module.exports = {


	registerUser: function(req, repond, pool, callback){

  // The nane of the user from the form  
	var userName = req.body.username;
  // The password of the user from the form
	var userPassword = req.body.password;
  console.log(userName, "THIS IS THE USERNAME");

 // Query to verify if the user exists on the database
  const queryFindUser = {
    // give the query a unique name
    name: 'fetch-user',
    text: 'SELECT exists(SELECT 1 FROM users WHERE user_name = $1 LIMIT 1)',
    values: [userName]
  }

  const queryInsertUser = {
    text: 'INSERT INTO users(user_name, password) VALUES($1, $2)',
    values: [userName, userPassword],
  }


  // A flag to show the user if the name is taken or
  // if the password is incorrect.
  var flag = null;

      // Find if the user is in the database. Otherwise 
      // insert the new user.
      pool.query(queryFindUser, (err, res, flag) => {
        if (err) {
          console.log(err.stack, "This is an error")
        } else if(res.rows[0].exists == false){

          // Assign false if the user doesn't exist. 
          flag = res.rows[0].exists;

          //If the user doesn't exist, insert it in the database.
          pool.query(queryInsertUser, (err, res) => {
            if (err) {
              console.log(err.stack)
            } else {
              console.log(res.rows[0])
            }
          })

        } else if(res.rows[0].exists == true){

          // Assign true if the user exist.
           flag = res.rows[0].exists;
           console.log("THE FLAG THAT I WANT IT", flag);

           
        }

        // Use the callback to get the value of the flag.
        callback(flag);
      })
	}

};


