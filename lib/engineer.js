const Employee = require('./employee');
const Index = require('../index');

class Engineer extends Employee {
    constructor(name, id, email, github, role) {
        super(name, id, email);
        this.role = "Engineer";
        this.name = name;
        this.id = id;
        this.email = email;
        this.github = github;
    }
    printnewInfo() {
        console.log(this.name);
        console.log(this.id);
        console.log(this.email);
        console.log(this.github);
        console.log(this.role);
    }
    buildEngineer(){
        inquirer
                .prompt([
                {
                type: "input",
                name: "name",
                message: "What is the Engineer's name?",
                validate: val => /[a-z1-9]/gi.test(val),          
                },
                {
                type: 'input',
                message: "What is the Engineer's ID number?",
                name: "idnumber",
                validate: val => /[a-z1-9]/gi.test(val),
                },
                {
                type: 'input',
                message: "What is the Engineer's email address?",
                name: "email",
                },
                {
                type: 'input',
                message: "What is the Engineer's Github username?",
                name: "github",
                validate: val => /[a-z1-9]/gi.test(val),
                },
                ])
                .then((response) => {
                    new Engineer(response.name, response.idnumber, response.email, response.github);
                    index.addanotherPerson();
                })
    }
}

module.exports = Engineer;