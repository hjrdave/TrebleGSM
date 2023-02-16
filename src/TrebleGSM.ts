/**
 * This is the new API for TrebleGSM V5
 * */
//import './TrebleGSM';
import { default as StoreManager, StoreItem } from "./Store";
import DispatchItem from "./DispatchItem";
//import Module, { ModuleItem } from "./Module";


export class TrebleGSM<TKey = string> {

    //Holds Store state, features, and CRUD methods
    private store: StoreManager<TKey>;

    //Returns a current snapshot of the Store
    getItems = () => {
        return this.store.getAll();
    }

    //Adds new item with initial state to Store
    addItem = <TState = any>(item: StoreItem<TState, TKey>) => {
        this.store.new(item);
    }

    //Set individual state by key
    setState = <TState = any>(key: TKey, value: TState | ((prevState: TState) => TState)) => {
        this.store.set<TState>(key, value);
    }

    //Get individual state by key
    getState = <TState = any>(key: TKey) => {
        return this.store.get(key)?.state as TState;
    }

    //Listens to state changes and then fires callback every time a state changes
    onDispatch = (callbackfn: (item: DispatchItem<any, TKey>) => void) => {
        this.store.onDispatch(callbackfn);
    }

    //Used by 3rd party libraries to create a new Module
    // static newModule = <TState = any>(moduleData: ModuleItem<TState>) => {
    //     const newModule = new Module(moduleData);
    //     return newModule;
    // }

    // //Allows Store to use external Module to extend itself
    // use = (module: Module) => {
    //     this.store.newModule(module);
    // }

    public constructor() {
        this.store = new StoreManager()
    }
};

export default TrebleGSM;

