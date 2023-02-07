export type Types = 'number' | 'string' | 'boolean' | 'object' | 'deepObject' | 'array' | 'null';
export default class TypeGuard {
    static isNumber: (value: any) => boolean;
    static isString: (value: any) => boolean;
    static isBoolean: (value: any) => boolean;
    static isObject: (value: any) => boolean;
    static isArray: (value: any) => boolean;
    static isNull: (value: any) => boolean;
    static isCorrectType: (value: any, type?: Types) => boolean;
}
