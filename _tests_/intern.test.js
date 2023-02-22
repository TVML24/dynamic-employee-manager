const intern = require('../lib/intern');

describe("Intern Class", () => {
    describe("Constructor Function", () => {
      it("Creates an object with the required properties based on input", () => {
        const testintern = new intern ("Rick", 33, "Rick@gmail.com", "Hard Knocks University");
        expect(testintern.name).toEqual("Rick");
        expect(testintern.id).toBe(33);
        expect(testintern.email).toEqual("Rick@gmail.com");
        expect(testintern.school).toEqual("Hard Knocks University");
        expect(testintern.role).toEqual("Intern");
      });
    })
})