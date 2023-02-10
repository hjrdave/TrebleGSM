import { default as StoreInstance } from "./TrebleGSM";
import { Types as TTypes } from "./TypeGaurd";
import { DispatchItem as IDispatchItem } from "./Dispatcher";
import { ModuleItem as IModuleItem } from "./Module";
import { Features as IFeatures, StoreItem as IStoreItem } from "./Store";
declare namespace TrebleGSM {
    function Store(): StoreInstance<string>;
    interface StoreItem<TState = any> extends IStoreItem<TState> {
    }
    interface DispatchItem<TState = any> extends IDispatchItem<TState> {
    }
    interface ModuleItem<TState = any> extends IModuleItem<TState> {
    }
    interface Features<TState = any> extends IFeatures<TState> {
    }
    type StateTypes = TTypes;
}
export default TrebleGSM;
