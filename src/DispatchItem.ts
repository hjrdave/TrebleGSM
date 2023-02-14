import { Types } from "./TypeGaurd";
import Features from "./Features";
import Error, { ErrorCode } from "./Error";

export interface IDispatchItem<TState = any, TKey = string> {
    key: TKey,
    type?: Types,
    dispatchedState?: TState;
    prevState?: TState;
    nextState?: TState;
    doesPass?: boolean;
    failCode?: string;
    failMsg?: string;
    isReady?: boolean;
    features?: Features<TState, TKey>;
    modules?: [any, any][];
}

export default class DispatchItem<TState = any, TKey = string> {

    private key: TKey;
    private type?: Types;
    private prevState?: TState;
    private dispatchedState?: TState;
    private nextState?: TState;
    private doesPass?: boolean;
    private failCode?: string;
    private failMsg?: string;
    private isReady?: boolean;
    private features?: Features<TState, TKey>;
    private modules?: [any, any][];

    getKey() {
        return this.key;
    }
    getType() {
        return this.type;
    }
    getPrevState() {
        return this.prevState;
    }
    getDispatchedState() {
        return this.dispatchedState;
    }
    getNextState() {
        return this.nextState;
    }
    setNextState(nextState: any) {
        this.nextState = nextState;
    }
    getIsReadyStatus() {
        return this.isReady;
    }
    setIsReadyStatus(isReady: boolean) {
        this.isReady = isReady;
    }
    getFeatures() {
        return this.features;
    }
    getModules() {
        return this.modules;
    }
    getFailCode() {
        return this.failCode;
    }
    getFailMsg() {
        return this.failMsg;
    }
    fail(code: ErrorCode) {
        const error = new Error({ code: code, key: this.key, type: this.type });
        this.failCode = error.getCode();
        this.failMsg = error.getMsg();
        this.doesPass = false;
    }
    success() {
        this.doesPass = true;
    }
    doesItemPass() {
        return this.doesPass;
    }


    public constructor(item: IDispatchItem<TState, TKey>) {
        this.key = item.key;
        this.type = item.type;
        this.prevState = item.prevState;
        this.dispatchedState = item.dispatchedState;
        this.nextState = item.nextState;
        this.features = item.features;
        this.modules = item.modules;
    }
};


