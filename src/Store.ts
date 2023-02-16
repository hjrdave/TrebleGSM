import Dispatcher from "./Dispatcher";
import DispatchItem, { IDispatchItem } from "./DispatchItem";
import { Types } from "./TypeGuard";
import Inventory from "./Inventory";
import Manager from "./Manager";
import Middleware from "./Middleware";
import Error, { ErrorCodes } from "./Error";
import Module from "./Module";
import Features from "./Features";

export interface StoreItem<TState = any, TKey = string> {
    key: TKey;
    state?: TState;
    type?: Types;
    features?: Features<TState, TKey>;
}
export default class Store<TKey = string> {

    //Managers
    private stateManager: Manager<any, TKey>;
    private typeManager: Manager<Types, TKey>;
    private featureManager: Manager<Features<any, TKey>, TKey>;
    private moduleManager: Manager;

    //Dispatcher
    private dispatcher: Dispatcher<any, TKey>;

    // newModule = (module: Module) => {
    //     const name = module.getName();
    //     if (!this.moduleManager.has(name)) {
    //         this.moduleManager.add(name, module.getData());
    //     } else {
    //         console.error(`TrebleGSM: Module "${name}" is already being used by Store instance.`);
    //     }
    // }

    // getModule = (name: string) => {
    //     if (this.moduleManager.has(name)) {
    //         return this.moduleManager.get(name);
    //     } else {
    //         console.error(`TrebleGSM: Module "${name}" does not exist.`);
    //         return undefined;
    //     }
    // }

    getAll = () => {
        const storeItems: StoreItem<any, TKey>[] = this.stateManager.getItems().map((item) => ({
            key: item[0],
            state: item[1],
            type: this.typeManager.get(item[0]),
            features: this.featureManager.get(item[0])
        }));
        return storeItems;
    }

    new = <TState = any>({ key, state, type, features }: StoreItem<TState, TKey>) => {
        const dispatchItem = new DispatchItem({
            key: key,
            type: type,
            prevState: state,
            nextState: state,
            features: features,
            modules: undefined
        });
        const middleware = new Middleware<TState, TKey>(dispatchItem, this.stateManager.update);
        if (middleware.isThisCorrectType()) {
            this.stateManager.add(key, state);
            this.typeManager.add(key, type);
            this.featureManager.add(key, features);
            middleware.onload();
            return
        }
        const error = new Error({ code: ErrorCodes.WrongType, key: key, type: type });
        error.throwConsoleError();
    }

    get = (key: TKey) => {
        if (!this.stateManager.has(key)) {
            const error = new Error({ code: ErrorCodes.StateDoesNotExist, key: key });
            error.throwConsoleError();
            return undefined;
        }
        const type = this.typeManager.get(key);
        const state = this.stateManager.get(key);
        const features = this.featureManager.get(key);
        const storeItem: StoreItem<any, TKey> = { type, key, state, features };
        return storeItem;
    };

    set = <TState = any>(key: TKey, state: TState | ((prevState: TState) => TState)) => {
        if (this.stateManager.has(key)) {
            const dispatchItem = new DispatchItem({
                key: key,
                type: this.typeManager.get(key),
                prevState: this.get(key)?.state as TState,
                nextState: (typeof state === 'function')
                    ? (state as ((prevState: TState) => TState))(this.get(key)?.state as TState)
                    : state as TState,
                features: this.featureManager.get(key),
                modules: undefined
            });
            const middleware = new Middleware<TState, TKey>(dispatchItem, this.stateManager.update);

            (!middleware.isThisCorrectType() || !middleware.shouldThisRerender()) ?
                dispatchItem.fail(ErrorCodes.WrongType) : dispatchItem.success();

            (dispatchItem.doesItemPass()) ? middleware.onRun() : null;

            (dispatchItem.doesItemPass()) ? (
                this.dispatcher.dispatch(dispatchItem),
                this.stateManager.update(dispatchItem.getKey(), dispatchItem.getNextState())
            ) : null;

            middleware.onCallback();

        } else {
            const error = new Error({ code: ErrorCodes.StateDoesNotExist, key: key });
            error.throwConsoleError();
        }
    };

    onDispatch = (callbackfn: (item: DispatchItem<any, TKey>) => void) => {
        this.stateManager.forEach((value, key) => this.dispatcher.stopListening(key));
        this.stateManager.forEach((value, key) => this.dispatcher.listen(key, callbackfn));
    }

    public constructor() {
        this.stateManager = new Manager(new Inventory);
        this.typeManager = new Manager(new Inventory);
        this.featureManager = new Manager(new Inventory);
        this.moduleManager = new Manager(new Inventory);
        this.dispatcher = new Dispatcher();
    }
};


