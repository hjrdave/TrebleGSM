import { default as StoreInstance } from "./TrebleGSM";
import { Types as TTypes } from "./TypeGaurd";
import { DispatchItem as IDispatchItem } from "./Dispatcher";
import { Features as IFeatures, StoreItem as IStoreItem } from "./Store";
namespace TrebleGSM {

    export function Store<TKey = string>() {
        return new StoreInstance<TKey>();
    }
    export interface StoreItem<TState = any, TKey = string> extends IStoreItem<TState, TKey> { };
    export interface DispatchItem<TState = any, TKey = string> extends IDispatchItem<TState, TKey> { };
    export interface Features<TState = any, TKey = string> extends IFeatures<TState, TKey> { };
    export type StateTypes = TTypes;

}

export default TrebleGSM;