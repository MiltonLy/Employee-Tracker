const inquirer = require('inquirer')
const mysql = require('mysql')
const cTable = require('console.table')
const PORT = process.env.PORT || 3000

const db = mysql.createConnection(
    {
        host: 'localhost',
        user: 'root',
        password: 'password',
        database: 'employee_tracker_db'
    }
)

db.connect(function(err) {
    if (err) throw err
    console.log (`connected to http://localhost:${PORT}`)
    startApp();
})

function startApp() {
    inquirer
        prompt([

        ])
}