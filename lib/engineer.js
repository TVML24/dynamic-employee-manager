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
}

module.exports = Engineer;