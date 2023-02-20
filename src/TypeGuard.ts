export enum Types {
    number = 'number',
    string = 'string',
    boolean = 'boolean',
    object = 'object',
    deepObject = 'deepObject',
    array = 'array'
}

export default class TypeGuard {

    public static isNumber = (value: any) => {
        return typeof value === Types.number;
    }

    public static isString = (value: any) => {
        return typeof value === Types.string;
    }

    public static isBoolean = (value: any) => {
        return typeof value === Types.boolean;
    }

    public static isObject = (value: any) => {
        return typeof value === Types.object && value !== null && !Array.isArray(value);
    }

    public static isArray = (value: any) => {
        return Array.isArray(value);
    }

    public static isNull = (value: any) => {
        return value === null;
    }

    public static isCorrectType = (value: any, type?: keyof typeof Types) => {
        if (type !== undefined) {
            const types = {
                [Types.number]: () => (TypeGuard.isNumber(value)),
                [Types.string]: () => (TypeGuard.isString(value)),
                [Types.boolean]: () => (TypeGuard.isBoolean(value)),
                [Types.object]: () => (TypeGuard.isObject(value)),
                [Types.deepObject]: () => (TypeGuard.isObject(value)),
                [Types.array]: () => (TypeGuard.isArray(value))
            }
            return types[type]();
        } else {
            return true;
        }
    }
};


