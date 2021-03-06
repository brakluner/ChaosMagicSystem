var mysql = require("mysql");
var inquirer = require("inquirer");
var consoletable = require("console.table");

var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "",
    database: "CMS_db"
  });

connection.connect(function(err) {
  if (err) throw err;
  console.log("connected as id " + connection.threadId);
  console.log('HI');
  start();
});

function start() {
    inquirer
        .prompt([
            {
                name: "selection",
                type: "list",
                message: "Main Menu",
                choices: ["Add Department",
                         "Add Employee",
                         "Add Role",
                         "View Departments",
                         "View Employees",
                         "View Roles",
                         "Update Employee Role by ID",
                         "Update Employee Manager by ID"
            ]
            }
        ]).then(function(answer) {
   if (answer.selection === "Add Department") {
    createDepartment();
}   else if (answer.selection === "Add Employee") {
    createEmployee();
}   else if (answer.selection === "Add Role") {
    createRole();
}   else if (answer.selection === "View Departments") {
    viewDepartments();
}   else if (answer.selection === "View Employees") {
    viewEmployee();
}   else if (answer.selection === "View Roles") {
    viewRoles();
}   else if (answer.selection === "Update Employee Role by ID") {
    updateRole();
}   else if (answer.selection === "Update Employee Manager by ID") {
    updateManager();
};
});

function createRole() {

    inquirer
        .prompt([
            {
                name: "title",  
                type: "input",
                message: "What Employee Role would you like to add"
            },
            {
                name: "salary",
                type: "input",
                message: "How much is this role's salary"
            },
            {
                name: "department_id",
                type: "input",
                message: "What is the department id of this role (numbers only)",
            }
        ]).then(function(rosterList) {
            connection.query("INSERT INTO role SET ?", 
        
            {
                title: rosterList.title,
                salary: rosterList.salary,
                department_id: rosterList.department_id
            },
        function (err, res) {
            if (err) throw err;
            console.log(res);
            start();
        })
    
})
};

function createDepartment() {

    inquirer
        .prompt([
            {
                name: "name",
                type: "input",
                message: "What is the department?",
            }
        ]).then(function(rosterList) {
            connection.query("INSERT INTO department SET ?", 
        
            {
                name: rosterList.name
            },
        function (err, res) {
            if (err) throw err;
            console.log(res);
            start();
        })
    
})
};

function createEmployee() {

    inquirer
        .prompt([
            {
                name: "first_name",  
                type: "input",
                message: "What is your first name?"
            },
            {
                name: "last_name",  
                type: "input",
                message: "What is your last name?"
            },
            {
                name: "role_id",
                type: "input",
                message: "give us your role id  (numbers only)"
            },
            {
                name: "manager_id",
                type: "input",
                message: "Now we need your manager's id,... Puhleeeze...(numbers only)",
            }
        ]).then(function(rosterList) {
            connection.query("INSERT INTO employee SET ?", 
        
            {
                first_name: rosterList.first_name,
                last_name: rosterList.last_name,
                role_id: rosterList.role_id,
                manager_id: rosterList.manager_id
            },
        function (err, res) {
            if (err) throw err;
            console.log(res);
            start();
        })
    
})
}

function viewDepartments () {
    let sql = "SELECT * FROM department";

    connection.query(sql, function(err, res) {
        if (err) throw err;
        console.table(res);
        start();
    })
}

function viewRoles () {
    let sql = "SELECT * FROM role";

    connection.query(sql, function(err, res) {
        if (err) throw err;
        console.table(res);
        start();
    })
}

function viewEmployee () {
    let sql = "SELECT * FROM employee";

    connection.query(sql, function(err, res) {
        if (err) throw err;
        console.table(res);
        start();
    })
}

function updateRole() {
    let employList = "SELECT * FROM employee";

    connection.query(employList, function(err, res1) {
        if (err) throw err;
    console.table(res1)

    //for ( i = 0 ; i < res1.length; i++){
    
    //console.log(res1[i].id)
    
    let slot = res1.map(function (slit, index, array) {
        return slit.id; 
      });
      console.log(slot);
    //}
    
        
        //console.log(splot)

        //var slot = JSON.stringify(res1)
    
    
    console.log(slot)
    //     name: res1[0].first_name + res1[0].last_name,
    //     value: {
    //         id: res1[0].id,
    //     }
    // }
    //Object.values(slot);
    
    //slot.push(res1)
    //console.log(res1)
    // }
    
    
    inquirer
        .prompt([
            {
                name: "selection",
                type: "list",
                message: "Choose Employee by Id",
                choices: slot
            },
      
    
                     {
                         name: 'Decision',
                         type: "input",
                         message: "What do you want to change the employee role to. Please specify by Role id#"
                     }
                    
                 ]).then(function(answer) {
                 
    var sql = "UPDATE employee SET role_id ="+answer.Decision+" WHERE id ="+answer.selection

    connection.query(sql, function(err, res2) {
        if (err) throw err;
        console.table(res2);
        start();
    })

        })
       
    })
}

function updateManager() {
    let employList = "SELECT * FROM employee";

    connection.query(employList, function(err, res1) {
        if (err) throw err;
    console.table(res1)
    
    let slot = res1.map(function (slit, index, array) {
        return slit.id; 
      });
      console.log(slot);
    
    console.log(slot)
    
    inquirer
        .prompt([
            {
                name: "selection",
                type: "list",
                message: "Choose Employee by Id",
                choices: slot
            },
      
    
                     {
                         name: 'Decision',
                         type: "input",
                         message: "What do you want to change the employee's Manager to. Please specify by Managers id#"
                     }
                    
                 ]).then(function(answer) {
                 
    var sql = "UPDATE employee SET manager_id ="+answer.Decision+" WHERE id ="+answer.selection

    connection.query(sql, function(err, res2) {
        if (err) throw err;
        console.table(res2);
        start();
    })

        })
       
    })
}
}

