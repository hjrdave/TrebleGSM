import { StoreItem } from "./Store";
import { DispatchItem } from "./Dispatcher";
import Module, { IModule } from "./Module";
export default class TrebleGSM {
    private store;
    getItems: () => {
        key: any;
        state: any;
        type: import("./TypeGaurd").Types | undefined;
        features: import("./Store").Features | undefined;
    }[];
    addItem: (item: StoreItem) => void;
    setState: <T = any>(key: string, value: T) => void;
    getState: <T = any>(key: string) => T;
    onDispatch: (callbackfn: (item: DispatchItem) => void) => void;
    static newModule: (moduleData: IModule) => Module;
    use: (module: Module) => void;
    constructor();
}
