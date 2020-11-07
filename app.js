const inquirer = require("inquirer");
const mysql = require("mysql");
const Action = require("./action");
const consoleTable = require("console.table");


const connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "@Justice34",
    database: "my_employee_trackerDB"
});

connection.connect(function (err) {
    if (err) throw err;
    console.log("connected as id " + connection.threadId);
    start();
});

function start () {
    inquirer
    .prompt ([
        {
            name: "action",
            type: "list",
            message: "Please Pick An Action",
            choices: ["View All Employees", "View All Roles", "View All Departments", "Add Employee", "Add Role", "Add Department", "Update Employee Role"]
        }
    ]) .then(function (res) {
        console.log(res.action);
        switch (res.action) {
            case "View All Employees":
                const view = new Action();
                view.allEmployees(anotherAction);
                break;
            case "View All Roles":
                let viewRoles = new Action();
                viewRoles.viewRoles(anotherAction);
                break;
            case "View All Departments":
                let viewDep = new Action();
                viewDep.viewDepartments(anotherAction);
                break;
            case "Add Employee":
                let addEmp= new Action();
                addEmp.addEmployee(anotherAction);
                break;
            case "Add Role":
                let addRole = new Action();
                addRole.addRole(anotherAction);
                break;
            case "Add Department":
                let addDep = new Action();
                addDep.addDepartment(anotherAction);
                break;
            case "Update Employee Role":
                let updateEmpRole = new Action();
                updateEmpRole.updateEmployeeRole(anotherAction);
                break;
            default:
        };
        
    });
};

function anotherAction() {
inquirer
    .prompt([
        {
            name: "answer",
            type: "confirm",
            message: "Would you like to perform another task?"
        }
    ]).then(function (res) {
        if (res.answer) {
            start();
        } else {
            connection.end();
        }
    })
}

 

