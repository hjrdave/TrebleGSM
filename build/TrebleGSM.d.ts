import { StoreItem } from "./Store";
import { DispatchItem as IDispatchItem } from "./Dispatcher";
import Module, { IModule } from "./Module";
import { Types as TTypes } from './TypeGaurd';
declare namespace TrebleGSM {
    class Store {
        private store;
        getItems: () => {
            key: any;
            state: any;
            type: TTypes | undefined;
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
    interface DispatchItem extends IDispatchItem {
    }
    interface ModuleItem extends IModule {
    }
    type Types = TTypes;
}
export default TrebleGSM;
