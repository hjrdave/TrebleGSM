/**
 * Parcel Class (Payload)
 * This class hold data necessary for updating state and running middleware.
 */
import { Types } from "./TypeGuard";
import Manager from "./Manager";
import Error, { ErrorCodes } from "./Error";
import Features from "./Features";
import { TKeys, TStates } from "./Store";

type FailReason = { code: ErrorCodes, msg: string };
export interface ParcelProps<IState, TFeatures extends Features<IState, TFeatures>> {
    key: TKeys<IState>,
    type?: keyof typeof Types;
    dispatchState?: TStates<IState>;
    prevState?: TStates<IState>;
    nextState?: TStates<IState>;
    features?: TFeatures;
}

export default class Parcel<IState, TFeatures extends Features<IState, TFeatures>> {

    private key: TKeys<IState>;
    private type?: keyof typeof Types;
    private prevState?: TStates<IState>;
    private dispatchState?: TStates<IState>;
    private nextState?: TStates<IState>;
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
    setNextState(nextState: TStates<IState>) {
        this.nextState = nextState;
    }
    getFeatures() {
        return this.features;
    }
    doesItemPass() {
        return this.doesPass;
    }

    public constructor(item: ParcelProps<IState, TFeatures>) {
        this.key = item.key;
        this.type = item.type;
        this.prevState = item.prevState;
        this.dispatchState = item.dispatchState;
        this.nextState = item.nextState;
        this.features = item.features;
        this.failReasons = new Manager<ErrorCodes, FailReason>();
    }
};


