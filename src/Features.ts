import { DispatchItem } from "./Dispatcher";
import { StoreItem } from "./Store";

export type FeatureOnLoad<TState = any, TKey = string> = (item: StoreItem<TState, TKey>, setState: <TItem = any>(key: TKey, value: TItem) => void) => void;

export type FeatureOnLog<TState = any, TKey = string> = (item: DispatchItem<TState, TKey>) => void;

export type FeatureOnCheck<TState = any, TKey = string> = (item: DispatchItem<TState, TKey>) => boolean;

export type FeatureOnProcess<TState = any, TKey = string> = (item: DispatchItem<TState, TKey>) => DispatchItem<TState, TKey>;

export type FeatureOnCallback<TState = any, TKey = string> = (item: DispatchItem<TState, TKey>) => DispatchItem<TState, TKey>;

export default interface Features<TState = any, TKey = string> {
    onLoad?: FeatureOnLoad<TState, TKey>;
    onLog?: FeatureOnLog<TState, TKey>;
    onCheck?: FeatureOnCheck<TState, TKey>;
    onProcess?: FeatureOnProcess<TState, TKey>;
    onCallback?: FeatureOnCallback<TState, TKey>;
}