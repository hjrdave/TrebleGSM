import { default as StoreInstance } from "./TrebleGSM";
import { Types as TTypes } from "./TypeGaurd";
import { DispatchItem as IDispatchItem } from "./Dispatcher";
import { StoreItem as IStoreItem } from "./Store";
import { default as IFeatures, FeatureOnCheck, FeatureOnLog, FeatureOnProcess } from "./Features";
namespace TrebleGSM {

    export function Store<TKey = string>() {
        return new StoreInstance<TKey>();
    }

    export interface StoreItem<TState = any, TKey = string> extends IStoreItem<TState, TKey> { };
    export interface DispatchItem<TState = any, TKey = string> extends IDispatchItem<TState, TKey> { };
    export interface Features<TState = any, TKey = string> extends IFeatures<TState, TKey> { };
    export type OnCheck<TState = any, TKey = string> = FeatureOnCheck<TState, TKey>;
    export type OnLog<TState = any, TKey = string> = FeatureOnLog<TState, TKey>;
    export type OnProcess<TState = any, TKey = string> = FeatureOnProcess<TState, TKey>;
    export type StateTypes = TTypes;

}

export default TrebleGSM;