/**
 * Manager Class,
 * This class handles the CRUD functionality of the Inventory. 
 * It manages data flow in the Store.
 */
import Inventory from "./Inventory";

export default class Manager<TKeys, TValue> {

    private inventory = new Inventory<TKeys, TValue>();

    get = (key: TKeys) => {
        if (this.inventory.has(key)) {
            return this.inventory.get(key);
        }
        return undefined;
    }

    add = (key: TKeys, value?: TValue) => {
        if (!this.inventory.has(key)) {
            this.inventory.set(key, value);
            return true;
        }
        return false;
    }

    update = (key: TKeys, value?: TValue) => {
        if (this.inventory.has(key)) {
            this.inventory.set(key, value);
            return true;
        }
        return false;
    }

    remove = (key: TKeys) => {
        if (this.inventory.has(key)) {
            return this.inventory.delete(key);
        }
        return false;
    }

    removeAll = () => {
        return this.inventory.clear();
    }

    getAll = () => {
        if (this.inventory.size > 0) {
            return Array.from(this.inventory.entries());
        }
        return [];
    }

    has = (key: TKeys) => {
        return this.inventory.has(key);
    }

    forEach = (predicateFN: (value: TValue, key: TKeys) => void) => {
        this.inventory.forEach(predicateFN);
    }
};


