import Inventory from "./Inventory";

export default class Manager<TItem = any, TKey = string> {

    private inventory: Inventory<TItem, TKey>;

    get = (key: TKey) => {
        if (this.inventory.has(key)) {
            return this.inventory.get(key);
        }
        return undefined;
    }

    add = <TItem = any>(key: TKey, value: TItem) => {
        if (!this.inventory.has(key)) {
            this.inventory.set(key, value);
            return true;
        }
        return false;
    }

    update = <TItem = any>(key: TKey, value: TItem) => {
        if (this.inventory.has(key)) {
            this.inventory.set(key, value);
            return true;
        }
        return false;
    }

    remove = (key: TKey) => {
        if (this.inventory.has(key)) {
            return this.inventory.delete(key);
        }
        return false;
    }

    removeAll = () => {
        return this.inventory.clear();
    }

    getItems = () => {
        if (this.inventory.size > 0) {
            return Array.from(this.inventory) as [TKey, TItem][];
        }
        return [];
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


