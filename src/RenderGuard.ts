import { Types } from "./TypeGuard";
export default class RenderGuard {

    //primitive compare
    public static isEquals = (value: any, value2: any) => {
        return value !== value2;
    }

    //compares two arrays to see if they are equal (works even if item order is different)
    public static compareArrays = (arr: any[], arr2: any[]) => {
        if (arr.length !== arr2.length) return false;

        const aSorted = arr.slice().sort();
        const bSorted = arr2.slice().sort();

        for (let i = 0; i < aSorted.length; i++) {
            if (aSorted[i] !== bSorted[i]) return false;
        }

        return true;
    }

    //does a shallow compare of two objects and their properties
    public static shallowCompare = (obj1: { [key: string]: any }, obj2: { [key: string]: any }) => {
        const aKeys = Object.keys(obj1);
        const bKeys = Object.keys(obj2);
        if (aKeys.length !== bKeys.length) {
            return false;
        }
        for (const key of aKeys) {
            if (obj1[key] !== obj2[key]) {
                return false;
            }
        }
        return true;
    }

    //does a deep compare of two objects and their properties
    public static deepCompare = (obj1: { [key: string]: any }, obj2: { [key: string]: any }) => {
        if (obj1 instanceof Date && obj2 instanceof Date) {
            return obj1.getTime() === obj2.getTime();
        }

        if (!obj1 || !obj2 || typeof obj1 !== Types.object || typeof obj2 !== Types.object) {
            return obj1 === obj2;
        }

        const aKeys = Object.keys(obj1);
        const bKeys = Object.keys(obj2);
        if (aKeys.length !== bKeys.length) return false;

        for (const key of aKeys) {
            if (!bKeys.includes(key) || !RenderGuard.deepCompare(obj1[key], obj2[key])) return false;
        }

        return true;
    }

    public static stateCanRender = (value?: any, value2?: any, type?: keyof typeof Types) => {
        const Guards = {
            [Types.object]: () => (RenderGuard.shallowCompare(value, value2)),
            [Types.deepObject]: () => (RenderGuard.deepCompare(value, value2)),
            [Types.array]: () => (RenderGuard.compareArrays(value, value2)),
            'default': () => (RenderGuard.isEquals(value, value2))
        }
        if (type !== undefined) {
            return (type === Types.object || type === Types.deepObject || type === Types.array) ? Guards[type]() : Guards['default']();
        } else {
            return Guards['default']();
        }
    }
};


