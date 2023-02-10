import Inventory from "./Inventory";

export default class Manager<TItem = any, TKey = string> {

    private inventory: Inventory<TItem, TKey>;

    get = (key: TKey) => {
        if (this.inventory.has(key)) {
            return this.inventory.get(key);
        }
        console.error(`TrebleGSM: State "${key}" does not exist.`);
        return undefined;
    }

    add = <TItem = any>(key: TKey, value: TItem) => {
        if (!this.inventory.has(key)) {
            this.inventory.set(key, value);
        } else {
            console.error(`TrebleGSM: A State with key "${key}" already exists.`);
        }
    }

    update = <TItem = any>(key: TKey, value: TItem) => {
        if (this.inventory.has(key)) {
            this.inventory.set(key, value);
        } else {
            console.error(`TrebleGSM: State with key "${key}" does not exists.`);
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


