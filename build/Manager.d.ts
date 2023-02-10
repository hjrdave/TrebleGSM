import Inventory from "./Inventory";
export default class Manager<TItem = any, TKey = string> {
    private inventory;
    get: (key: TKey) => TItem | undefined;
    add: <TItem_1 = any>(key: TKey, value: TItem_1) => void;
    update: <TItem_1 = any>(key: TKey, value: TItem_1) => void;
    remove: (key: TKey) => boolean;
    removeAll: () => void;
    getItems: () => [TKey, TItem][];
    has: (key: TKey) => boolean;
    forEach: (predicateFN: (value: TItem, key: TKey) => void) => void;
    constructor(inventory: Inventory<TItem, TKey>);
}
