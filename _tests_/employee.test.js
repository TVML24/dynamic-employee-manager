const employee = require('../lib/employee');

describe("Employee Class", () => {
    describe("Constructor Function", () => {
      it("Creates an object with the required properties based on input", () => {
        const testemployee = new employee ("Bob", 13, "Bob@gmail.com");
        expect(testemployee.name).toEqual("Bob");
        expect(testemployee.id).toBe(13);
        expect(testemployee.email).toEqual("Bob@gmail.com");
      });
    })
})