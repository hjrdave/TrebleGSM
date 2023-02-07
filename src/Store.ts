import Dispatcher, { DispatchItem } from "./Dispatcher";
import { Types } from "./TypeGaurd";
import Inventory from "./Inventory";
import Manager from "./Manager";
import Middleware from "./Middleware";
import Module from "./Module";
export interface Features {
    persist?: boolean;
    log?: (item: DispatchItem) => void;
    check?: (item: DispatchItem) => boolean;
    process?: (item: DispatchItem) => DispatchItem;
    callback?: (item: DispatchItem) => void;
}
export interface StoreItem {
    key: string;
    state: any;
    type?: Types;
    features: Features
}
export default class Store {

    //Managers
    private stateManager: Manager<any>;
    private typeManager: Manager<Types>;
    private featureManager: Manager<Features>;
    private moduleManager: Manager<Module>;

    //Dispatcher
    private dispatcher: Dispatcher;

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
    new = ({ key, state, type, features }: StoreItem) => {
        const middleware = new Middleware({ key: key });
        if (middleware.doesTypePass(state, type)) {
            this.stateManager.add(key, state);
            this.typeManager.add(key, type);
            this.featureManager.add(key, features);
        } else {
            console.error(`TrebleGSM: Initial State "${key}" must be of type "${type}".`);
        }
    }
    get = (key: string) => {
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
            return undefined
        }
    }
    set = (key: string, state: any) => {
        if (this.stateManager.has(key)) {
            const middleware = new Middleware({
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
    onDispatch = (callbackfn: (item: DispatchItem) => void) => {
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


