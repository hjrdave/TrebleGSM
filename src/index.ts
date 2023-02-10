import { default as StoreInstance } from "./TrebleGSM";
import { Types as TTypes } from "./TypeGaurd";
import { DispatchItem as IDispatchItem } from "./Dispatcher";
import { ModuleItem as IModuleItem } from "./Module";
import { Features as IFeatures, StoreItem as IStoreItem } from "./Store";
namespace TrebleGSM {

    export function Store() {
        return new StoreInstance();
    }
    export interface StoreItem<TState = any> extends IStoreItem<TState> { };
    export interface DispatchItem<TState = any> extends IDispatchItem<TState> { };
    export interface ModuleItem<TState = any> extends IModuleItem<TState> { };
    export interface Features<TState = any> extends IFeatures<TState> { };
    export type StateTypes = TTypes;

}

export default TrebleGSM;