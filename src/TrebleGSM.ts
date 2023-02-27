import { default as IStoreInstance } from "./Store";
import { Types as TTypes } from "./TypeGuard";
import { ParcelProps as IParcelProps } from "./Parcel";
import { ModuleProps as IModuleProps } from "./Module";
import { StoreItemProps as IStoreItemProps } from "./Store";
import Features, { default as IFeatures, FeatureOnCallback, FeatureOnRun, FeatureOnLoad } from "./Features";
import { SetState as ISetState } from "./Store";

type StateValues<IState> = {
    [K in keyof IState]: IState[K];
};
namespace TrebleGSM {

    export function Store<IState, TFeatures extends Features<IState, TFeatures>>() {
        return new IStoreInstance<IState, TFeatures>();
    }
    export type StoreInstance<IState, TFeatures extends Features<IState, TFeatures>> = IStoreInstance<IState, TFeatures>;
    export interface Features<IState, TFeatures extends Features<IState, TFeatures>> extends IFeatures<IState, TFeatures> { };
    export interface StoreItemProps<IState, TFeatures extends Features<IState, TFeatures>> extends IStoreItemProps<IState, TFeatures> { };
    export interface ParcelProps<IState, TFeatures extends Features<IState, TFeatures>> extends IParcelProps<IState, TFeatures> { };
    export interface ModuleProps<IState, TFeatures extends Features<IState, TFeatures>> extends IModuleProps<IState, TFeatures> { };
    export type OnLoad<IState, TFeatures extends Features<IState, TFeatures>> = FeatureOnLoad<IState, TFeatures>;
    export type OnRun<IState, TFeatures extends Features<IState, TFeatures>> = FeatureOnRun<IState, TFeatures>;
    export type OnCallback<IState, TFeatures extends Features<IState, TFeatures>> = FeatureOnCallback<IState, TFeatures>;
    export type StateTypes = TTypes;
    export type SetState<IState> = ISetState<IState>;

}
export default TrebleGSM;