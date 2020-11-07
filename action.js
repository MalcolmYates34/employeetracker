const inquirer = require("inquirer");
const mysql = require("mysql");
const consoleTable = require("console.table");


const connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "@Justice34",
    database: "my_employee_trackerDB"
});

class Action {
    allEmployees(anotherAction) {
        let employees = "SELECT employee.id, employee.first_name,employee.last_name, roles.title, roles.salary FROM employee LEFT JOIN roles on employee.role_id = roles.id";
        console.log("These are all the employee: ");
        connection.query(employees, function (err, res) {
            if (err) throw err;
            let table = consoleTable.getTable(res);
            console.log(table);
            anotherAction()
        });
    };
    viewRoles(anotherAction) {
        connection.query("SELECT employee.first_name, employee.last_name, roles.title AS Title FROM employee JOIN roles ON employee.role_id = roles.id",
            function (err, res) {
                if (err) throw err;
                let table = consoleTable.getTable(res);
                console.log(table);
                anotherAction()
            });
    };
    viewDepartments(anotherAction) {
        connection.query("SELECT employee.first_name, employee.last_name, department.depName AS Department FROM employee JOIN roles ON employee.role_id = roles.id JOIN department ON roles.department_id = department.id ORDER BY employee.id;",
            function (err, res) {
                if (err) throw err;
                let table = consoleTable.getTable(res);
                console.log(table);
                anotherAction()
            });
    };
    addEmployee(anotherAction) {
        inquirer
            .prompt([
                {
                    name: "first",
                    type: "input",
                    message: "What is the employee's first name?"
                },
                {
                    name: "last",
                    type: "input",
                    message: "What is the employee's last name?"
                }
            ]).then(function (res) {
                const values = [res.first, res.last];
                connection.query("INSERT INTO employee (first_name, last_name) VALUES (?)", [values], function (err, result) {
                    if (err) throw err;
                    anotherAction()
                });
            });
    };
    addRole(anotherAction) {
        connection.query("SELECT roles.title AS Title, roles.salary AS Salary FROM roles", function (err, res) {
            inquirer.prompt([
                {
                    name: "Title",
                    type: "input",
                    message: "What is the Title of new role?"
                },
                {
                    name: "Salary",
                    type: "input",
                    message: "What is the Salary for this Title?"

                }
            ]).then(function (res) {
                connection.query(
                    "INSERT INTO roles SET ?",
                    {
                        title: res.Title,
                        salary: res.Salary,
                    },
                    function (err) {
                        if (err) throw err;
                        let table = consoleTable.getTable(res);
                        console.log(table);
                        anotherAction()
                    }
                )

            });
        });
    }
    addDepartment(anotherAction) {
        connection.query("SELECT department.depName AS Title", function (err, res) {
            inquirer.prompt([
                {
                    name: "Department",
                    type: "input",
                    message: "What is the name of the new department?"
                }
            ]).then(function (res) {
                connection.query(
                    "INSERT INTO department SET ?",
                    {
                        depName: res.Department,
                    },
                    function (err) {
                        if (err) throw err;
                        let table = consoleTable.getTable(res);
                        console.log(table);
                        anotherAction()
                    }
                )

            });
        });
    }

    updateEmployeeRole(anotherAction) {
        let allemp = [];
        connection.query("SELECT * FROM employee", function(err, answer) {
          for (let i = 0; i < answer.length; i++) {
            let employeeString =
              answer[i].id + " " + answer[i].first_name + " " + answer[i].last_name;
            allemp.push(employeeString);
          }
          inquirer
            .prompt([
              {
                type: "list",
                name: "updateEmpRole",
                message: "select employee to update role",
                choices: allemp
              },
              {
                type: "list",
                message: "select new role",
                choices: ["Manager", "Employee"],
                name: "newrole"
              }
            ])
            .then(function(answer) {
              console.log("Update", answer);
              const idUpdate = {};
              idUpdate.employeeId = parseInt(answer.updateEmpRole.split(" ")[0]);
              if (answer.newrole === "Manager") {
                idUpdate.role_id = 1;
              } else if (answer.newrole === "Employee") {
                idUpdate.role_id = 2;
              }
              connection.query( "UPDATE employee SET role_id = ? WHERE id = ?",
                [idUpdate.role_id, idUpdate.employeeId],
                function(err, data) {
                    if (err) throw err;
                   console.log("Change has been made")
                    anotherAction()
            }
              );
            });
        });
      }
}


module.exports = Action;