import TypeGuard from './TypeGuard';

describe("Test number type check", () => {
    it("Should return true for a normal number", () => {
        const value = 5;
        expect(TypeGuard.isNumber(value)).toBe(true);
    });
    it("Should return true for a 0 number", () => {
        const value = 0;
        expect(TypeGuard.isNumber(value)).toBe(true);
    });
    it("Should return false for a null or undefined", () => {
        const value = null;
        const value2 = undefined;
        expect(TypeGuard.isNumber(value)).toBe(false);
        expect(TypeGuard.isNumber(value2)).toBe(false);
    });
    it("Should return false for a NaN", () => {
        const value = NaN;
        expect(TypeGuard.isNumber(value)).toBe(false);
    });
});

describe("Test string type check", () => {
    it("Should return true for a normal string", () => {
        const value = "Foo";
        expect(TypeGuard.isString(value)).toBe(true);
    });
    it("Empty string should evaluate to string", () => {
        const value = "";
        expect(TypeGuard.isString(value)).toBe(true);
    });
    it("Number string should evaluate to string", () => {
        const value = "4";
        expect(TypeGuard.isString(value)).toBe(true);
    });
    it("JSON string should evaluate to string", () => {
        const value = JSON.stringify({ foo: 5, foo2: "moo" });
        expect(TypeGuard.isString(value)).toBe(true);
    });
    it("A non string should return false", () => {
        const number = 4;
        const bool = true;
        const object = {};
        const array = ["foo"];
        const nullValue = null;
        const undefinedValue = undefined;
        expect(TypeGuard.isString(number)).toBe(false);
        expect(TypeGuard.isString(bool)).toBe(false);
        expect(TypeGuard.isString(object)).toBe(false);
        expect(TypeGuard.isString(array)).toBe(false);
        expect(TypeGuard.isString(nullValue)).toBe(false);
        expect(TypeGuard.isString(undefinedValue)).toBe(false);
    })
});

describe("Test boolean type check", () => {
    it("Should return true for if boolean type", () => {
        const value = true;
        const value2 = false;
        expect(TypeGuard.isBoolean(value)).toBe(true);
        expect(TypeGuard.isBoolean(value2)).toBe(true);
    });
    it("Null and undefined should return false", () => {
        const value = null;
        const value2 = undefined;
        expect(TypeGuard.isBoolean(value)).toBe(false);
        expect(TypeGuard.isBoolean(value2)).toBe(false);
    })
});

describe("Test object type check", () => {
    it("Simple objects should evaluate as object type", () => {
        const value = {};
        expect(TypeGuard.isObject(value)).toBe(true);
    });
    it("Map and Set should evaluate as object type", () => {
        const value = new Map();
        const value2 = new Set();
        expect(TypeGuard.isObject(value)).toBe(true);
        expect(TypeGuard.isObject(value2)).toBe(true);
    });
    it("Array should NOT evaluate as object type", () => {
        const value: any[] = [];
        expect(TypeGuard.isObject(value)).toBe(false);
    });
    it("NULL should NOT evaluate as object type", () => {
        const value = null;
        expect(TypeGuard.isObject(value)).toBe(false);
    });
});

describe("Test Array type check", () => {
    it("Array should evaluate as array type", () => {
        const value: any[] = [];
        expect(TypeGuard.isArray(value)).toBe(true);
    });
    it("NULL should NOT evaluate as array type", () => {
        const value = null;
        expect(TypeGuard.isArray(value)).toBe(false);
    });
});