-- It may be helpful to drop and reinstantilize the table when doing
-- the tests in case you delete users/cars the tests are expecting to see
-- DROP TABLE IF EXISTS vehicles;

CREATE TABLE Vehicles (
  id SERIAL PRIMARY KEY,
  make varchar(25),
  model varchar(25),
  year int,
  ownerId int references users
);

INSERT INTO vehicles (make, model, year, ownerId) values ('Toyota', 'Camry', 1991, 1);
INSERT INTO vehicles (make, model, year, ownerId) values ('Honda', 'Civic', 1995, 1);
INSERT INTO vehicles (make, model, year, ownerId) values ('Ford', 'Focus', 2005, 1);
INSERT INTO vehicles (make, model, year, ownerId) values ('Ford', 'Taurus', 2003, 2);
INSERT INTO vehicles (make, model, year, ownerId) values ('VW', 'Bug', 2010, 2);
INSERT INTO vehicles (make, model, year, ownerId) values ('Mini', 'Coup', 2013, 3);
