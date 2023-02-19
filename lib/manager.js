const Employee = require('./employee');

class Manager extends Employee {
    constructor(name, id, email, officeBuilding, role) {
        super(name, id, email);
        this.role = "Manager";
        this.name = name;
        this.id = id;
        this.email = email;
        this.officeBuilding = officeBuilding;
    }
    printnewnewInfo() {
        console.log(this.name);
        console.log(this.id);
        console.log(this.email);
        console.log(this.officeBuilding);
        console.log(this.role);
    }
}


module.exports = Manager;