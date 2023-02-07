/**
 * This is the new API for TrebleGSM V5
 * */
//import './TrebleGSM';
import Store, { StoreItem } from "./Store";
import { DispatchItem } from "./Dispatcher";
import Module, { IModule } from "./Module";

export default class TrebleGSM {

    //Holds Store state, features, and CRUD methods
    private store: Store;

    //Returns a current snapshot of the Store
    getItems = () => {
        return this.store.getItems();
    }

    //Adds new item with initial state to Store
    addItem = (item: StoreItem) => {
        this.store.new(item);
    }

    //Set individual state by key
    setState = <T = any>(key: string, value: T) => {
        this.store.set(key, value);
    }

    //Get individual state by key
    getState = <T = any>(key: string) => {
        return this.store.get(key)?.state as T;
    }

    //Listens to state changes and then fires callback everytime a state changes
    onDispatch = (callbackfn: (item: DispatchItem) => void) => {
        this.store.onDispatch(callbackfn);
    }

    //Used by 3rd party libraies to create a new Module
    static newModule = (moduleData: IModule) => {
        const newModule = new Module(moduleData);
        return newModule;
    }

    //Allows Store to use external Module to extend itself
    use = (module: Module) => {
        this.store.newModule(module);
    }

    public constructor() {
        this.store = new Store()
    }
};


