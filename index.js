const Employee = require('./lib/employee');
const Manager = require('./lib/manager');
const Engineer = require('./lib/engineer');
const Intern = require('./lib/intern');

const Test = new Employee("Bob", 12, "Bob@test.com"); 
const Testtwo = new Engineer("sally", 12, "Sally@test.com", "S25@github.io");
const Testthree = new Manager("Mai", 23, "Mai@test.com", "Building 3");
const Testfour = new Intern("Fry", 31, "Fry@test.com", "Hardknocks U");

Test.printInfo();
Testtwo.printnewInfo();
Testthree.printnewnewInfo();
Testfour.printnewnewnewInfo();