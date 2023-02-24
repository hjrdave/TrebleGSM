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
export default class Dispatcher<TKeys = string, TStates = any, TFeatures = Features<TKeys, TStates>> {

    private eventEmitter: Emitter;
    private parcel?: Parcel<TKeys, TStates, TFeatures>;

    listen = <TStateType = any>(key: TKeys, callbackfn: (item: Parcel<TKeys, TStateType, TFeatures>) => void) => {
        this.eventEmitter.on(key, () => {
            if (this.parcel) {
                callbackfn(this.parcel)
            }
        });
    }
    stopListening = (key: TKeys) => {
        this.eventEmitter.removeListener(key, () => null);
    }
    dispatch = <TStateType = any>(parcel: Parcel<TKeys, TStateType, TFeatures>) => {
        this.parcel = parcel;
        this.eventEmitter.emit(parcel.getKey());
    }
    static createParcel = <TKeys = string, TStateType = any, TFeatures = Features<TKeys, TStateType>>(contents: ParcelProps<TKeys, TStateType, TFeatures>) => {
        return new Parcel(contents);
    }
    static runMiddleware = <TKeys = string, TStateType = any, TFeatures = Features<TKeys, TStateType>>(parcel: Parcel<TKeys, TStateType, TFeatures>, setState: SetState<TKeys, TStateType>, modules: Manager<TKeys, Module<TKeys, TStateType, TFeatures>>) => {
        return new Middleware<TKeys, TStateType, TFeatures>(parcel, setState, modules);
    }
    public constructor() {
        this.eventEmitter = new Emitter();
        this.eventEmitter.setMaxListeners(Number.MAX_SAFE_INTEGER);
    }
};


