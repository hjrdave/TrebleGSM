import { Types } from "./TypeGaurd";
import { Features } from "./Store";
export interface DispatchItem {
    key: string;
    type?: Types;
    dispatchState?: any;
    currentState?: any;
    state?: any;
    features?: Features;
    modules?: [any, any][];
}
export default class Dispatcher {
    private EventEmitter;
    private dispatchItem?;
    listen: (key: any, callbackfn: (item: DispatchItem) => void) => void;
    stopListening: (key: string) => void;
    dispatch: (item: DispatchItem) => void;
    constructor();
}
