import { default as IStoreInstance } from "./Store";
import { Types as TTypes } from "./TypeGuard";
import { ParcelProps } from "./Parcel";
import { StoreItem as IStoreItem } from "./Store";
import { default as IFeatures, FeatureOnRun } from "./Features";
namespace TrebleGSM {

    export function Store<TKey = string>() {
        return new IStoreInstance<TKey>();
    }
    export type StoreInstance<TKey = string> = IStoreInstance<TKey>;
    export interface StoreItem<TState = any, TKey = string> extends ParcelProps<TState, TKey> { };
    export interface DispatchItem<TState = any, TKey = string> extends ParcelProps<TState, TKey> { };
    export interface Features<TState = any, TKey = string> extends IFeatures<TState, TKey> { };
    export type OnRun<TState = any, TKey = string> = FeatureOnRun<TState, TKey>;
    export type StateTypes = TTypes;

}
export default TrebleGSM;