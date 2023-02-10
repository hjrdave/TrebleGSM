import Dispatcher, { DispatchItem } from "./Dispatcher";
import { Types } from "./TypeGaurd";
import Inventory from "./Inventory";
import Manager from "./Manager";
import Middleware from "./Middleware";
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

    newModule = (module: Module) => {
        const name = module.getName();
        if (!this.moduleManager.has(name)) {
            this.moduleManager.add(name, module.getData());
        } else {
            console.error(`TrebleGSM: Module "${name}" is already being used by Store instance.`);
        }
    }

    getModule = (name: string) => {
        if (this.moduleManager.has(name)) {
            return this.moduleManager.get(name);
        } else {
            console.error(`TrebleGSM: Module "${name}" does not exist.`);
            return undefined;
        }
    }

    getItems = () => {
        return this.stateManager.getItems().map((item) => ({
            key: item[0],
            state: item[1],
            type: this.typeManager.get(item[0]),
            features: this.featureManager.get(item[0])
        }));
    }
    new = <TState = any>({ key, state, type, features }: StoreItem<TState, TKey>) => {
        const middleware = new Middleware<TState, TKey>({ key: key });
        if (middleware.doesTypePass(state, type)) {
            this.stateManager.add(key, state);
            this.typeManager.add(key, type);
            this.featureManager.add(key, features);
        } else {
            console.error(`TrebleGSM: Initial State "${key}" must be of type "${type}".`);
        }
    }
    get = (key: TKey) => {
        if (this.stateManager.has(key)) {
            const type = this.typeManager.get(key);
            const state = this.stateManager.get(key);
            const features = this.featureManager.get(key);
            const storeItem = {
                type: type,
                key: key,
                state: state,
                features: features
            }
            return storeItem
        } else {
            console.error(`TrebleGSM: State "${key}" does not exist.`);
            return undefined
        }
    }
    set = <TState = any>(key: TKey, state: TState) => {
        if (this.stateManager.has(key)) {
            const middleware = new Middleware<TState, TKey>({
                key: key,
                type: this.typeManager.get(key),
                currentState: this.get(key)?.state,
                dispatchState: state,
                state: state,
                features: this.featureManager.get(key),
                modules: this.moduleManager.getItems()
            });
            if (middleware.runPipeline().doesPass) {
                this.dispatcher.dispatch(middleware.getDispatchItem());
                this.stateManager.update(middleware.getKey(), middleware.getState());
            }
        } else {
            console.error(`TrebleGSM: State "${key}" does not exist.`);
        }
    }
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


