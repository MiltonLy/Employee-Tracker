INSERT INTO department (department_name) VALUE ('Sales');
INSERT INTO department (department_name) VALUE ('Engineering');
INSERT INTO department (department_name) VALUE ('Finance');
INSERT INTO department (department_name) VALUE ('HR');

INSERT INTO roles (title, salary, department_id)
VALUE ('Sales Lead', 100000, 1);
INSERT INTO roles (title, salary, department_id)
VALUE ('Sales Assistant', 60000, 1);
INSERT INTO roles (title, salary, department_id)
VALUE ('Senior Engineer', 120000, 2);
INSERT INTO roles (title, salary, department_id)
VALUE ('Intern', 40000, 2);
INSERT INTO roles (title, salary, department_id)
VALUE ('Accountant', 60000, 3);
INSERT INTO roles (title, salary, department_id)
VALUE ('Bookkeeper', 70000, 3);
INSERT INTO roles (title, salary, department_id)
VALUE ('Talent Management', 50000, 4);
INSERT INTO roles (title, salary, department_id)
VALUE ('Training and Development', 50000, 4);

INSERT INTO employees (first_name, last_name, manager_id, roles_id)
VALUE ('William', 'Jenkins', 1, 1);
INSERT INTO employees (first_name, last_name, manager_id, roles_id)
VALUE ('Sally', 'Smith', 2, 2);
INSERT INTO employees (first_name, last_name, manager_id, roles_id)
VALUE ('Michael', 'Michillin', 3, 3);
INSERT INTO employees (first_name, last_name, manager_id, roles_id)
VALUE ('Brittney', 'Baker', 4, 4);
INSERT INTO employees (first_name, last_name, manager_id, roles_id)
VALUE ('Chadwick', 'Boolean', NULL, 5);
INSERT INTO employees (first_name, last_name, manager_id, roles_id)
VALUE ('Terence', 'Treetop', NULL, 6);
INSERT INTO employees (first_name, last_name, manager_id, roles_id)
VALUE ('Whitney', 'Houston', NULL, 7);
INSERT INTO employees (first_name, last_name, manager_id, roles_id)
VALUE ('Ashley', 'Walnut', NULL, 8);

SELECT * FROM department;
SELECT * FROM roles;
SELECT * FROM employees;