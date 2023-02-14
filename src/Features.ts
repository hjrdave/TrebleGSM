import DispatchItem from "./DispatchItem";

export type FeatureOnLoad<TState = any, TKey = string> = (item: DispatchItem<TState, TKey>, setState: <TItem = any>(key: TKey, value: TItem) => void) => void;

export type FeatureOnCheck<TState = any, TKey = string> = (item: {
    key: TKey,
    prevState?: TState,
    dispatchedState?: TState,
    features?: Features<TState, TKey>,
    modules?: any
}) => boolean;

export type FeatureOnRun<TState = any, TKey = string> = (item: DispatchItem<TState, TKey>) => void;

export type FeatureOnCallback<TState = any, TKey = string> = (item: DispatchItem<TState, TKey>) => void;

export default interface Features<TState = any, TKey = string> {
    onLoad?: FeatureOnLoad<TState, TKey>;
    onCheck?: FeatureOnCheck<TState, TKey>;
    onRun?: FeatureOnRun<TState, TKey>;
    onCallback?: FeatureOnCallback<TState, TKey>;
}