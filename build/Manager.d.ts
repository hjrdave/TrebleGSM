import Inventory from "./Inventory";
export default class Manager<T> {
    private inventory;
    get: (key: string) => T | undefined;
    add: (key: string, value: any) => void;
    update: (key: string, value: any) => void;
    remove: (key: string) => boolean;
    removeAll: () => void;
    getItems: () => [any, any][];
    has: (key: string) => boolean;
    forEach: (predicateFN: (value: any, key: string) => void) => void;
    constructor(inventory: Inventory<T>);
}
