import Dispatcher from "./Dispatcher";
import Parcel, { ParcelProps } from "./Parcel";
import { Types } from "./TypeGuard";
import Manager from "./Manager";
import Error, { ErrorCodes } from "./Error";
import Features from "./Features";
import Module from "./Module";

export type TKeys<IState> = keyof IState;
export type TStates<IState> = IState[TKeys<IState>];
export interface StoreItemProps<TKeys, TState, TFeatures> {
    key: TKeys;
    state?: TState;
    type?: keyof typeof Types;
    features?: TFeatures;
}
//{ [K in keyof TStates]: TStates[K]; }
export type SetState<IState> = (key: TKeys<IState>, state: TStates<IState> | ((prevState: TStates<IState>) => TStates<IState>)) => void;
export default class Store<IState, TFeatures extends Features<IState, TFeatures>> {

    private stateManager: Manager<TKeys<IState>, TStates<IState>>;
    private typeManager: Manager<TKeys<IState>, keyof typeof Types>;
    private featureManager: Manager<TKeys<IState>, TFeatures>;
    private moduleManager: Manager<TKeys<IState>, Module<IState, TFeatures>>;
    private dispatcher: Dispatcher<IState, TFeatures>;
    private createParcel = (parcel: ParcelProps<IState, TFeatures>) => {
        return Dispatcher.createParcel(parcel);
    }

    /**
     * Adds TrebleGSM Module to Store.
     * @param module - imported module.
     */
    use = (module: Module<IState, TFeatures>) => {
        this.moduleManager.add(module.getName(), module);
    }

    /**
     * Outputs all Store Items as an object array.
     */
    getItems = () => (
        this.stateManager.getAll().map((item) => ({
            key: item[0],
            state: item[1],
            type: this.typeManager.get(item[0]),
            features: this.featureManager.get(item[0])
        }))
    )

    /**
     * Adds new Store Item to Store.
     * @param key - Sets state name.
     * @param state - Initial state.
     * @param type - Explicitly sets type of state.
     * @param features - Used to set middleware.
     */
    addItem = <TState extends TStates<IState>>({ key, state, type, features }: StoreItemProps<TKeys<IState>, TState, TFeatures>) => {
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

    /**
     * Gets state by key.
     * @param key - name of state.
     */
    getState = <TState>(key: TKeys<IState>) => {
        return this.stateManager.get(key) as TState;
    };

    /**
     * Sets a new state in Store.
     * @param key - name of state.
     * @param state - name of state.
     */
    setState = <TState extends TStates<IState>>(key: TKeys<IState>, state: TState | ((prevState: TState) => TState)): void => {
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

    /**
     * Runs a callback anytime state is updated.
     * @param callbackfn - Function that fires whenever state is updated in the Store.
     */
    onDispatch = (callbackfn: (parcel: Parcel<IState, TFeatures>) => void) => {
        this.stateManager.forEach((_, key) => this.dispatcher.stopListening(key));
        this.stateManager.forEach((_, key) => this.dispatcher.listen(key, callbackfn));
    }

    public constructor() {
        this.stateManager = new Manager<TKeys<IState>, TStates<IState>>();
        this.typeManager = new Manager<TKeys<IState>, keyof typeof Types>();
        this.featureManager = new Manager<TKeys<IState>, TFeatures>();
        this.moduleManager = new Manager<TKeys<IState>, Module<IState, TFeatures>>();
        this.dispatcher = new Dispatcher<IState, TFeatures>();
    }
};


