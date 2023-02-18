import { Types } from "./TypeGuard";
import Features from "./Features";
import Module from "./Module";
import Manager from "./Manager";
import Error, { ErrorCodes } from "./Error";

export interface IDispatchItem<TState = any, TKey = string> {
    key: TKey,
    type?: keyof typeof Types,
    dispatchedState?: TState;
    prevState?: TState;
    nextState?: TState;
    doesPass?: boolean;
    failCode?: string;
    failMsg?: string;
    features?: Features<TState, TKey>;
    modules: Manager<Module<TState, TKey, []>, TKey>;
}

export default class DispatchItem<TState = any, TKey = string> {

    private key: TKey;
    private type?: keyof typeof Types;;
    private prevState?: TState;
    private dispatchedState?: TState;
    private nextState?: TState;
    private doesPass = true;
    private failCode?: string;
    private failMsg?: string;
    private features?: Features<TState, TKey>;
    private modules?: Manager<Module<TState, TKey, []>, TKey>;

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
    fail(code: ErrorCodes) {
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


