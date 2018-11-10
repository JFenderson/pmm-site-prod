create table users(
id int auto_increment not null primary key,
email varchar(50),
password varchar(50),
_created timestamp default current_timestamp
);

create table members (
	id int auto_increment not null primary key,
	firstName VARCHAR(50),
	lastName VARCHAR(50),
	email VARCHAR(50),
	phoneNumber VARCHAR(50),
	city VARCHAR(50),
	state VARCHAR(50),
	crabYear INT,
    _created timestamp default current_timestamp
);

create table tokens (
	id int auto_increment not null primary key,
    userid varchar(50),
	_created timestamp default current_timestamp
);