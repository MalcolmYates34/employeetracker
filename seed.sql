DROP DATABASE IF EXISTS my_employee_trackerDB;

/* Create database */
CREATE DATABASE my_employee_trackerDB;
USE my_employee_trackerDB;

/* Create new table with a primary key that auto-increments, and a text field */
CREATE TABLE employee (
  id INT NOT NULL AUTO_INCREMENT,
  first_name VARCHAR(30) NULL,
  last_name VARCHAR(30) NULL,
  role_id INT NOT NULL,
  manager_id INT NULL
  PRIMARY KEY (id)
);

CREATE TABLE department (
  id INT NOT NULL AUTO_INCREMENT,
  depName VARCHAR (30) NULL
  PRIMARY KEY (id)
);

CREATE TABLE roles (
  id INT NOT NULL AUTO_INCREMENT,
  title VARCHAR (30) NULL,
  salary DECIMAL (10,2) NULL,
  department_id INT NULL
  PRIMARY KEY (id)
);

