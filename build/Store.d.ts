import { DispatchItem } from "./Dispatcher";
import { Types } from "./TypeGaurd";
import Module from "./Module";
export interface Features {
    persist?: boolean;
    log?: (item: DispatchItem) => void;
    check?: (item: DispatchItem) => boolean;
    process?: (item: DispatchItem) => DispatchItem;
    callback?: (item: DispatchItem) => void;
}
export interface StoreItem {
    key: string;
    state: any;
    type?: Types;
    features: Features;
}
export default class Store {
    private stateManager;
    private typeManager;
    private featureManager;
    private moduleManager;
    private dispatcher;
    newModule: (module: Module) => void;
    getModule: (name: string) => Module | undefined;
    getItems: () => {
        key: any;
        state: any;
        type: Types | undefined;
        features: Features | undefined;
    }[];
    new: ({ key, state, type, features }: StoreItem) => void;
    get: (key: string) => {
        type: Types | undefined;
        key: string;
        state: any;
        features: Features | undefined;
    } | undefined;
    set: (key: string, state: any) => void;
    onDispatch: (callbackfn: (item: DispatchItem) => void) => void;
    constructor();
}
