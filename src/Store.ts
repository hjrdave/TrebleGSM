import Dispatcher from "./Dispatcher";
import Parcel, { ParcelProps } from "./Parcel";
import { Types } from "./TypeGuard";
import Manager from "./Manager";
import Error, { ErrorCodes } from "./Error";
import Features from "./Features";
import Module from "./Module";

export interface StoreItemProps<TKeys, TStates, TFeatures extends Features<TKeys, TStates, TFeatures>> {
    key: TKeys;
    state?: TStates;
    type?: keyof typeof Types;
    features?: TFeatures;
}
//{ [K in keyof TStates]: TStates[K]; }
export type SetState<TKey, TState> = (key: TKey, state: TState | ((prevState: TState) => TState)) => void;
export default class Store<TKeys, TStates, TFeatures extends Features<TKeys, TStates, TFeatures>> {

    private stateManager: Manager<TKeys, TStates>;
    private typeManager: Manager<TKeys, keyof typeof Types>;
    private featureManager: Manager<TKeys, TFeatures>;
    private moduleManager: Manager<TKeys, Module<TKeys, TStates, TFeatures>>;
    private dispatcher: Dispatcher<TKeys, TStates, TFeatures>;
    private createParcel = (parcel: ParcelProps<TKeys, TStates, TFeatures>) => {
        return Dispatcher.createParcel(parcel);
    }

    use = (module: Module<TKeys, TStates, TFeatures>) => {
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

    addItem = ({ key, state, type, features }: StoreItemProps<TKeys, TStates, TFeatures>) => {
        const parcel = this.createParcel({
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

    getState = <TState>(key: TKeys) => {
        return this.stateManager.get(key) as TState;
    };

    setState = <TState extends TStates>(key: TKeys, state: TState | ((prevState: TState) => TState)): void => {
        if (this.stateManager.has(key)) {
            //This is what immur will process
            const _state = (typeof state === 'function') ? (state as (prevState: TState) => TState)(this.getState(key) as TState) as TState : state as TState;
            //
            const parcel = this.createParcel({
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

    onDispatch = (callbackfn: (parcel: Parcel<TKeys, TStates, TFeatures>) => void) => {
        this.stateManager.forEach((_, key) => this.dispatcher.stopListening(key));
        this.stateManager.forEach((_, key) => this.dispatcher.listen(key, callbackfn));
    }

    public constructor() {
        this.stateManager = new Manager<TKeys, TStates>();
        this.typeManager = new Manager<TKeys, keyof typeof Types>();
        this.featureManager = new Manager<TKeys, TFeatures>();
        this.moduleManager = new Manager<TKeys, Module<TKeys, TStates, TFeatures>>();
        this.dispatcher = new Dispatcher<TKeys, TStates, TFeatures>();
    }
};


