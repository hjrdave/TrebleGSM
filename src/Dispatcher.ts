import { default as Emitter } from "events";
import { Types } from "./TypeGaurd";
import Features from "./Features";
export interface DispatchItem<TState = any, TKey = string> {
    key: TKey,
    type?: Types,
    dispatchState?: TState;
    currentState?: TState;
    state?: TState;
    features?: Features<TState, TKey>;
    modules?: [any, any][];
}
export default class Dispatcher<TState = any, TKey = string> {

    private eventEmitter: Emitter;
    private dispatchItem?: DispatchItem<TState, TKey>;

    listen = (key: TKey, callbackfn: (item: DispatchItem<TState, TKey>) => void) => {
        this.eventEmitter.on(key as string, () => {
            if (this.dispatchItem) {
                callbackfn(this.dispatchItem)
            }
        });
    }
    stopListening = (key: TKey) => {
        this.eventEmitter.removeListener(key as string, () => null);
    }
    dispatch = (item: DispatchItem<TState, TKey>) => {
        this.dispatchItem = item;
        this.eventEmitter.emit(item.key as string);
    }

    public constructor() {
        this.eventEmitter = new Emitter();
        this.eventEmitter.setMaxListeners(Number.MAX_SAFE_INTEGER);
    }
};


