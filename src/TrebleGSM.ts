import { default as IStoreInstance } from "./Store";
import { Types as TTypes } from "./TypeGuard";
import { ParcelProps as IParcelProps } from "./Parcel";
import { ModuleProps as IModuleProps } from "./Module";
import { StoreItemProps as IStoreItemProps } from "./Store";
import Features, { default as IFeatures, FeatureOnCallback, FeatureOnRun, FeatureOnLoad } from "./Features";
import { SetState as ISetState } from "./Store";
namespace TrebleGSM {

    export function Store<TKeys = string, TStates = any, TFeatures = Features<TKeys, TStates>>() {
        return new IStoreInstance<TKeys, TStates, TFeatures>();
    }
    export type StoreInstance<TKeys = string, TStates = any, TFeatures = Features<TKeys, TStates>> = IStoreInstance<TKeys, TStates, TFeatures>;
    export interface Features<TKeys = string, TStates = any> extends IFeatures<TKeys, TStates> { };
    export interface StoreItemProps<TKeys = string, TStates = any, TFeatures = Features<TKeys, TStates>> extends IStoreItemProps<TKeys, TStates, TFeatures> { };
    export interface ParcelProps<TKeys = string, TStates = any, TFeatures = Features<TKeys, TStates>> extends IParcelProps<TKeys, TStates, TFeatures> { };
    export interface ModuleProps<TKeys = string, TStates = any, TFeatures = Features<TKeys, TStates>> extends IModuleProps<TKeys, TStates, TFeatures> { };
    export type OnLoad<TKeys = string, TStates = any, TFeatures = Features<TKeys, TStates>> = FeatureOnLoad<TKeys, TStates, TFeatures>;
    export type OnRun<TKeys = string, TStates = any, TFeatures = Features<TKeys, TStates>> = FeatureOnRun<TKeys, TStates, TFeatures>;
    export type OnCallback<TKeys = string, TStates = any, TFeatures = Features<TKeys, TStates>> = FeatureOnCallback<TKeys, TStates, TFeatures>;
    export type StateTypes = TTypes;
    export type SetState<TKeys = string, TStates = any> = ISetState<TKeys, TStates>;

}
export default TrebleGSM;