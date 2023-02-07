export default class Inventory<T> extends Map {
    set(key: string | symbol, value: any): this;
    get(key: string | symbol): T;
}
