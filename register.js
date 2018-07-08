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
  text: 'SELECT exists(SELECT 1 FROM users WHERE user_name = $1 LIMIT 1)',
  values: [userName]
}

const queryInsertUser = {
  text: 'INSERT INTO users(user_name, password) VALUES($1, $2)',
  values: [userName, userPassword],
}


//var flag = null;

// Find if the user is in the database. Otherwise 
// insert the new user.
pool.query(queryFindUser, (err, res, flag) => {
  if (err) {
    console.log(err.stack, "This is an error")
  } else if(res.rows[0].exists == false){
      console.log(res.rows[0].exists, "THIS IS THE PERSON")


          //Insert the user in the database.
    pool.query(queryInsertUser, (err, res) => {
      if (err) {
        console.log(err.stack)
      } else {
        console.log(res.rows[0])
      }
    })
  } else if(res.rows[0].exists == true){
     var flag = res.rows[0].exists;
     return flag;
     console.log("THE FLAG THAT I WANT IT", flag);
  }


})

	}

};


