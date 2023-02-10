import { DispatchItem } from "./Dispatcher";

export type FeatureOnLog<TState = any, TKey = string> = (item: DispatchItem<TState, TKey>) => void;

export type FeatureOnCheck<TState = any, TKey = string> = (item: DispatchItem<TState, TKey>) => boolean;

export type FeatureOnProcess<TState = any, TKey = string> = (item: DispatchItem<TState, TKey>) => DispatchItem<TState, TKey>;

export default interface Features<TState = any, TKey = string> {
    log?: FeatureOnLog<TState, TKey>;
    check?: FeatureOnCheck<TState, TKey>;
    process?: FeatureOnProcess<TState, TKey>;
}