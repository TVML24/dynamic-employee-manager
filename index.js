const Employee = require('./lib/employee');
const Manager = require('./lib/manager');
const Engineer = require('./lib/engineer');
const Intern = require('./lib/intern');
const inquirer = require('inquirer');
const fs = require('fs');

// holder arrays for the constructed objects
var managerArray = [];
var engineersArray = [];
var internsArray = [];

// Class that does the heavy lifting
class inquirerCompiler {
    constructor() {
        this.numCards = 0;
      }
    prepare() {
        this.numCards++;
        this.askforInfo();
    }
    askforInfo() {
        if (this.numCards <= 1) {
            inquirer
                .prompt([
                {
                type: "input",
                name: "name",
                message: "What is the Team Manager's name?",
                validate: val => /[a-z1-9]/gi.test(val),          
                },
                {
                type: 'input',
                message: "What is the Team Manager's employee ID number?",
                name: "idnumber",
                validate: val => /[a-z1-9]/gi.test(val),
                },
                {
                type: 'input',
                message: "What is the Team Manager's email address?",
                name: "email",
                },
                {
                type: 'input',
                message: "What is the Team Manager's building number?",
                name: "building",
                validate: val => /[a-z1-9]/gi.test(val),
                },
                ])
            .then((response) => {
                let tempmanager = new Manager(response.name, response.idnumber, response.email, response.building);
                managerArray.push(tempmanager);
                this.addanotherPerson();
            })
        } else {
            inquirer
                .prompt([
                {
                type: 'list',
                message: "What role does this person hold?",
                name: "selectrole",
                choices: ['Engineer', 'Intern'],
                },
                ])
                .then ((response) => {
                    if (response.selectrole === "Engineer") {
                        this.buildEngineer();
                    } else if (response.selectrole === "Intern") {
                        this.buildIntern();
                    }
                })
        }
    }
    buildEngineer() {
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
                let tempEngineer = new Engineer(response.name, response.idnumber, response.email, response.github);
                engineersArray.push(tempEngineer);
                this.addanotherPerson();
            })
    }
    buildIntern() {
        inquirer
            .prompt([
            {
            type: "input",
            name: "name",
            message: "What is the Intern's name?",
            validate: val => /[a-z1-9]/gi.test(val),          
            },
            {
            type: 'input',
            message: "What is the Intern's ID number?",
            name: "idnumber",
            validate: val => /[a-z1-9]/gi.test(val),
            },
            {
            type: 'input',
            message: "What is the Intern's email address?",
            name: "email",
            },
            {
            type: 'input',
            message: "What is the Intern's School?",
            name: "school",
            validate: val => /[a-z1-9]/gi.test(val),
            },
            ])
            .then((response) => {
                let tempIntern = new Intern(response.name, response.idnumber, response.email, response.school);
                internsArray.push(tempIntern);
                this.addanotherPerson();
            })
    }
    addanotherPerson() {
        inquirer
            .prompt([
            {
            type: 'list',
            message: "Would you like to add another person?",
            name: "addanother",
            choices: ['Yes', 'No'],
            },
            ])
            .then ((response) => {
                if (response.addanother === "Yes") {
                    this.prepare();
                } else if (response.addanother === "No") {
                    this.generateHTML();
                }
            })
    }
    generateHTML() {
        var texttoRender = 
        `<!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta http-equiv="X-UA-Compatible" content="IE=edge">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Employee Taskcards</title>
            <link rel="stylesheet" href="./assets/style.css">
        </head>
        <body>
            <header>
                <div id="heading-div">
                    <h1>My Team</h1>
                </div>
            </header>
            <main>
                <div id="flex-container">`;
        texttoRender += this.generatemanagerCard();
        texttoRender += this.generateengineerCards();
        texttoRender += this.generateinternCards();
        texttoRender += 
        `
            </div>
            </main>
        </body>
        </html>`;
        this.buildPage(texttoRender);
    }
    generatemanagerCard() {
        var theManager = managerArray[0]; 
            let tempText = 
        `
        <div class="card">
            <div class="card-header">
                <h2>${theManager.name}</h2>
                <h2>${theManager.role}</h2>
            </div>
            <div class="card-body">
                <div class="id-div">
                    <p>${theManager.id}</p>
                </div>
                <div class="email-div">
                    <a href = "mailto:${theManager.email}">${theManager.email}</a>
                </div>
                <div class="extra">
                    <p>${theManager.officeBuilding}</p>
                </div>
            </div>
        </div>`;
        return tempText;
    }
    generateengineerCards() {
        var tempengcards = "";
        if (engineersArray.length === 0) {
            return tempengcards;
        } else {
        for (var i=0; i < engineersArray.length; i++) {
            var selectedEngineer = engineersArray[i];
            tempengcards +=         
        `
        <div class="card">
            <div class="card-header">
                <h2>${selectedEngineer.name}</h2>
                <h2>${selectedEngineer.role}</h2>
            </div>
            <div class="card-body">
                <div class="id-div">
                    <p>${selectedEngineer.id}</p>
                </div>
                <div class="email-div">
                    <a href="mailto:${selectedEngineer.email}">${selectedEngineer.email}</a>
                </div>
                <div class="extra">
                    <a href="https://github.com/${selectedEngineer.github}">${selectedEngineer.github}</a>
                </div>
            </div>
        </div>`;
        }
        return tempengcards;
        }
    }
    generateinternCards() {
        var tempinterncards ="";
        if (internsArray.length === 0) {
            return tempinterncards;
        } else {
            for (var i=0; i < internsArray.length; i++) {
                var selectedIntern = internsArray[i];
                tempinterncards +=         
            `
            <div class="card">
                <div class="card-header">
                    <h2>${selectedIntern.name}</h2>
                    <h2>${selectedIntern.role}</h2>
                </div>
                <div class="card-body">
                    <div class="id-div">
                        <p>${selectedIntern.id}</p>
                    </div>
                    <div class="email-div">
                        <a href= "mailto:${selectedIntern.email}">${selectedIntern.email}</a>
                    </div>
                    <div class="extra">
                        <p>${selectedIntern.school}</p>
                    </div>
                </div>
            </div>`;
            }
            return tempinterncards;
        }
    }
    buildPage(texttoRender) {
        fs.writeFile('generatedpage.html', texttoRender, (err) =>
        err ? console.error(err) : console.log('Success!')
      );
      
    }
}

    

    


const inquirerStart = new inquirerCompiler();
inquirerStart.prepare();

module.exports = inquirerCompiler; 

// Test.printInfo();
// Testtwo.printnewInfo();
// Testthree.printnewnewInfo();
// Testfour.printnewnewnewInfo();