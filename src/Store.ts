import Dispatcher from "./Dispatcher";
import Parcel from "./Parcel";
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
    type?: keyof typeof Types;
    features?: Features<TState, TKey>;
}

export type SetState<TState = any, TKey = string> = (key: TKey, state: TState | ((prevState: TState) => TState)) => void;
export default class Store<TState = any, TKey = string> {

    private stateManager: Manager<any, TKey>;
    private typeManager: Manager<Types, TKey>;
    private featureManager: Manager<Features<any, TKey>, TKey>;
    private moduleManager: Manager<Module<TState, TKey, []>, TKey>;
    private dispatcher: Dispatcher<TState, TKey>;

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
        const parcel = Dispatcher.createParcel({
            key: key,
            type: type,
            prevState: state,
            nextState: state,
            features: features,
            modules: this.moduleManager
        });
        const middleware = Dispatcher.runMiddleware(parcel, this.setState);
        if (middleware.onTypeCheck()) {
            this.stateManager.add(parcel.getKey(), parcel.getNextState());
            this.typeManager.add(parcel.getKey(), parcel.getType());
            this.featureManager.add(parcel.getKey(), parcel.getFeatures());
            parcel.success();
            middleware.onload();
        } else {
            parcel.fail(ErrorCodes.WrongType);
        }
        middleware.onCallback();
    }

    getState = (key: TKey) => {
        return this.stateManager.get(key);
    };

    setState = <TState = any>(key: TKey, state: TState | ((prevState: TState) => TState)) => {
        if (this.stateManager.has(key)) {
            //@ts-ignore
            const _state = (typeof state === 'function') ? state(this.getState(key) as TState) as TState : state as TState;
            const parcel = Dispatcher.createParcel({
                key: key,
                type: this.typeManager.get(key),
                prevState: this.getState(key),
                dispatchState: _state,
                nextState: _state,
                features: this.featureManager.get(key),
                modules: this.moduleManager
            });
            const middleware = Dispatcher.runMiddleware(parcel, this.stateManager.update);
            (middleware.onTypeCheck()) ? null : parcel.fail(ErrorCodes.WrongType);
            (middleware.shouldThisRerender()) ? null : parcel.fail(ErrorCodes.StateDidNotChange);
            (parcel.doesItemPass()) ? middleware.onRun() : null;
            (parcel.doesItemPass()) ? (
                this.dispatcher.dispatch(parcel),
                this.stateManager.update(parcel.getKey(), parcel.getNextState())
            ) : null;
            middleware.onCallback();
        } else {
            const error = new Error({ code: ErrorCodes.StateDoesNotExist, key: key });
            error.throwConsoleError();
        }
    };

    onDispatch = (callbackfn: (parcel: Parcel<TState, TKey>) => void) => {
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


