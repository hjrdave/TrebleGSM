/**
 * Inventory Class
 * This is an extension of the JS Map class. It allows for Map functions to be typed easier.
 * It is the base data structure for Store state
 */
export default class Inventory<TKeys, TValues>{
    private map: Map<TKeys, TValues>;
    public size: number;
    delete(key: TKeys) {
        return this.map.delete(key);
    }
    set(key: TKeys, value?: TValues) {
        this.map.set(key, value as TValues);
    }
    get(key: TKeys) {
        return this.map.get(key);
    }
    entries() {
        return this.map.entries()
    }
    forEach(callbackfn: (value: TValues, key: TKeys, map: Map<TKeys, TValues>) => void, thisArg?: any): void {
        this.map.forEach(callbackfn, thisArg);
    }
    has(key: TKeys) {
        return this.map.has(key);
    }
    keys() {
        return this.map.keys()
    }
    values() {
        return this.map.values();
    }
    clear() {
        this.map.clear();
    }
    public constructor(iterable?: Iterable<readonly [TKeys, TValues]> | null | undefined) {
        this.map = new Map<TKeys, TValues>(iterable);
        this.size = this.map.size;
    }
};


