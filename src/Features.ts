import Parcel from "./Parcel";
import { SetState } from "./Store";

export type FeatureOnTypeCheck<TKeys = string, TStateType = any, TFeatures = Features<TKeys, TStateType>> = (parcel: Parcel<TKeys, TStateType, TFeatures>) => boolean;

export type FeatureOnLoad<TKeys = string, TStateType = any, TFeatures = Features<TKeys, TStateType>> = (parcel: Parcel<TKeys, TStateType, TFeatures>, setState: SetState<TKeys, TStateType>) => void;

export type FeatureOnRun<TKeys = string, TStateType = any, TFeatures = Features<TKeys, TStateType>> = (parcel: Parcel<TKeys, TStateType, TFeatures>) => void;

export type FeatureOnCallback<TKeys = string, TStateType = any, TFeatures = Features<TKeys, TStateType>> = (parcel: Parcel<TKeys, TStateType, TFeatures>, setState: SetState<TKeys, TStateType>) => void;

export default interface Features<TKeys = string, TStateType = any> {
    onTypeCheck?: FeatureOnTypeCheck<TKeys, TStateType>
    onLoad?: FeatureOnLoad<TKeys, TStateType>;
    onRun?: FeatureOnRun<TKeys, TStateType>;
    onCallback?: FeatureOnCallback<TKeys, TStateType>;
}