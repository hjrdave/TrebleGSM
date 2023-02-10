

export type Types = 'number' | 'string' | 'boolean' | 'object' | 'deepObject' | 'array' | 'null';

export default class TypeGuard {

    public static isNumber = (value: any) => {
        return typeof value === 'number';
    }

    public static isString = (value: any) => {
        return typeof value === 'string';
    }

    public static isBoolean = (value: any) => {
        return typeof value === 'boolean';
    }

    public static isObject = (value: any) => {
        return typeof value === 'object' && value !== null && !Array.isArray(value);
    }

    public static isArray = (value: any) => {
        return Array.isArray(value);
    }

    public static isNull = (value: any) => {
        return value === null;
    }

    public static isCorrectType = (value: any, type?: Types) => {
        if (type !== undefined) {
            const types = {
                'number': () => (TypeGuard.isNumber(value)),
                'string': () => (TypeGuard.isString(value)),
                'boolean': () => (TypeGuard.isBoolean(value)),
                'object': () => (TypeGuard.isObject(value)),
                'deepObject': () => (TypeGuard.isObject(value)),
                'array': () => (TypeGuard.isArray(value)),
                'null': () => (TypeGuard.isNull(value))
            }
            return types[type]();
        } else {
            return true;
        }
    }
};


