/**
 * Dispatcher Class  
 * This class creates the Parcel (Payload) from provider method inputs, runs it through middleware, 
 * gives it to the Store Managers to be updated in state, and then lets the consumers know if data has been updated.
 */
import { default as Emitter } from "events";
import Middleware from "./Middleware";
import Manager from "./Manager";
import Module from "./Module";
import Features from "./Features";
import Parcel, { ParcelProps } from "./Parcel";
import { SetState } from "./Store";
export default class Dispatcher<TStates = any, TKeys = string, TFeatures = Features<TStates, TKeys>> {

    private eventEmitter: Emitter;
    private parcel?: Parcel<TStates, TKeys, TFeatures>;

    listen = (key: TKeys, callbackfn: (item: Parcel<TStates, TKeys, TFeatures>) => void) => {
        this.eventEmitter.on(key as string, () => {
            if (this.parcel) {
                callbackfn(this.parcel)
            }
        });
    }
    stopListening = (key: TKeys) => {
        this.eventEmitter.removeListener(key as string, () => null);
    }
    dispatch = (parcel: Parcel<TStates, TKeys, TFeatures>) => {
        this.parcel = parcel;
        this.eventEmitter.emit(parcel.getKey() as string);
    }
    static createParcel = <TStates = any, TKeys = string, TFeatures = Features<TStates, TKeys>>(contents: ParcelProps<TStates, TKeys, TFeatures>) => {
        return new Parcel(contents);
    }
    static runMiddleware = <TStates = any, TKeys = string, TFeatures = Features<TStates, TKeys>>(parcel: Parcel<TStates, TKeys, TFeatures>, setState: SetState<TStates, TKeys>, modules: Manager<Module<TStates, TKeys, TFeatures>, TKeys>) => {
        return new Middleware<TStates, TKeys, TFeatures>(parcel, setState, modules);
    }
    public constructor() {
        this.eventEmitter = new Emitter();
        this.eventEmitter.setMaxListeners(Number.MAX_SAFE_INTEGER);
    }
};


