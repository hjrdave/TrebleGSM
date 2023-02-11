import { StoreItem } from "./Store";
import { DispatchItem } from "./Dispatcher";
export declare class TrebleGSM<TKey = string> {
    private store;
    getItems: () => {
        key: TKey;
        state: any;
        type: import("./TypeGaurd").Types | undefined;
        features: import("./Features").default<any, TKey> | undefined;
    }[];
    addItem: <TState = any>(item: StoreItem<TState, TKey>) => void;
    setState: <TState = any>(key: TKey, value: TState | ((prevState: TState) => TState)) => void;
    getState: <TState = any>(key: TKey) => TState;
    onDispatch: (callbackfn: (item: DispatchItem<any, TKey>) => void) => void;
    constructor();
}
export default TrebleGSM;
