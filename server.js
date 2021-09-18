const inquirer = require("inquirer");
const util = require("util");
const connection = require("./config/connection");

const consoleTable = require("console.table");

const start = async () => {
    inquirer
    .prompt([
      {
        name: "purpose",
        type: "list",
        choices: [
          "View all Employees",
          "View all Departments",
          "View all Roles",
          "Add Employee",
          "Add a Department",
          "Add a Role",
          "Update an Employee Role",
          "Exit"
        ],
        message: "What would you like to do?",
      },
    ])
    .then((data) => {
  
  
      if (data.purpose === "View all Employees") {
        viewEmployees();
        // return start()
      }
  
      else if (data.purpose === "View all Departments") {
        viewDepartments();
        // return start()
      }
  
      else if (data.purpose === "View all Roles") {
        viewRoles();
        // return start()
      }
  
      else if (data.purpose === "Add Employee") {
        addEmployee();
        // return start()
      }
  
      else if (data.purpose === "Update an Employee Role") {
        updateRole();
        // return start()
      }

      else if (data.purpose === "Add a Department") {
        addDepartment();
      }

      else if (data.purpose === "Add a Role") {
        addRole();
      }

      else {
        console.log("All done!")
        return
      }
    });  
};

// view all departments
const viewDepartments = () => {
  connection.query("SELECT * FROM department", function (err, results) {
    if (err) throw err;
    console.table(results);
    start()
  });
};

// view all roles,
const viewRoles = () => {
  connection.query("SELECT * FROM role", function (err, results) {
    if (err) throw err;
    console.table(results);
    start()
  });
};

// view all employeess,
const viewEmployees = () => {
  connection.query("SELECT * FROM employee", function (err, results) {
    if (err) throw err;
    console.table(results);
    start()
  });
};

// add a department,
const addDepartment = async () => {
  let answer = await inquirer.prompt([
    {
      name: "departmentName",
      type: "input",
      message: "What would you like to name this department? ",
    },
  ]);

  let result = await connection.query("INSERT INTO department SET ?", {
    name: answer.departmentName,
  });

  console.log(
    `${answer.departmentName} has been added to the department list.\n`
  );
  start()
};

// add an employee

const addEmployee = () => {
  connection.query("SELECT * FROM role", async (err, data) => {
    console.table(data);

    let answer = await inquirer.prompt([
      {
        name: "firstName",
        type: "input",
        message: "What is the first name of the employee?",
      },
      {
        name: "lastName",
        type: "input",
        message: "What is the last name of the employee?",
      },
      {
        name: "employeeRoleId",
        type: "list",
        choices: () => {
          return data.map((role) => {
            return {
              name: role.title,
              value: role.id,
            };
          });
        },
        message: "What is the role of the employee you would like to add?",
      },
    ]);

    connection.query("SELECT * FROM employee", async (err, employeeData) => {
      const managerIds = [];
      const managers = [];

      employeeData.map((employee) => {
        if (
          employee.manager_id !== null &&
          managerIds.indexOf(employee.manager_id) === -1
        ) {
          managerIds.push(employee.manager_id);
        }
      });

      employeeData.map((manager) => {
        if (
          managers.indexOf(manager.id) === -1 &&
          managerIds.indexOf(manager.id) !== -1
        ) {
          managers.push(manager);
        }
      });

      

      let manager_id = await inquirer.prompt([
        {
          name: "employeeManagerId",
          type: "list",
          choices: () =>
            managers.map((manager) => {
              return {
                name: manager.first_name + " " + manager.last_name,
                value: manager.id,
              };
            }),
          message: "Who is this employee's manager?",
        },
      ]);

      answer.employeeManagerId = manager_id.employeeManagerId;

      let result = await connection.query("INSERT INTO employee SET ?", {
        first_name: answer.firstName,
        last_name: answer.lastName,
        role_id: answer.employeeRoleId,
        manager_id: answer.employeeManagerId,
      });

      console.log(
        `${answer.firstName} ${answer.lastName} was added to the employee list.\n`
      );

      start()
    });
  }); //storing all roles to be called

  // let managers = await

  // connection.query("SELECT * FROM employee", (err, data) =>{
  //     console.log("------------------------------------------------") //now we know where exactly the new role is gonna be, which is everything in between these long lines of dashes
  //     console.log(data)
  //     console.log("------------------------------------------------")
  // }); //storing all employees to be called
};

// add a role,
const addRole = async () => {
  try {
    connection.query("SELECT * FROM department", async function(err,departments) {

        let answer = await inquirer.prompt([
          {
            name: "title",
            type: "input",
            message: "What would you like to call this role?",
          },
          {
            name: "salary",
            type: "input",
            message: "What is the estimated salary range for this type of role?",
          },
          {
            name: "departmentId",
            type: "list",
            
            choices: () =>
            departments.map((departmentId) => {
              return {
                name: departmentId.name,
                value: departmentId.id,
              };
            }),
            message: "What department will this role be assigned to?",
          },
        ]);
    
        let selectedDepartment;
        for (i = 0; i < departments.length; i++) {
          if (departments[i].department_id === answer.choice) {
            selectedDepartment = departments[i];
          }
        }
        let result = await connection.query("INSERT INTO role SET ?", {
          title: answer.title,
          salary: answer.salary,
          department_id: answer.departmentId,
        });
    
        console.log(`${answer.title} has been added to the roles section.\n`);
        // prompts();
        start()
    });
    
  } catch (err) {
    console.log(err);
    // prompts();
  }

  
};

// update an employee role

const updateRole = async () => {
  connection.query("SELECT * FROM employee", async(err, data) => {
    let employee_id = await inquirer.prompt([
      {
        name: "id",
        type: "list",
        choices: () =>
          data.map((employee) => {
            return {
              name: employee.first_name + " " + employee.last_name,
              value: employee.id,
            };
          }),
        message: "Which employee's role would you like to update?",
      },
    ]);

    connection.query("SELECT * FROM role", async(err, roles) => {
      let employee_role = await inquirer.prompt([
        {
          name: "role_id",
          type: "list",
          choices: () =>
            roles.map((role) => {
              return {
                name: role.title,
                value: role.id,
              };
            }),
          message:
            "What is the new role you would like to assign to this employee?",
        },
      ]);

    await connection.query("UPDATE employee SET role_id = ? WHERE id = ?", [employee_role.role_id, employee_id.id])
    console.log("Employee Updated Successfully")
    start()
    });
  });
};

start()