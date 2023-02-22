const manager = require('../lib/manager');

describe("Manager Class", () => {
    describe("Constructor Function", () => {
      it("Creates an object with the required properties based on input", () => {
        const testManager = new manager ("Michelle", 1, "Michelle@gmail.com", 4);
        expect(testManager.name).toEqual("Michelle");
        expect(testManager.id).toBe(1);
        expect(testManager.email).toEqual("Michelle@gmail.com");
        expect(testManager.officeBuilding).toEqual(4);
        expect(testManager.role).toEqual("Manager");
      });
    })
})