import { default as Emitter } from "events";
import Middleware from "./Middleware";
import Parcel, { IParcel } from "./Parcel";

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
    createParcel = (contents: IParcel<TState, TKey>) => {
        return new Parcel(contents);
    }
    runMiddleware = (parcel: Parcel<TState, TKey>, setState: (key: TKey, value: any) => void) => {
        return new Middleware(parcel, setState);
    }

    public constructor() {
        this.eventEmitter = new Emitter();
        this.eventEmitter.setMaxListeners(Number.MAX_SAFE_INTEGER);
    }
};


