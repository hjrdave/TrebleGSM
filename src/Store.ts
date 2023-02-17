import Dispatcher from "./Dispatcher";
import DispatchItem from "./DispatchItem";
import { Types } from "./TypeGuard";
import Inventory from "./Inventory";
import Manager from "./Manager";
import Middleware from "./Middleware";
import Error, { ErrorCodes } from "./Error";
import Features from "./Features";
import Module from "./Module";

export interface StoreItem<TState = any, TKey = string> {
    key: TKey;
    state?: TState;
    type?: Types;
    features?: Features<TState, TKey>;
}
export default class Store<TState = any, TKey = string> {

    private stateManager: Manager<any, TKey>;
    private typeManager: Manager<Types, TKey>;
    private featureManager: Manager<Features<any, TKey>, TKey>;
    private moduleManager: Manager<Module<TState, TKey, []>, TKey>;
    private dispatcher: Dispatcher<any, TKey>;

    use = (module: Module<TState, TKey, []>) => {
        this.moduleManager.add(module.getName(), module);
    }

    getItems = () => {
        const storeItems: StoreItem<any, TKey>[] = this.stateManager.getItems().map((item) => ({
            key: item[0],
            state: item[1],
            type: this.typeManager.get(item[0]),
            features: this.featureManager.get(item[0])
        }));
        return storeItems;
    }

    addItem = <TState = any>({ key, state, type, features }: StoreItem<TState, TKey>) => {
        const dispatchItem = new DispatchItem<TState, TKey>({
            key: key,
            type: type,
            prevState: state,
            nextState: state,
            features: features,
            modules: this.moduleManager
        });
        const middleware = new Middleware<TState, TKey>(dispatchItem, this.stateManager.update);
        if (middleware.onTypeCheck()) {
            this.stateManager.add(key, state);
            this.typeManager.add(key, type);
            this.featureManager.add(key, features);
            middleware.onload();
            return
        }
        const error = new Error({ code: ErrorCodes.WrongType, key: key, type: type });
        error.throwConsoleError();
    }

    getState = (key: TKey) => {
        if (!this.stateManager.has(key)) {
            const error = new Error({ code: ErrorCodes.StateDoesNotExist, key: key });
            error.throwConsoleError();
            return undefined;
        }
        const type = this.typeManager.get(key);
        const state = this.stateManager.get(key);
        const features = this.featureManager.get(key);
        const storeItem: StoreItem<TState, TKey> = { type, key, state, features };
        return storeItem;
    };

    setState = <TState = any>(key: TKey, state: TState | ((prevState: TState) => TState)) => {
        if (this.stateManager.has(key)) {
            const dispatchItem = new DispatchItem<TState, TKey>({
                key: key,
                type: this.typeManager.get(key),
                prevState: this.getState(key)?.state as TState,
                nextState: (typeof state === 'function')
                    ? (state as ((prevState: TState) => TState))(this.getState(key)?.state as TState)
                    : state as TState,
                features: this.featureManager.get(key),
                modules: this.moduleManager
            });
            const middleware = new Middleware<TState, TKey>(dispatchItem, this.stateManager.update);
            (middleware.onTypeCheck()) ? null : dispatchItem.fail(ErrorCodes.WrongType);
            (middleware.shouldThisRerender()) ? null : dispatchItem.fail(ErrorCodes.StateDidNotChange);
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

    onDispatch = (callbackfn: (item: DispatchItem<TState, TKey>) => void) => {
        this.stateManager.forEach((_, key) => this.dispatcher.stopListening(key));
        this.stateManager.forEach((_, key) => this.dispatcher.listen(key, callbackfn));
    }

    public constructor() {
        this.stateManager = new Manager(new Inventory);
        this.typeManager = new Manager(new Inventory);
        this.featureManager = new Manager(new Inventory);
        this.moduleManager = new Manager(new Inventory);
        this.dispatcher = new Dispatcher();
    }
};


