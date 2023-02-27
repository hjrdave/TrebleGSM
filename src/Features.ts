import Parcel from "./Parcel";
import { SetState } from "./Store";
import { TKeys, TStates } from "./Store";

export type FeatureOnTypeCheck<IState, TFeatures extends Features<IState, TFeatures>> = (parcel: Parcel<IState, TFeatures>) => boolean;

export type FeatureOnLoad<IState, TFeatures extends Features<IState, TFeatures>> = (parcel: Parcel<IState, TFeatures>, setState: SetState<IState>) => void;

export type FeatureOnRun<IState, TFeatures extends Features<IState, TFeatures>> = (parcel: Parcel<IState, TFeatures>) => void;

export type FeatureOnCallback<IState, TFeatures extends Features<IState, TFeatures>> = (parcel: Parcel<IState, TFeatures>, setState: SetState<IState>) => void;

export default interface Features<IState, TFeatures extends Features<IState, TFeatures>> {
    onTypeCheck?: FeatureOnTypeCheck<IState, TFeatures>
    onLoad?: FeatureOnLoad<IState, TFeatures>;
    onRun?: FeatureOnRun<IState, TFeatures>;
    onCallback?: FeatureOnCallback<IState, TFeatures>;
}