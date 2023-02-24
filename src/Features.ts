import Parcel from "./Parcel";
import { SetState } from "./Store";

export type FeatureOnTypeCheck<TKeys, TState, TFeatures extends Features<TKeys, TState, TFeatures>> = (parcel: Parcel<TKeys, TState, TFeatures>) => boolean;

export type FeatureOnLoad<TKeys, TState, TFeatures extends Features<TKeys, TState, TFeatures>> = (parcel: Parcel<TKeys, TState, TFeatures>, setState: SetState<TKeys, TState>) => void;

export type FeatureOnRun<TKeys, TState, TFeatures extends Features<TKeys, TState, TFeatures>> = (parcel: Parcel<TKeys, TState, TFeatures>) => void;

export type FeatureOnCallback<TKeys, TState, TFeatures extends Features<TKeys, TState, TFeatures>> = (parcel: Parcel<TKeys, TState, TFeatures>, setState: SetState<TKeys, TState>) => void;

export default interface Features<TKeys, TState, TFeatures extends Features<TKeys, TState, TFeatures>> {
    onTypeCheck?: FeatureOnTypeCheck<TKeys, TState, TFeatures>
    onLoad?: FeatureOnLoad<TKeys, TState, TFeatures>;
    onRun?: FeatureOnRun<TKeys, TState, TFeatures>;
    onCallback?: FeatureOnCallback<TKeys, TState, TFeatures>;
}