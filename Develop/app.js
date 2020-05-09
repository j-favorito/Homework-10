const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");

const newEmployees = [];

// Write code to use inquirer to gather information about the development team members,
function getInfo() {
    //placeholders
    let newName = "John Doe";
    let newEmail = "johndoe@gmail.com";
    let newId = "0";
    let newSchool = "Hogwarts";
    let newOffice = "0";
    let newGit = "john-doe"
    //asks wheter or not to add an employee
    inquirer
        .prompt(
            {
                type: 'list',
                name: 'add',
                message: 'Would you like to add an Employee?',
                choices: ['Yes', 'No'],
            }
        )
        .then(function (response) {
            //if no test.html is written and program is ended
            if (response.add == 'No') {
                fs.writeFile("team.html", render(newEmployees), function (err) { if (err) throw err })
            }
            //if yes user is asked which role the employee fills
            if (response.add == 'Yes') {
                inquirer
                    .prompt([{
                        type: 'list',
                        name: 'role',
                        message: 'What Role does this employee fulfill?',
                        choices: ['Manager', 'Engineer', 'Intern'],
                    },
                    //questions that relate to all roles
                    {
                        name: 'name',
                        message: `What is the employee's name?`,
                    }, {
                        name: 'email',
                        message: `What is the employee's email`,
                    }, {
                        name: 'id',
                        message: `What is the employee's ID number?`,
                    }])
                    .then(function (answer) {
                        newName = answer.name;
                        newEmail = answer.email;
                        newId = answer.id;
                        //if response is manager
                        if (answer.role == 'Manager') {
                            inquirer
                                .prompt({
                                    name: 'office',
                                    message: "What is the Manager's office number?"
                                })
                                .then(function (number) {
                                    newOffice = number.office;
                                    const newEmployee = new Manager(newName, newEmail, newId, newOffice);
                                    newEmployees.push(newEmployee);
                                    getInfo();
                                });
                        }
                        //is response is engineer
                        if (answer.role == 'Engineer') {
                            inquirer
                                .prompt({
                                    name: 'github',
                                    message: "What is the Engineer's github username?"
                                })
                                .then(function (username) {
                                    newGit = username.github;
                                    const newEmployee = new Engineer(newName, newEmail, newId, newGit);
                                    newEmployees.push(newEmployee);
                                    getInfo();
                                });
                        }
                        //if response is intern
                        if (answer.role == 'Intern') {
                            inquirer
                                .prompt({
                                    name: 'school',
                                    message: "Where does the intern attend school?"
                                })
                                .then(function (res) {
                                    newSchool = res.school;
                                    const newEmployee = new Intern(newName, newEmail, newId, newSchool);
                                    newEmployees.push(newEmployee);
                                    getInfo()
                                });
                        }
                    })
            }
        });
}
function init() {
    getInfo();
}

init();
// and to create objects for each team member (using the correct classes as blueprints!)

// After the user has input all employees desired, call the `render` function (required
// above) and pass in an array containing all employee objects; the `render` function will
// generate and return a block of HTML including templated divs for each employee!

// After you have your html, you're now ready to create an HTML file using the HTML
// returned from the `render` function. Now write it to a file named `team.html` in the
// `output` folder. You can use the variable `outputPath` above target this location.
// Hint: you may need to check if the `output` folder exists and create it if it
// does not.

// HINT: each employee type (manager, engineer, or intern) has slightly different
// information; write your code to ask different questions via inquirer depending on
// employee type.

// HINT: make sure to build out your classes first! Remember that your Manager, Engineer,
// and Intern classes should all extend from a class named Employee; see the directions
// for further information. Be sure to test out each class and verify it generates an
// object with the correct structure and methods. This structure will be crucial in order
// for the provided `render` function to work! ```
