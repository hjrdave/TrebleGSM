import DispatchItem from "./DispatchItem";
import { StoreItem } from "./Store";

export type FeatureOnLoad<TState = any, TKey = string> = (item: DispatchItem<TState, TKey>, setState: <TItem = any>(key: TKey, value: TItem) => void) => void;
export type FeatureOnRun<TState = any, TKey = string> = (item: DispatchItem<TState, TKey>) => void;

export type FeatureOnCheck<TState = any, TKey = string> = (item: DispatchItem<TState, TKey>) => boolean;

export type FeatureOnProcess<TState = any, TKey = string> = (item: DispatchItem<TState, TKey>) => TState;

export type FeatureOnCallback<TState = any, TKey = string> = (item: DispatchItem<TState, TKey>) => DispatchItem<TState, TKey>;

export default interface Features<TState = any, TKey = string> {
    onLoad?: FeatureOnLoad<TState, TKey>;
    onRun?: FeatureOnRun<TState, TKey>;
    onCheck?: FeatureOnCheck<TState, TKey>;
    onProcess?: FeatureOnProcess<TState, TKey>;
    onCallback?: FeatureOnCallback<TState, TKey>;
}