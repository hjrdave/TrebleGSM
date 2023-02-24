import Parcel from "./Parcel";
import { SetState } from "./Store";

export type FeatureOnTypeCheck<TState = any, TKey = string, TFeatures = Features<TState, TKey>> = (parcel: Parcel<TState, TKey, TFeatures>) => boolean;

export type FeatureOnLoad<TState = any, TKey = string, TFeatures = Features<TState, TKey>> = (parcel: Parcel<TState, TKey, TFeatures>, setState: SetState<TState, TKey>) => void;

export type FeatureOnRun<TState = any, TKey = string, TFeatures = Features<TState, TKey>> = (parcel: Parcel<TState, TKey, TFeatures>) => void;

export type FeatureOnCallback<TState = any, TKey = string, TFeatures = Features<TState, TKey>> = (parcel: Parcel<TState, TKey, TFeatures>, setState: SetState<TState, TKey>) => void;

export default interface Features<TState = any, TKey = string> {
    onTypeCheck?: FeatureOnTypeCheck<TState, TKey>
    onLoad?: FeatureOnLoad<TState, TKey>;
    onRun?: FeatureOnRun<TState, TKey>;
    onCallback?: FeatureOnCallback<TState, TKey>;
}