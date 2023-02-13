import { default as Emitter } from "events";
import DispatcheItem from "./DispatchItem";

export default class Dispatcher<TState = any, TKey = string> {

    private eventEmitter: Emitter;
    private dispatchItem?: DispatcheItem<TState, TKey>;

    listen = (key: TKey, callbackfn: (item: DispatcheItem<TState, TKey>) => void) => {
        this.eventEmitter.on(key as string, () => {
            if (this.dispatchItem) {
                callbackfn(this.dispatchItem)
            }
        });
    }
    stopListening = (key: TKey) => {
        this.eventEmitter.removeListener(key as string, () => null);
    }
    dispatch = (item: DispatcheItem<TState, TKey>) => {
        this.dispatchItem = item;
        this.eventEmitter.emit(item.getKey() as string);
    }

    public constructor() {
        this.eventEmitter = new Emitter();
        this.eventEmitter.setMaxListeners(Number.MAX_SAFE_INTEGER);
    }
};


