import Parcel from "./Parcel";
import { SetState } from "./Store";

export type FeatureOnTypeCheck<TKeys, TStateType, TFeatures> = (parcel: Parcel<TKeys, TStateType, TFeatures>) => boolean;

export type FeatureOnLoad<TKeys, TStateType, TFeatures> = (parcel: Parcel<TKeys, TStateType, TFeatures>, setState: SetState<TKeys, TStateType>) => void;

export type FeatureOnRun<TKeys, TStateType, TFeatures> = (parcel: Parcel<TKeys, TStateType, TFeatures>) => void;

export type FeatureOnCallback<TKeys, TStateType, TFeatures> = (parcel: Parcel<TKeys, TStateType, TFeatures>, setState: SetState<TKeys, TStateType>) => void;

export default interface Features<TKeys, TStateType, TFeatures> {
    onTypeCheck?: FeatureOnTypeCheck<TKeys, TStateType, TFeatures>
    onLoad?: FeatureOnLoad<TKeys, TStateType, TFeatures>;
    onRun?: FeatureOnRun<TKeys, TStateType, TFeatures>;
    onCallback?: FeatureOnCallback<TKeys, TStateType, TFeatures>;
}