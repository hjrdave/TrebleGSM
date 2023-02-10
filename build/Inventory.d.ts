export default class Inventory<TItem = any, TKey = string> extends Map {
    set<TItem = any>(key: TKey, value: TItem): this;
    get(key: TKey): TItem;
}
