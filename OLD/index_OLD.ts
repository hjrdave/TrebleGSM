import { default as IStoreInstance } from "../src/TrebleGSM";
import { Types as TTypes } from "../src/TypeGuard";
import { IDispatchItem } from "../src/DispatchItem";
import { StoreItem as IStoreItem } from "../src/Store";
import { default as IFeatures, FeatureOnRun } from "../src/Features";
namespace TrebleGSM {

    export function Store<TKey = string>() {
        return new IStoreInstance<TKey>();
    }
    export type StoreInstance<TKey = string> = IStoreInstance<TKey>;
    export interface StoreItem<TState = any, TKey = string> extends IStoreItem<TState, TKey> { };
    export interface DispatchItem<TState = any, TKey = string> extends IDispatchItem<TState, TKey> { };
    export interface Features<TState = any, TKey = string> extends IFeatures<TState, TKey> { };
    export type OnRun<TState = any, TKey = string> = FeatureOnRun<TState, TKey>;
    export type StateTypes = TTypes;

}
export default TrebleGSM;