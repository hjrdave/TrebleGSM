import Parcel from "./Parcel";
import Features, { FeatureOnCallback, FeatureOnLoad, FeatureOnRun, FeatureOnTypeCheck } from "./Features";

export interface ModuleProps<TStates = any, TKeys = string, TFeatures = Features<TStates, TKeys>, TFeatureKeys = string[]> {
    name: TKeys,
    featureKeys?: TFeatureKeys,
    onTypeCheck?: FeatureOnTypeCheck<TStates, TKeys, TFeatures>;
    onLoad?: FeatureOnLoad<TStates, TKeys, TFeatures>;
    onRun?: FeatureOnRun<TStates, TKeys, TFeatures>;
    onCallback?: FeatureOnCallback<TStates, TKeys, TFeatures>;
}

export default class Module<TStates = any, TKeys = string, TFeatures = Features<TStates, TKeys>, TFeatureKeys = []> {

    private name: TKeys;
    private featureKeys?: TFeatureKeys;
    private featureOnTypeCheck?: FeatureOnTypeCheck<TStates, TKeys, TFeatures>;
    private featureOnLoad?: FeatureOnLoad<TStates, TKeys, TFeatures>;
    private featureOnRun?: FeatureOnRun<TStates, TKeys, TFeatures>;
    private featureOnCallback?: FeatureOnCallback<TStates, TKeys, TFeatures>;

    getName = () => {
        return this.name;
    }
    getFeatureKeys = () => {
        return this.featureKeys;
    }
    onTypeCheck = (parcel: Parcel<TStates, TKeys, TFeatures>) => {
        return this.featureOnTypeCheck?.(parcel) ?? true;
    }
    onLoad = (parcel: Parcel<TStates, TKeys, TFeatures>, setState: (key: TKeys, value: any) => void) => {
        this.featureOnLoad?.(parcel, setState);
    }
    onRun = (parcel: Parcel<TStates, TKeys, TFeatures>) => {
        this.featureOnRun?.(parcel);
    }
    onCallback = (parcel: Parcel<TStates, TKeys, TFeatures>, setState: (key: TKeys, value: any) => void) => {
        this.featureOnCallback?.(parcel, setState);
    }
    public constructor(props: ModuleProps<TStates, TKeys, TFeatures, TFeatureKeys>) {
        this.name = props.name;
        this.featureKeys = props.featureKeys;
        this.featureOnTypeCheck = props.onTypeCheck;
        this.featureOnLoad = props.onLoad;
        this.featureOnRun = props.onRun;
        this.featureOnCallback = props.onCallback;
    }
};


