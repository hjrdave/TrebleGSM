import Parcel from "./Parcel";

export type FeatureOnTypeCheck<TState = any, TKey = string> = (parcel: Parcel<TState, TKey>) => boolean;

export type FeatureOnLoad<TState = any, TKey = string> = (parcel: Parcel<TState, TKey>, setState: <TItem = any>(key: TKey, value: TItem) => void) => void;

export type FeatureOnRun<TState = any, TKey = string> = (parcel: Parcel<TState, TKey>) => void;

export type FeatureOnCallback<TState = any, TKey = string> = (parcel: Parcel<TState, TKey>, setState: <TItem = any>(key: TKey, value: TItem) => void) => void;

export default interface Features<TState = any, TKey = string> {
    onTypeCheck?: FeatureOnTypeCheck<TState, TKey>
    onLoad?: FeatureOnLoad<TState, TKey>;
    onRun?: FeatureOnRun<TState, TKey>;
    onCallback?: FeatureOnCallback<TState, TKey>;
}

//example of using an interface as a generic
// function printPerson<T extends Person>(person: T): string {
//     return `${person.name} is ${person.age} years old`;
// }