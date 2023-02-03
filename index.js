const PORT = process.env.PORT || 3000
const mysql = require('mysql2');
const inquirer = require('inquirer');
const cTable = require('console.table');

const db = mysql.createConnection(
    {
        host: 'localhost',
        user: 'root',
        password: 'password',
        database: 'employee_tracker_db'
    }
);

db.connect(function (err) {
    if (err) throw err
    console.log(`connected to http://localhost:${PORT}`)
    startApp();
});

function startApp() {
    inquirer
        .prompt([
            {
                message: "Welcome to the Employee Manager App",
                name: 'welcome'
            },
            {
                type: 'list',
                message: 'What Would you like to do?',
                name: 'choice',
                choices: ['View all Employees?',
                    'View all Employees Roles?',
                    'View all Employees by Department?',
                    'Update Employees',
                    'Add Employees',
                    'Add Role',
                    'Add Department'
                ]
            }
        ]).then(function (response) {
            switch (response.choice) {
                case 'View all Employees?':
                    viewAllEmployees();
                    break;
                case 'View all Employees Roles?':
                    viewAllEmployeesRoles();
                    break;
                case 'View all Employees by Department?':
                    viewAllEmployeesDepartment();
                    break;
                case 'Update Employees':
                    updateEmployees();
                    break;
                case 'Add Employees':
                    addEmployees();
                    break;
                case 'Add Role':
                    addRole();
                    break;
                case 'Add Department':
                    addDepartment();
                    break;
            }
            // startApp();
        })
};

function viewAllEmployees() {
    db.query("SELECT employees.first_name, employees.last_name, roles.title, roles.salary, department.department_name, CONCAT(e.first_name, ' ' ,e.last_name) AS Manager FROM employees INNER JOIN roles on roles.id = employees.roles_id INNER JOIN department on department.id = roles.department_id left join employees e on employees.manager_id = e.id;",
        function (err, res) {
            if (err) throw err
            console.table(res)
            startApp();
        })
};

function viewAllEmployeesRoles() {
    db.query('SELECT employees.first_name, employees.last_name, roles.title AS Title FROM employees JOIN roles ON employees.roles_id = roles.id;',
        function (err, res) {
            if (err) throw err
            console.table(res)
            startApp();
        })
};

function viewAllEmployeesDepartment() {
    db.query('SELECT employees.first_name, employees.last_name, department.department_name AS Department FROM employees JOIN roles ON employees.roles_id = roles.id JOIN department ON roles.department_id = department.id ORDER BY employees.id;',
        function (err, res) {
            if (err) throw err
            console.table(res)
            startApp();
        })
};

function updateEmployees() {
    return db.query('SELECT employees.last_name, roles.title FROM employees JOIN roles ON employees.roles_id = roles.id;',
        function (err, res) {
            if (err) throw err
            console.log(res)
            return inquirer.prompt([
                {
                    name: 'lastName',
                    type: 'rawlist',
                    choices: function () {
                        var lastName = []
                        for (i = 0; i < res.length; i++) {
                            lastName.push(res[i].last_name)
                        }
                        // console.log(lastName)
                        return lastName
                    },
                    message: "What is the Employee's last name?"
                },
                {
                    name: 'role',
                    type: 'rawlist',
                    message: "What is the Employee's new title?",
                    choices: selectRole()
                }
            ]).then(function (response) {
                // var roleID = selectRole().indexOf(response.role) + 1
                db.query('UPDATE employees SET last_name = ? WHERE roles_id = ?',
                    [response.lastName, response.roles_id],
                    function (err) {
                        if (err) throw err
                        console.table(response)
                        startApp();
                    })
            })
        })
};

function addEmployees() {
    inquirer
        .prompt([
            {
                name: 'firstname',
                message: 'What is their first name'
            },
            {
                name: 'lastname',
                message: 'What is their last name'
            },
            {
                name: 'role',
                type: 'list',
                message: 'What is their role?',
                choices: selectRole()
            },
            {
                name: 'manager',
                type: 'rawlist',
                message: 'Who is their manager(s)?',
                choices: selectManager()
            }
        ]).then(function (response) {
            var roleID = selectRole().indexOf(response.role)+1
            var managerID = selectManager().indexOf(response.manager)+1
            db.query('INSERT INTO employees SET ?',
                {
                    first_name: response.firstname,
                    last_name: response.lastname,
                    manager_id: managerID,
                    roles_id: roleID
                },
                function (err) {
                    if (err) throw err
                    console.table(response)
                    startApp();
                })
        })
};

async function addRole() {
    db.query("SELECT roles.title AS Title, roles.salary AS Salary FROM roles;",
        function (err, res) {
            return inquirer
                .prompt([
                    {
                        name: 'Title',
                        message: 'What is the roles Title?'
                    },
                    {
                        name: 'Salary',
                        message: 'What is the Salary?'
                    }
                ]).then(function (res) {
                    db.query("INSERT INTO roles SET ?",
                        {
                            title: res.Title,
                            salary: res.Salary
                        },
                        function (err) {
                            if (err) throw err
                            console.table(res)
                            startApp();
                        })
                })
        })
};

function addDepartment() {
    return inquirer
        .prompt([
            {
                name: 'name',
                message: 'What department would you like to add?',
                type: 'input'
            },
        ]).then(function (res) {
            var query = db.query("INSERT INTO department SET ?",
                {
                    department_name: res.name
                },

                function (err) {
                    if (err) throw err
                    console.table(res)
                    startApp();
                })
        })
};

 var rolesArr = []
function selectRole() {
   
    db.query('SELECT * FROM roles',
        function (err, res) {
            if (err) throw err
            for (i = 0; i < res.length; i++) {
                rolesArr.push(res[i].title)
            }
        })
    return rolesArr
};


 var managersArr = []
function selectManager() {
   
    db.query("SELECT first_name, last_name FROM employees WHERE manager_id IS NULL;", function (err, res) {
        if (err) throw err
        for (i = 0; i < res.length; i++) {
            managersArr.push(res[i].first_name)
        }
    })
    return managersArr
};