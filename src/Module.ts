import TypeGuard from "./TypeGuard";
import DispatchItem from "./DispatchItem";
import { FeatureOnCallback, FeatureOnLoad, FeatureOnRun, FeatureOnTypeCheck } from "./Features";

export interface ModuleItem<TState = any, TKey = string, TFeatureKeys = []> {
    name: TKey,
    featureKeys?: TFeatureKeys,
    onTypeCheck?: FeatureOnTypeCheck<TState, TKey>;
    onLoad?: FeatureOnLoad<TState, TKey>;
    onRun?: FeatureOnRun<TState, TKey>;
    onCallback?: FeatureOnCallback<TState, TKey>;
}

export default class Module<TState = any, TKey = string, TFeatureKeys = []> {

    private name: TKey;
    private featureKeys?: TFeatureKeys;
    private featureOnTypeCheck?: FeatureOnTypeCheck<TState, TKey>;
    private featureOnLoad?: FeatureOnLoad<TState, TKey>;
    private featureOnRun?: FeatureOnRun<TState, TKey>;
    private featureOnCallback?: FeatureOnCallback<TState, TKey>;

    getName = () => {
        return this.name;
    }
    getFeatureKeys = () => {
        return this.featureKeys;
    }
    onTypeCheck = (dispatchItem: DispatchItem<TState, TKey>) => {
        return this.featureOnTypeCheck?.(dispatchItem) ?? true;
    }
    onLoad = (dispatchItem: DispatchItem<TState, TKey>, setState: (key: TKey, value: any) => void) => {
        this.featureOnLoad?.(dispatchItem, setState);
    }
    onRun = (dispatchItem: DispatchItem<TState, TKey>) => {
        this.featureOnRun?.(dispatchItem);
    }
    onCallback = (dispatchItem: DispatchItem<TState, TKey>, setState: (key: TKey, value: any) => void) => {
        this.featureOnCallback?.(dispatchItem, setState);
    }
    public constructor(props: ModuleItem<TState, TKey, TFeatureKeys>) {
        this.name = props.name;
        this.featureKeys = props.featureKeys;
        this.featureOnTypeCheck = props.onTypeCheck;
        this.featureOnLoad = props.onLoad;
        this.featureOnRun = props.onRun;
        this.featureOnCallback = props.onCallback;
    }
};


