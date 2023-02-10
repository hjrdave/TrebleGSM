import { Types } from "./TypeGaurd";
import Features from "./Features";
export interface DispatchItem<TState = any, TKey = string> {
    key: TKey;
    type?: Types;
    dispatchState?: TState;
    currentState?: TState;
    state?: TState;
    features?: Features<TState, TKey>;
    modules?: [any, any][];
}
export default class Dispatcher<TState = any, TKey = string> {
    private EventEmitter;
    private dispatchItem?;
    listen: (key: TKey, callbackfn: (item: DispatchItem<TState, TKey>) => void) => void;
    stopListening: (key: TKey) => void;
    dispatch: (item: DispatchItem<TState, TKey>) => void;
    constructor();
}
