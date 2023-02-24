import { default as IStoreInstance } from "./Store";
import { Types as TTypes } from "./TypeGuard";
import { ParcelProps as IParcelProps } from "./Parcel";
import { ModuleProps as IModuleProps } from "./Module";
import { StoreItemProps as IStoreItemProps } from "./Store";
import Features, { default as IFeatures, FeatureOnCallback, FeatureOnRun, FeatureOnLoad } from "./Features";
import { SetState as ISetState } from "./Store";
namespace TrebleGSM {

    export function Store<TKeys, TStates, TFeatures>() {
        return new IStoreInstance<TKeys, TStates, TFeatures>();
    }
    export type StoreInstance<TKeys, TStates, TFeatures> = IStoreInstance<TKeys, TStates, TFeatures>;
    export interface Features<TKeys, TStates, TFeatures> extends IFeatures<TKeys, TStates, TFeatures> { };
    export interface StoreItemProps<TKeys, TStates, TFeatures> extends IStoreItemProps<TKeys, TStates, TFeatures> { };
    export interface ParcelProps<TKeys, TStates, TFeatures> extends IParcelProps<TKeys, TStates, TFeatures> { };
    export interface ModuleProps<TKeys, TStates, TFeatures> extends IModuleProps<TKeys, TStates, TFeatures> { };
    export type OnLoad<TKeys, TStates, TFeatures> = FeatureOnLoad<TKeys, TStates, TFeatures>;
    export type OnRun<TKeys, TStates, TFeatures> = FeatureOnRun<TKeys, TStates, TFeatures>;
    export type OnCallback<TKeys, TStates, TFeatures> = FeatureOnCallback<TKeys, TStates, TFeatures>;
    export type StateTypes = TTypes;
    export type SetState<TKeys, TStates> = ISetState<TKeys, TStates>;

}
export default TrebleGSM;