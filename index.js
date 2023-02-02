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
                      'View all Employees Jobs?', 
                      'View all Employees by Department?', 
                      'Update Employees', 'Add Employee', 
                      'Add Job', 
                      'Add Department'
                     ]
        }
    ])
}