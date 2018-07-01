CREATE TABLE users(
	user_id serial PRIMARY KEY,
	user_name varchar(50),
	password varchar(50)
);

CREATE TABLE messages(
	user_id integer REFERENCES  users(user_id),
	messages text,
	actual_date date
);

INSERT INTO users(user_name, password)
VALUES('osvaldo', 123);