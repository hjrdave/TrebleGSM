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
type TStateType<TStates> = { [K in keyof TStates]: TStates[K] };
export default class Dispatcher<TKeys, TStates, TFeatures> {

    private eventEmitter: Emitter;
    private parcel?: Parcel<TKeys, TStateType<TStates>, TFeatures>;

    listen = (key: TKeys, callbackfn: (item: Parcel<TKeys, TStateType<TStates>, TFeatures>) => void) => {
        this.eventEmitter.on(key, () => {
            if (this.parcel) {
                callbackfn(this.parcel)
            }
        });
    }
    stopListening = (key: TKeys) => {
        this.eventEmitter.removeListener(key, () => null);
    }
    dispatch = (parcel: Parcel<TKeys, TStateType<TStates>, TFeatures>) => {
        this.parcel = parcel;
        this.eventEmitter.emit(parcel.getKey());
    }
    static createParcel = <TKeys, TStateType, TFeatures>(contents: ParcelProps<TKeys, TStateType, TFeatures>) => {
        return new Parcel(contents);
    }
    static runMiddleware = <TKeys, TStateType, TFeatures>(parcel: Parcel<TKeys, TStateType, TFeatures>, setState: SetState<TKeys, TStateType>, modules: Manager<TKeys, Module<TKeys, TStateType, TFeatures>>) => {
        return new Middleware<TKeys, TStateType, TFeatures>(parcel, setState, modules);
    }
    public constructor() {
        this.eventEmitter = new Emitter();
        this.eventEmitter.setMaxListeners(Number.MAX_SAFE_INTEGER);
    }
};


