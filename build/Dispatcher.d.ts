import { Types } from "./TypeGaurd";
import Features from "./Features";
export interface DispatchItem<TState = any, TKey = string> {
    key: TKey;
    type?: Types;
    dispatchedState?: TState;
    currentState?: TState;
    nextState?: TState;
    dispatchStatus: {
        doesPass: boolean;
        failCode: string;
        failMsg: string;
    };
    features?: Features<TState, TKey>;
    modules?: [any, any][];
}
export default class Dispatcher<TState = any, TKey = string> {
    private eventEmitter;
    private dispatchItem?;
    listen: (key: TKey, callbackfn: (item: DispatchItem<TState, TKey>) => void) => void;
    stopListening: (key: TKey) => void;
    dispatch: (item: DispatchItem<TState, TKey>) => void;
    constructor();
}
