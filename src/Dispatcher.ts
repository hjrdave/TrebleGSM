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
import Features from "./Features";
import { SetState } from "./Store";

export default class Dispatcher<TKeys, TStates, TFeatures extends Features<TKeys, TStates, TFeatures>> {

    private eventEmitter: Emitter;
    private parcel?: Parcel<TKeys, TStates, TFeatures>;

    listen = (key: TKeys, callbackfn: (item: Parcel<TKeys, TStates, TFeatures>) => void) => {
        this.eventEmitter.on(key as string, () => {
            if (this.parcel) {
                callbackfn(this.parcel)
            }
        });
    }
    stopListening = (key: TKeys) => {
        this.eventEmitter.removeListener(key as string, () => null);
    }
    dispatch = (parcel: Parcel<TKeys, TStates, TFeatures>) => {
        this.parcel = parcel;
        this.eventEmitter.emit(parcel.getKey() as string);
    }
    static createParcel = <TKeys, TState, TFeatures extends Features<TKeys, TState, TFeatures>>(contents: ParcelProps<TKeys, TState, TFeatures>) => {
        return new Parcel(contents);
    }
    static runMiddleware = <TKeys, TState, TFeatures extends Features<TKeys, TState, TFeatures>>(parcel: Parcel<TKeys, TState, TFeatures>, setState: SetState<TKeys, TState>, modules: Manager<TKeys, Module<TKeys, TState, TFeatures>>) => {
        return new Middleware<TKeys, TState, TFeatures>(parcel, setState, modules);
    }
    public constructor() {
        this.eventEmitter = new Emitter();
        this.eventEmitter.setMaxListeners(Number.MAX_SAFE_INTEGER);
    }
};


