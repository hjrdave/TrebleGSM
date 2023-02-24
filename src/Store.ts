import Dispatcher from "./Dispatcher";
import Parcel from "./Parcel";
import { Types } from "./TypeGuard";
import Manager from "./Manager";
import Error, { ErrorCodes } from "./Error";
import Features from "./Features";
import Module from "./Module";

export interface StoreItemProps<TStates = any, TKeys = string, TFeatures = Features<TStates, TKeys>> {
    key: TKeys;
    state?: TStates;
    type?: keyof typeof Types;
    features?: TFeatures;
}

export type SetState<TStates = any, TKey = string> = (key: TKey, state: TStates | ((prevState: TStates) => TStates)) => void;
export default class Store<TKeys = string, TStates = any, TFeatures = Features<TStates, TKeys>> {

    private stateManager: Manager<TStates, TKeys>;
    private typeManager: Manager<keyof typeof Types, TKeys>;
    private featureManager: Manager<TFeatures, TKeys>;
    private moduleManager: Manager<Module<TStates, TKeys, []>, TKeys>;
    private dispatcher: Dispatcher<TStates, TKeys>;

    use = (module: Module<TStates, TKeys, []>) => {
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

    addItem = ({ key, state, type, features }: StoreItemProps<TStates, TKeys, TFeatures>) => {
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

    getState = (key: TKeys) => {
        return this.stateManager.get(key);
    };

    setState = <TStates = any>(key: TKeys, state: TStates | ((prevState: TStates) => TStates)): void => {
        if (this.stateManager.has(key)) {
            //This is what immur will process
            const _state = (typeof state === 'function') ? (state as (prevState: TStates) => TStates)(this.getState(key) as TStates) as TStates : state as TStates;
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

    onDispatch = (callbackfn: (parcel: Parcel<TStates, TKeys>) => void) => {
        this.stateManager.forEach((_, key) => this.dispatcher.stopListening(key));
        this.stateManager.forEach((_, key) => this.dispatcher.listen(key, callbackfn));
    }

    public constructor() {
        this.stateManager = new Manager<any, TKeys>();
        this.typeManager = new Manager<keyof typeof Types, TKeys>();
        this.featureManager = new Manager<TFeatures, TKeys>();
        this.moduleManager = new Manager<Module<TStates, TKeys, any>, TKeys>();
        this.dispatcher = new Dispatcher<TStates, TKeys>();
    }
};


