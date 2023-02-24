/**
 * Inventory Class
 * This is an extension of the JS Map class. It allows for Map functions to be typed easier.
 * It is the base data structure for Store state
 */
export default class Inventory<TKeys = string, TValues = any> extends Map {
    delete(key: TKeys) {
        return super.delete(key);
    }
    set(key: TKeys, value?: TValues) {
        return super.set(key, value);
    }
    get(key: TKeys) {
        return super.get(key) as TValues;
    }
    entries() {
        return super.entries() as IterableIterator<[TKeys, TValues]>
    }
    forEach(callbackfn: (value: TValues, key: TKeys, map: Map<TKeys, TValues>) => void, thisArg?: any): void {
        return super.forEach(callbackfn, thisArg);
    }
    has(key: TKeys) {
        return super.has(key);
    }
    keys() {
        return super.keys() as IterableIterator<TKeys>
    }
    values() {
        return super.values() as IterableIterator<TValues>;
    }
};


