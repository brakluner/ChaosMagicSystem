CREATE DATABASE CMS_db;

USE CMS_db;

CREATE TABLE department (
  id int NOT NULL AUTO_INCREMENT,
  name varchar(255) NOT NULL,
  PRIMARY KEY (id)
);

CREATE TABLE role (
  id int NOT NULL AUTO_INCREMENT,
  title varchar(255) NOT NULL,
  salary varchar(255) NOT NULL,
  PRIMARY KEY (id)
  department_id int NOT NULL AUTO_INCREMENT,
);

CREATE TABLE employee (
  id int NOT NULL AUTO_INCREMENT,
  first_name varchar(255) NOT NULL,
  last_name varchar(255) NOT NULL,
  PRIMARY KEY (id)
  role_id int NOT NULL AUTO_INCREMENT,
  manager_id int NOT NULL AUTO_INCREMENT,
);