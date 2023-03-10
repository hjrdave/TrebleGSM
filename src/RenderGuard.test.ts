import RenderGuard from "./RenderGuard";

describe("Compare primitive types with isEquals Method", () => {
    it("compares should evaluate to true", () => {
        const compareStrings = { value1: "Foo", value2: "Foo" }
        const compareBooleans = { value1: true, value2: true }
        const compareNumbers = { value1: 100, value2: 100 }
        expect(RenderGuard.isEquals(compareStrings.value1, compareStrings.value2)).toBe(true);
        expect(RenderGuard.isEquals(compareBooleans.value1, compareBooleans.value2)).toBe(true);
        expect(RenderGuard.isEquals(compareNumbers.value1, compareNumbers.value2)).toBe(true);
    });
    it("NULL and UNDEFINED should evaluate to true", () => {
        const compareNull = { value1: null, value2: null }
        const compareUndefined = { value1: undefined, value2: undefined };
        expect(RenderGuard.isEquals(compareNull.value1, compareNull.value2)).toBe(true);
        expect(RenderGuard.isEquals(compareUndefined.value1, compareUndefined.value2)).toBe(true);
    });
});

describe("Compare array values.", () => {
    it("Two states assigned simple arrays should not pass.", () => {
        const array1 = ["foo", "foo2"];
        const array2 = ["foo2", "foo"];
        expect(RenderGuard.compareArrays(array1, array2)).toBe(true);
    });
    it("Two states assigned the same nested arrays should not pass.", () => {
        const array1 = [["foo", "foo2"], ["fee", "fee2"]];
        const array2 = [["fee", "fee2"], ["foo", "foo2"]];
        expect(RenderGuard.compareArrays(array1, array2)).toBe(true);
    });
    it("Two states assigned object arrays should not pass.", () => {
        const array1 = [{ foo: "foo" }, { foo: "fee" }];
        const array2 = [{ foo: "fee" }, { foo: "foo" }];
        expect(RenderGuard.compareArrays(array1, array2)).toBe(true);
    });
});

describe("Shallow compare object values.", () => {
    it("Two objects with same values should validate to true", () => {
        const object1 = { foo: "foo", foo2: "fee" };
        const object2 = { foo2: "fee", foo: "foo" };
        expect(RenderGuard.shallowCompare(object1, object2)).toBe(true);
    });
    it("Two objects with nested object values should validate to false", () => {
        const object1 = { foo: ["foo"], foo2: ["fee"] };
        const object2 = { foo2: ["fee"], foo: ["foo"] };
        expect(RenderGuard.shallowCompare(object1, object2)).toBe(false);
    });
});

describe("Deep compare object values.", () => {
    it("Two objects with same nested object and values should validate to true", () => {
        const object1 = { foo: { fee: "moo", pho: "mee" }, foo2: [{ fee: "moo", pho: { pho1: "pho", pho2: "pho1" } }] };
        const object2 = { foo2: [{ fee: "moo", pho: { pho1: "pho", pho2: "pho1" } }], foo: { fee: "moo", pho: "mee" } };
        expect(RenderGuard.deepCompare(object1, object2)).toBe(true);
    });
});