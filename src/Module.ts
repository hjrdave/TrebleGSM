import TypeGuard from "./TypeGuard";
import DispatchItem from "./DispatchItem";
import { FeatureOnCallback, FeatureOnLoad, FeatureOnRun, FeatureOnTypeCheck } from "./Features";

export interface ModuleItem<TState = any, TKey = string, TFeatureKeys = []> {
    name: string,
    featureKeys?: TFeatureKeys,
    onTypeCheck?: FeatureOnTypeCheck<TState, TKey>;
    onLoad?: FeatureOnLoad<TState, TKey>;
    onRun?: FeatureOnRun<TState, TKey>;
    onCallback?: FeatureOnCallback<TState, TKey>;
}

export default class Module<TState = any, TKey = string, TFeatureKeys = []> {

    private name?: string;
    private featureKeys?: TFeatureKeys;
    private onTypeCheck?: FeatureOnTypeCheck<TState, TKey>;
    private onLoad?: FeatureOnLoad<TState, TKey>;
    private onRun?: FeatureOnRun<TState, TKey>;
    private onCallback?: FeatureOnCallback<TState, TKey>;

    getName = () => {
        return this.name;
    }
    getFeatureKeys = () => {
        return this.featureKeys;
    }
    runTypeCheck = (dispatchItem: DispatchItem<TState, TKey>) => {
        return this.onTypeCheck?.(dispatchItem) ?? true;
    }
    runOnLoad = (dispatchItem: DispatchItem<TState, TKey>, setState: (key: TKey, value: any) => void) => {
        this.onLoad?.(dispatchItem, setState);
    }
    runOnRun = (dispatchItem: DispatchItem<TState, TKey>) => {
        this.onRun?.(dispatchItem);
    }
    runOnCallback = (dispatchItem: DispatchItem<TState, TKey>, setState: (key: TKey, value: any) => void) => {
        this.onCallback?.(dispatchItem, setState);
    }
    public constructor(props: ModuleItem<TState, TKey, TFeatureKeys>) {
        this.name = props.name;
        this.featureKeys = props.featureKeys;
        this.onTypeCheck = props.onTypeCheck;
        this.onLoad = props.onLoad;
        this.onRun = props.onRun;
        this.onCallback = props.onCallback;
    }
};


