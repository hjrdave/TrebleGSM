import Inventory from "./Inventory";
import Error, { ErrorCodes } from "./Error";

export default class Manager<TItem = any, TKey = string> {

    private inventory: Inventory<TItem, TKey>;

    get = (key: TKey) => {
        if (this.inventory.has(key)) {
            return this.inventory.get(key);
        }
        const error = new Error({ code: ErrorCodes.StateDoesNotExist, key: key });
        error.throwConsoleError();
        return undefined;
    }

    add = <TItem = any>(key: TKey, value: TItem) => {
        if (!this.inventory.has(key)) {
            this.inventory.set(key, value);
        } else {
            const error = new Error({ code: ErrorCodes.StateAlreadyExists, key: key });
            error.throwConsoleError();
        }
    }

    update = <TItem = any>(key: TKey, value: TItem) => {
        if (this.inventory.has(key)) {
            this.inventory.set(key, value);
        } else {
            const error = new Error({ code: ErrorCodes.StateDoesNotExist, key: key });
            error.throwConsoleError();
        }
    }

    remove = (key: TKey) => {
        return this.inventory.delete(key);
    }

    removeAll = () => {
        this.inventory.clear();
    }

    getItems = () => {
        return Array.from(this.inventory) as [TKey, TItem][];
    }

    has = (key: TKey) => {
        return this.inventory.has(key);
    }

    forEach = (predicateFN: (value: TItem, key: TKey) => void) => {
        this.inventory.forEach(predicateFN);
    }

    public constructor(inventory: Inventory<TItem, TKey>) {
        this.inventory = inventory;
    }
};


