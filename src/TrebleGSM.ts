import { default as IStoreInstance } from "./Store";
import { Types as TTypes } from "./TypeGuard";
import { ParcelProps as IParcelProps } from "./Parcel";
import { ModuleProps as IModuleProps } from "./Module";
import { StoreItemProps as IStoreItemProps } from "./Store";
import { default as IFeatures, FeatureOnCallback, FeatureOnRun, FeatureOnLoad } from "./Features";
import { SetState as ISetState } from "./Store";
namespace TrebleGSM {

    export function Store<TKey = string>() {
        return new IStoreInstance<TKey>();
    }
    export type StoreInstance<TKey = string> = IStoreInstance<TKey>;
    export interface Features<TState = any, TKey = string> extends IFeatures<TState, TKey> { };
    export interface StoreItemProps<TState = any, TKey = string> extends IStoreItemProps<TState, TKey> { };
    export interface ParcelProps<TState = any, TKey = string> extends IParcelProps<TState, TKey> { };
    export interface ModuleProps<TState = any, TKey = string> extends IModuleProps<TState, TKey> { };
    export type OnLoad<TState = any, TKey = string> = FeatureOnLoad<TState, TKey>;
    export type OnRun<TState = any, TKey = string> = FeatureOnRun<TState, TKey>;
    export type OnCallback<TState = any, TKey = string> = FeatureOnCallback<TState, TKey>;
    export type StateTypes = TTypes;
    export type SetState<TState = any, TKey = string> = ISetState<TState, TKey>;

}
export default TrebleGSM;