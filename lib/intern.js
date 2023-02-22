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
}

module.exports = Intern;