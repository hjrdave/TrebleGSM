/**
 * Parcel Class (Payload)
 * This class hold data necessary for updating state and running middleware.
 */
import { Types } from "./TypeGuard";
import Manager from "./Manager";
import Error, { ErrorCodes } from "./Error";
import Features from "./Features";

export type TStateType<TStates> = { [K in keyof TStates]: TStates[K] };
type FailReason = { code: ErrorCodes, msg: string };
export interface ParcelProps<TKeys, TStates, TFeatures extends Features<TKeys, TStates, TFeatures>> {
    key: TKeys,
    type?: keyof typeof Types;
    dispatchState?: TStates;
    prevState?: TStates;
    nextState?: TStates;
    features?: TFeatures;
}

export default class Parcel<TKeys, TStates, TFeatures extends Features<TKeys, TStates, TFeatures>> {

    private key: TKeys;
    private type?: keyof typeof Types;
    private prevState?: TStates;
    private dispatchState?: TStates;
    private nextState?: TStates;
    private features?: TFeatures;
    private failReasons: Manager<ErrorCodes, FailReason>;
    private isInitialDispatch = false;
    private doesPass = true;

    hasFailReason(code: ErrorCodes) {
        return this.failReasons?.has(code);
    }
    addFailReason(code: ErrorCodes) {
        const error = new Error({ code: code, key: this.key, type: this.type });
        this.doesPass = false;
        this.failReasons?.add(code, { code: code, msg: error.getMsg() });
    }
    getFailReason(code: ErrorCodes) {
        return this.failReasons?.get(code);
    }
    getAllFailReasons() {
        return this.failReasons?.getAll();
    }
    setIsInitialDispatch(isInitial: boolean) {
        this.isInitialDispatch = isInitial;
    }
    getIsInitialDispatch() {
        return this.isInitialDispatch;
    }
    getKey() {
        return this.key;
    }
    getType() {
        return this.type;
    }
    getPrevState() {
        return this.prevState;
    }
    getDispatchState() {
        return this.dispatchState;
    }
    getNextState() {
        return this.nextState;
    }
    setNextState(nextState: TStates) {
        this.nextState = nextState;
    }
    getFeatures() {
        return this.features;
    }
    doesItemPass() {
        return this.doesPass;
    }

    public constructor(item: ParcelProps<TKeys, TStates, TFeatures>) {
        this.key = item.key;
        this.type = item.type;
        this.prevState = item.prevState;
        this.dispatchState = item.dispatchState;
        this.nextState = item.nextState;
        this.features = item.features;
        this.failReasons = new Manager<ErrorCodes, FailReason>();
    }
};


