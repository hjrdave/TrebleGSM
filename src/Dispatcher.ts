/**
 * Dispatcher Class
 * This class creates the Parcel (Payload) from provider method inputs, runs it through middleware, 
 * gives it to the Store Managers to be updated in state, and then lets the consumers know if data has been updated.
 */
import { default as Emitter } from "events";
import Middleware from "./Middleware";
import Manager from "./Manager";
import Module from "./Module";
import Parcel, { ParcelProps } from "./Parcel";
import { SetState } from "./Store";
export default class Dispatcher<TState = any, TKey = string> {

    private eventEmitter: Emitter;
    private parcel?: Parcel<TState, TKey>;

    listen = (key: TKey, callbackfn: (item: Parcel<TState, TKey>) => void) => {
        this.eventEmitter.on(key as string, () => {
            if (this.parcel) {
                callbackfn(this.parcel)
            }
        });
    }
    stopListening = (key: TKey) => {
        this.eventEmitter.removeListener(key as string, () => null);
    }
    dispatch = (parcel: Parcel<TState, TKey>) => {
        this.parcel = parcel;
        this.eventEmitter.emit(parcel.getKey() as string);
    }
    static createParcel = <TState = any, TKey = string>(contents: ParcelProps<TState, TKey>) => {
        return new Parcel(contents);
    }
    static runMiddleware = <TState = any, TKey = string>(parcel: Parcel<TState, TKey>, setState: SetState<TState, TKey>, modules: Manager<Module<TState, TKey, []>, TKey>) => {
        return new Middleware<TState, TKey>(parcel, setState, modules);
    }
    public constructor() {
        this.eventEmitter = new Emitter();
        this.eventEmitter.setMaxListeners(Number.MAX_SAFE_INTEGER);
    }
};


