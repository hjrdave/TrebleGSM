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
import { TKeys } from "./Store";

export default class Dispatcher<IState, TFeatures extends Features<IState, TFeatures>> {

    private eventEmitter: Emitter;
    private parcel?: Parcel<IState, TFeatures>;

    listen = (key: TKeys<IState>, callbackfn: (item: Parcel<IState, TFeatures>) => void) => {
        this.eventEmitter.on(key as string, () => {
            if (this.parcel) {
                callbackfn(this.parcel)
            }
        });
    }
    stopListening = (key: TKeys<IState>) => {
        this.eventEmitter.removeListener(key as string, () => null);
    }
    dispatch = (parcel: Parcel<IState, TFeatures>) => {
        this.parcel = parcel;
        this.eventEmitter.emit(parcel.getKey() as string);
    }
    static createParcel = <IState, TFeatures extends Features<IState, TFeatures>>(contents: ParcelProps<IState, TFeatures>) => {
        return new Parcel(contents);
    }
    static runMiddleware = <IState, TFeatures extends Features<IState, TFeatures>>(parcel: Parcel<IState, TFeatures>, setState: SetState<IState>, modules: Manager<TKeys<IState>, Module<IState, TFeatures>>) => {
        return new Middleware<IState, TFeatures>(parcel, setState, modules);
    }
    public constructor() {
        this.eventEmitter = new Emitter();
        this.eventEmitter.setMaxListeners(Number.MAX_SAFE_INTEGER);
    }
};


