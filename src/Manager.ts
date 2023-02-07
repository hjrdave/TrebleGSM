import Inventory from "./Inventory";

export default class Manager<T> {

    private inventory: Inventory<T>;

    get = (key: string) => {
        if (this.inventory.has(key)) {
            return this.inventory.get(key);
        }
        console.error(`TrebleGSM: State "${key}" does not exist.`);
        return undefined;
    }

    add = (key: string, value: any) => {
        if (!this.inventory.has(key)) {
            this.inventory.set(key, value);
        } else {
            console.error(`TrebleGSM: A State with key "${key}" already exists.`);
        }
    }

    update = (key: string, value: any) => {
        if (this.inventory.has(key)) {
            this.inventory.set(key, value);
        } else {
            console.error(`TrebleGSM: State with key "${key}" does not exists.`);
        }
    }

    remove = (key: string) => {
        return this.inventory.delete(key);
    }

    removeAll = () => {
        this.inventory.clear();
    }

    getItems = () => {
        return Array.from(this.inventory);
    }

    has = (key: string) => {
        return this.inventory.has(key);
    }

    forEach = (predicateFN: (value: any, key: string) => void) => {
        this.inventory.forEach(predicateFN);
    }

    public constructor(inventory: Inventory<T>) {
        this.inventory = inventory;
    }
};


