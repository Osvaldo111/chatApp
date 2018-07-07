/*This function is designed to register the user
 into the database*/
module.exports = {


	registerUser: function(req, repond, pool){

	var userName = req.body.userName;
	var userPassword = req.body.userPassword;


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