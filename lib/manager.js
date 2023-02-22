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
}

module.exports = Manager;