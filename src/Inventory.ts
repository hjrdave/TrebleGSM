export default class Inventory<TItem = any, TKey = string> extends Map {
    set<TItem = any>(key: TKey, value: TItem) {
        return super.set(key, value);
    }
    get(key: TKey) {
        return super.get(key) as TItem;
    }
}


