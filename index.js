// required modules
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
// Creates variable numcards that will be used to determine whether to ask about manager or other staff
class inquirerCompiler {
    constructor() {
        this.numCards = 0;
      }
// increases the numcards variable
    prepare() {
        this.numCards++;
        this.askforInfo();
    }
// If numcards is less than or equal to 1 we run an inquirer prompt along with the manager class constructor
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
// we engage the constructor function for manager based on the inputs and push it to an array
// we also call addanotherPerson()
            .then((response) => {
                let tempmanager = new Manager(response.name, response.idnumber, response.email, response.building);
                managerArray.push(tempmanager);
                this.addanotherPerson();
            })
// if numcards is more than one we run an inquirer prompt to decide if we are imputting an intern or engineer
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
// based on the response from inquirer we call buildEngineer() or buildIntern()
                .then ((response) => {
                    if (response.selectrole === "Engineer") {
                        this.buildEngineer();
                    } else if (response.selectrole === "Intern") {
                        this.buildIntern();
                    }
                })
        }
    }
// This runs an inquirer prompt along with the engineer class constructor
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
// we engage the constructor function for engineer based on the inputs and push it to an array
// we also call addanotherPerson()
            .then((response) => {
                let tempEngineer = new Engineer(response.name, response.idnumber, response.email, response.github);
                engineersArray.push(tempEngineer);
                this.addanotherPerson();
            })
    }
// This runs an inquirer prompt along with the intern class constructor
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
// we engage the constructor function for intern based on the inputs and push it to an array
// we also call addanotherPerson()
            .then((response) => {
                let tempIntern = new Intern(response.name, response.idnumber, response.email, response.school);
                internsArray.push(tempIntern);
                this.addanotherPerson();
            })
    }
// This uses an inquirer prompt to ask if the user would like to add another person
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
// if response is yes it pushes the user back up to prepare()
// if response is no it call generateHTML()
            .then ((response) => {
                if (response.addanother === "Yes") {
                    this.prepare();
                } else if (response.addanother === "No") {
                    this.generateHTML();
                }
            })
    }
// this renders the html required
// first it adds the head element and body elements that come prior to the cards
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
// it then adds the return of the generate manager card function
        texttoRender += this.generatemanagerCard();
// it then adds the return of the generate engineer card function
        texttoRender += this.generateengineerCards();
// it then adds the return of the generate intern card function
        texttoRender += this.generateinternCards();
// it then adds the last elements of the html document based on the template in src
        texttoRender += 
        `
            </div>
            </main>
        </body>
        </html>`;
// this text is then passed to buildPage()
        this.buildPage(texttoRender);
    }
// this simply returns html for a card based on contents of the manager array
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
// this returns html for cards based on the contents of the engineersarray based on a for loop
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
// this returns html for cards based on the contents of the internsarray based on a for loop
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
// this builds the html at the end of the process
    buildPage(texttoRender) {
        fs.writeFile('generatedpage.html', texttoRender, (err) =>
        err ? console.error(err) : console.log('Success!')
      );
      
    }
}

// these call the process to begin
const inquirerStart = new inquirerCompiler();
inquirerStart.prepare();

// required module exports
module.exports = inquirerCompiler; 
