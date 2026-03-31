create database CarRental;

use CarRental;

create table Vehicles (
	vehicleId char(4) primary key,
	make varchar(30),
	model varchar(30),
	manufactureYear char(4),
	licensePlate varchar(10),
	color varchar(10),
	mileage float,
	dailyRentRate money,
	status varchar(10),
	lastServiceDate date
);


