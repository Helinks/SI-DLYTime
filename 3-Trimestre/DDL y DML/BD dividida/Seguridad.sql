create role desarollador ;
create role usuario;

GRANT ALL PRIVILEGES ON dlytime.  TO 'desarollador';
grant select,update on dlytime. to usuario;

CREATE USER 'joan'@'localhost' IDENTIFIED BY '123';
CREATE USER kevin@localhost IDENTIFIED BY kevin;

GRANT 'desarollador' TO 'joan'@'localhost';
grant usuario to kevin@localhost;

/*REPAIR TABLE mysql.db;*/