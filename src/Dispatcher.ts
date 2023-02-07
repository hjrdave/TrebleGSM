import { default as Emitter } from "events";
import { Types } from "./TypeGaurd";
import { Features } from "./Store";

export interface DispatchItem {
    key: string,
    type?: Types,
    dispatchState?: any;
    currentState?: any;
    state?: any;
    features?: Features;
    modules?: [any, any][];
}
export default class Dispatcher {

    private EventEmitter: Emitter;
    private dispatchItem?: DispatchItem;

    listen = (key: any, callbackfn: (item: DispatchItem) => void) => {
        this.EventEmitter.on(key, () => {
            callbackfn(this.dispatchItem as any)
        });
    }
    stopListening = (key: string) => {
        this.EventEmitter.removeListener(key, () => null);
    }
    dispatch = (item: DispatchItem) => {
        this.dispatchItem = item;
        this.EventEmitter.emit(item.key);
    }

    public constructor() {
        this.EventEmitter = new Emitter();
        this.EventEmitter.setMaxListeners(Number.MAX_SAFE_INTEGER);
    }
};


