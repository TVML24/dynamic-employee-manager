const engineer = require('../lib/engineer');

describe("Engineer Class", () => {
    describe("Constructor Function", () => {
      it("Creates an object with the required properties based on input", () => {
        const testengineer = new engineer ("Tom", 23, "Tom@gmail.com", "TommmyGH");
        expect(testengineer.name).toEqual("Tom");
        expect(testengineer.id).toBe(23);
        expect(testengineer.email).toEqual("Tom@gmail.com");
        expect(testengineer.github).toEqual("TommmyGH");
        expect(testengineer.role).toEqual("Engineer");
      });
    })
})