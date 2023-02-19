const Employee = require('./employee');

class Intern extends Employee {
    constructor(name, id, email, school, role) {
        super(name, id, email);
        this.role = "Intern";
        this.name = name;
        this.id = id;
        this.email = email;
        this.school = school;
    }
    printnewnewnewInfo() {
        console.log(this.name);
        console.log(this.id);
        console.log(this.email);
        console.log(this.school);
        console.log(this.role);
    }
}

module.exports = Intern;