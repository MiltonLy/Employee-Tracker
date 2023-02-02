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
)

db.connect(function (err) {
    if (err) throw err
    console.log(`connected to http://localhost:${PORT}`)
    startApp();
})

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
}

function viewAllEmployees() {
    db.query("SELECT employee.first_name, employee.last_name, roles.title, role.salary, department.name, CONCAT(e.first_name, ' ' ,e.last_name) AS Manager FROM employee INNER JOIN role on role.id = employee.role_id INNER JOIN department on department.id = role.department_id left join employee e on employee.manager_id = e.id;",
    function(err, res) {
        if (err) throw err
        cTable(res)
        startPrompt()
    })
}

function viewAllEmployeesRoles() {
    db.query('SELECT employee.first_name, employee.last_name, role.title AS Title FROM employee JOIN role ON employee.role_id = role.id;',
    function(err, res){
        if (err) throw err
        cTable(res)
        startPrompt()
    })
}

function viewAllEmployeesDepartment() {
    db.query('SELECT employee.first_name, employee.last_name, department.name AS Department FROM employee JOIN role ON employee.role_id = role.id JOIN department ON role.department_id = department.id ORDER BY employee.id;',
    function(err, res) {
        if (err) throw err
        cTable(res)
        startPrompt()
    })
}

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
                startPrompt()
            })
        })
    })
}

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
}

