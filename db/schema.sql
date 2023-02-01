DROP DATABASE IF EXISTS employee_tracker-db;
CREATE DATABASE employee_tracker_db;

USE employee_tracker_db;

CREATE TABLE department (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    department_name VARCHAR(30)
);

CREATE TABLE job (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(30),
    salary DECIMAL,
    departmennt_id INT,
    FOREIGN KEY (departmennt_id) REFERENCES department(id)
)

CREATE Table emplyee (
    id INt NOT NULL AUTO_INCREMENT PRIMARY KEY,
    first_name VARCHAR(30),
    last_name VARCHAR(30),
    manager_id INT,
    job_id INT,
    FOREIGN KEY (job_id) REFERENCES job(id),
    FOREIGN KEY (manager_id) REFERENCES emplyee(id)
)