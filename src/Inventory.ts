/**
 * Inventory Class
 * This is an extension of the JS Map class. It allows for Map functions to be typed easier.
 * It is the base data structure for Store state
 */
export default class Inventory<TItem = any, TKey = string> extends Map {
    delete(key: TKey) {
        return super.delete(key);
    }
    set(key: TKey, value: TItem) {
        return super.set(key, value);
    }
    get(key: TKey) {
        return super.get(key) as TItem;
    }
    entries() {
        return super.entries() as IterableIterator<[TKey, TItem]>
    }
    forEach(callbackfn: (value: TItem, key: TKey, map: Map<TKey, TItem>) => void, thisArg?: any): void {
        return super.forEach(callbackfn);
    }
    has(key: TKey) {
        return super.has(key);
    }
    keys() {
        return super.keys() as IterableIterator<TKey>
    }
    values() {
        return super.values() as IterableIterator<TItem>;
    }
};


