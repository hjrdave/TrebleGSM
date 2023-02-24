import Dispatcher from "./Dispatcher";
import Parcel from "./Parcel";
import { Types } from "./TypeGuard";
import Manager from "./Manager";
import Error, { ErrorCodes } from "./Error";
import Features from "./Features";
import Module from "./Module";

export interface StoreItemProps<TKeys = string, TStates = any, TFeatures = Features<TKeys, TStates>> {
    key: TKeys;
    state?: TStates;
    type?: keyof typeof Types;
    features?: TFeatures;
}

export type SetState<TKey = string, TStateType = any> = (key: TKey, state: TStateType | ((prevState: TStateType) => TStateType)) => void;
export default class Store<TKeys = string, TStates = any, TFeatures = Features<TKeys, TStates>> {

    private stateManager: Manager<TKeys, TStates>;
    private typeManager: Manager<TKeys, keyof typeof Types>;
    private featureManager: Manager<TKeys, TFeatures>;
    private moduleManager: Manager<TKeys, Module<TKeys, TStates, TFeatures, string[]>>;
    private dispatcher: Dispatcher<TKeys, TStates>;

    use = (module: Module<TKeys, TStates, TFeatures, string[]>) => {
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

    getState = <TStateType = any>(key: TKeys) => {
        return this.stateManager.get(key) as TStateType;
    };

    setState = <TStateType = any | undefined>(key: TKeys, state: TStateType | ((prevState: TStateType) => TStateType)): void => {
        if (this.stateManager.has(key)) {
            //This is what immur will process
            const _state = (typeof state === 'function') ? (state as (prevState: TStateType) => TStateType)(this.getState(key) as TStateType) as TStateType : state as TStateType;
            //
            const parcel = Dispatcher.createParcel<TKeys, TStateType, TFeatures>({
                key: key,
                type: this.typeManager.get(key),
                prevState: this.getState<TStateType>(key),
                dispatchState: _state,
                nextState: _state,
                features: this.featureManager.get(key)
            });
            const middleware = Dispatcher.runMiddleware(parcel, this.setState, this.moduleManager as any);
            (middleware.onTypeCheck()) ? null : parcel.addFailReason(ErrorCodes.WrongType);
            (middleware.shouldParcelRerender()) ? null : parcel.addFailReason(ErrorCodes.StateDidNotChange);
            (parcel.doesItemPass()) ? (
                middleware.onRun(),
                this.dispatcher.dispatch(parcel as any),
                this.stateManager.update(parcel.getKey(), parcel.getNextState() as TStates)
            ) : null;
            middleware.onCallback();
        } else {
            const error = new Error({ code: ErrorCodes.StateDoesNotExist, key: key });
            error.throwConsoleError();
        }
    };

    onDispatch = <TStateType = any>(callbackfn: (parcel: Parcel<TKeys, TStateType, TFeatures>) => void) => {
        this.stateManager.forEach((_, key) => this.dispatcher.stopListening(key));
        this.stateManager.forEach((_, key) => this.dispatcher.listen<TStateType>(key, callbackfn as any));
    }

    public constructor() {
        this.stateManager = new Manager<TKeys, TStates>();
        this.typeManager = new Manager<TKeys, keyof typeof Types>();
        this.featureManager = new Manager<TKeys, TFeatures>();
        this.moduleManager = new Manager<TKeys, Module<TKeys, TStates, TFeatures, string[]>>();
        this.dispatcher = new Dispatcher<TKeys, TStates>();
    }
};


