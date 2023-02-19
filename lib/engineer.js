const Employee = require('./employee');

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
}

module.exports = Engineer;