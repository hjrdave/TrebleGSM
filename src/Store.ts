import Dispatcher from "./Dispatcher";
import Parcel from "./Parcel";
import { Types } from "./TypeGuard";
import Manager from "./Manager";
import Error, { ErrorCodes } from "./Error";
import Features from "./Features";
import Module from "./Module";

export interface StoreItemProps<TState = any, TKey = string> {
    key: TKey;
    state?: TState;
    type?: keyof typeof Types;
    features?: Features<TState, TKey>;
}

export type SetState<TState = any, TKey = string> = (key: TKey, state: TState | ((prevState: TState) => TState)) => void;
export default class Store<TState = any, TKey = string> {

    private stateManager: Manager<TState, TKey>;
    private typeManager: Manager<keyof typeof Types, TKey>;
    private featureManager: Manager<Features<any, TKey>, TKey>;
    private moduleManager: Manager<Module<TState, TKey, []>, TKey>;
    private dispatcher: Dispatcher<TState, TKey>;

    use = (module: Module<TState, TKey, []>) => {
        this.moduleManager.add(module.getName(), module);
    }

    getItems = () => (
        this.stateManager.getAll().map((item) => ({
            key: item[0],
            state: item[1],
            type: this.typeManager.get(item[0]),
            features: this.featureManager.get(item[0])
        }))
    )

    addItem = ({ key, state, type, features }: StoreItemProps<TState, TKey>) => {
        const parcel = Dispatcher.createParcel({
            key: key,
            type: type,
            dispatchState: state,
            nextState: state,
            features: features
        });
        parcel.setIsInitialDispatch(true);
        const middleware = Dispatcher.runMiddleware(parcel, this.setState, this.moduleManager);
        if (middleware.onTypeCheck()) {
            this.stateManager.add(parcel.getKey(), parcel.getNextState());
            this.typeManager.add(parcel.getKey(), parcel.getType());
            this.featureManager.add(parcel.getKey(), parcel.getFeatures());
            middleware.onload();
        } else {
            parcel.addFailReason(ErrorCodes.WrongType);
        }
        middleware.onCallback();
    }

    getState = (key: TKey) => {
        return this.stateManager.get(key);
    };

    setState = <TState = any>(key: TKey, state: TState | ((prevState: TState) => TState)): void => {
        if (this.stateManager.has(key)) {
            //This is what immur will process
            const _state = (typeof state === 'function') ? (state as (prevState: TState) => TState)(this.getState(key) as TState) as TState : state as TState;
            //
            const parcel = Dispatcher.createParcel({
                key: key,
                type: this.typeManager.get(key),
                prevState: this.getState(key),
                dispatchState: _state,
                nextState: _state,
                features: this.featureManager.get(key)
            });
            const middleware = Dispatcher.runMiddleware(parcel, this.setState, this.moduleManager);
            (middleware.onTypeCheck()) ? null : parcel.addFailReason(ErrorCodes.WrongType);
            (middleware.shouldParcelRerender()) ? null : parcel.addFailReason(ErrorCodes.StateDidNotChange);
            (parcel.doesItemPass()) ? (
                middleware.onRun(),
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
        this.stateManager = new Manager<any, TKey>();
        this.typeManager = new Manager<keyof typeof Types, TKey>();
        this.featureManager = new Manager<Features<any, TKey>, TKey>();
        this.moduleManager = new Manager<Module<TState, TKey, []>, TKey>();
        this.dispatcher = new Dispatcher<TState, TKey>();
    }
};


