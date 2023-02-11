import { DispatchItem } from "./Dispatcher";
import { Types } from "./TypeGaurd";
import Module from "./Module";
import Features from "./Features";
export interface StoreItem<TState = any, TKey = string> {
    key: TKey;
    state?: TState;
    type?: Types;
    features?: Features<TState, TKey>;
}
export default class Store<TKey = string> {
    private stateManager;
    private typeManager;
    private featureManager;
    private moduleManager;
    private dispatcher;
    newModule: (module: Module) => void;
    getModule: (name: string) => any;
    getItems: () => {
        key: TKey;
        state: any;
        type: Types | undefined;
        features: Features<any, TKey> | undefined;
    }[];
    new: <TState = any>({ key, state, type, features }: StoreItem<TState, TKey>) => void;
    get: (key: TKey) => {
        type: Types | undefined;
        key: TKey;
        state: any;
        features: Features<any, TKey> | undefined;
    } | undefined;
    set: <TState = any>(key: TKey, state: TState | ((prevState: TState) => TState)) => void;
    onDispatch: (callbackfn: (item: DispatchItem<any, TKey>) => void) => void;
    constructor();
}
