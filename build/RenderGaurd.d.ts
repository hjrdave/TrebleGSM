import { Types } from "./TypeGaurd";
export default class RenderGuard {
    static isEquals: (value: any, value2: any) => boolean;
    static compareArrays: (arr: any[], arr2: any[]) => boolean;
    static shallowCompare: (obj1: {
        [key: string]: any;
    }, obj2: {
        [key: string]: any;
    }) => boolean;
    static deepCompare: (obj1: {
        [key: string]: any;
    }, obj2: {
        [key: string]: any;
    }) => boolean;
    static stateCanRender: (value?: any, value2?: any, type?: Types) => boolean;
    constructor();
}
