const PORT = process.env.PORT || 3000
const mysql = require('mysql2');
const inquirer = require('inquirer');
const cTable = require('console.table');

const db =  mysql.createConnection(
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
    return inquirer
    .prompt([
        {
            message: "Welcome to the Employee Manager App"
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
    ]).then(function(response) {
        switch (response.choice) {
            case 'View all Employees?':
                viewAllEmployees();
            
            case 'View all Employees Roles?':
                viewAllEmployeesRoles();

            case 'View all Employees by Department?':
                viewAllEmployeesDepartment();

            case 'Update Employees':
                updateEmployees();

            case 'Add Employees':
                addEmployees();

            case 'Add Role':
                addRole();

            case 'Add Department':
                addDepartment();
        }
    })
};

function viewAllEmployees() {
    db.query("SELECT employee.first_name, employee.last_name, roles.title, role.salary, department.name, CONCAT(e.first_name, ' ' ,e.last_name) AS Manager FROM employee INNER JOIN role on role.id = employee.role_id INNER JOIN department on department.id = role.department_id left join employee e on employee.manager_id = e.id;",
    function(err, res) {
        if (err) throw err
        cTable(res)
        startApp()
    })
};

function viewAllEmployeesRoles() {
    db.query('SELECT employee.first_name, employee.last_name, role.title AS Title FROM employee JOIN role ON employee.role_id = role.id;',
    function(err, res){
        if (err) throw err
        cTable(res)
        startApp()
    })
};

function viewAllEmployeesDepartment() {
    db.query('SELECT employee.first_name, employee.last_name, department.name AS Department FROM employee JOIN role ON employee.role_id = role.id JOIN department ON role.department_id = department.id ORDER BY employee.id;',
    function(err, res) {
        if (err) throw err
        cTable(res)
        startApp()
    })
};

function updateEmployees() {
    db.query('SELECT employee.last_name, role.title FROM employee JOIN role ON employee.role_id = role.id;',
    function(err, res) {
        if (err) throw err
        console.log(res)
        inquirer.prompt([
            {
                name: 'lastName',
                type: 'rawlist',
                choices: function() {
                    var lastName = []
                    for (i = 0; i <res.length; i++) {
                        lastName.push(res[i].lastname)
                    }
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
        ]).then(function(response) {
            var roleID = selectRole().indexOf(val.role) ++
            db.query('UPDATE employee SET WHERE ?',
            {
                last_name : response.lastName
            },
            {
                role_id: roleID
            },
            function(err) {
                if (err) throw err
                cTable(response)
                startApp()
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
    ]).then(function(response) {
        var roleID = selectRole().indexOf(response.role) ++
        var managerID = selectManager().indexOf(response.manager) ++
        db.query('INSERT INTO employee SET ?',
        {
            first_name: response.firstname,
            last_name: response.lastName,
            manager_id: managerID,
            role_id: roleID 
        },
        function(err) {
            if (err) throw err
            cTable(response)
            startApp()
        })
    })
};

function addRole() {
    db.query("SELECT role.title AS Title, role.salary AS Salary FROM role;",
    function(err, res) {
        inquirer
        .prompt([
            {
                name: 'Title',
                message: 'What is the roles Title?'
            },
            {
                name: 'Salary',
                message: 'What is the Salary?'
            }
        ]).then(function(res){
            db.query("INSERT INTO role SET ?",
            {
                title: res.Title,
                salary: res.Salary
            },
            function(err) {
                if (err) throw err
                cTable(res)
                startApp()
            })
        })
    })
};

function addDepartment(){
    inquirer
    .prompt([
        {
            name: 'name',
            message: 'What department would you like to add?'
        }
    ]).then(function(res) {
        db.query('INSERT INTO department SET ?',
        {
            name: res.name
        },
        function(err) {
            if (err) throw err
            cTable(res)
            startApp()
        })
    })
};

var rolesArr = []
function selectRole() {
    db.query('SELECT * FROM role',
    function(err, res) {
        if (err) throw err
        for (i = 0; i < res.length; i++){
            rolesArr.push(res[i].title)
        }
    })
    return rolesArr
};

var managersArr = []

function selectManager() {
    db.query("SELECT first_name, last_name FROM employee WHERE manager_id IS NULL;", function(err, res) {
        if (err) throw err
        for ( i = 0; i < res.length; i++) {
            managersArr.push(res[i].first_name)
        }
    })
    return managersArr
};