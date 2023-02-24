import Parcel from "./Parcel";
import Features, { FeatureOnCallback, FeatureOnLoad, FeatureOnRun, FeatureOnTypeCheck } from "./Features";
import { SetState } from "./Store";

export interface ModuleProps<TKeys = string, TStates = any, TFeatures = Features<TKeys, TStates>, TFeatureKeys = string[]> {
    name: TKeys,
    featureKeys?: TFeatureKeys,
    onTypeCheck?: FeatureOnTypeCheck<TKeys, TStates, TFeatures>;
    onLoad?: FeatureOnLoad<TKeys, TStates, TFeatures>;
    onRun?: FeatureOnRun<TKeys, TStates, TFeatures>;
    onCallback?: FeatureOnCallback<TKeys, TStates, TFeatures>;
}

export default class Module<TKeys = string, TStates = any, TFeatures = Features<TKeys, TStates>, TFeatureKeys = string[]> {

    private name: TKeys;
    private featureKeys?: TFeatureKeys;
    private featureOnTypeCheck?: FeatureOnTypeCheck<TKeys, TStates, TFeatures>;
    private featureOnLoad?: FeatureOnLoad<TKeys, TStates, TFeatures>;
    private featureOnRun?: FeatureOnRun<TKeys, TStates, TFeatures>;
    private featureOnCallback?: FeatureOnCallback<TKeys, TStates, TFeatures>;

    getName = () => {
        return this.name;
    }
    getFeatureKeys = () => {
        return this.featureKeys;
    }
    onTypeCheck = (parcel: Parcel<TKeys, TStates, TFeatures>) => {
        return this.featureOnTypeCheck?.(parcel) ?? true;
    }
    onLoad = (parcel: Parcel<TKeys, TStates, TFeatures>, setState: SetState<TKeys, TStates>) => {
        this.featureOnLoad?.(parcel, setState);
    }
    onRun = (parcel: Parcel<TKeys, TStates, TFeatures>) => {
        this.featureOnRun?.(parcel);
    }
    onCallback = (parcel: Parcel<TKeys, TStates, TFeatures>, setState: SetState<TKeys, TStates>) => {
        this.featureOnCallback?.(parcel, setState);
    }
    public constructor(props: ModuleProps<TKeys, TStates, TFeatures, TFeatureKeys>) {
        this.name = props.name;
        this.featureKeys = props.featureKeys;
        this.featureOnTypeCheck = props.onTypeCheck;
        this.featureOnLoad = props.onLoad;
        this.featureOnRun = props.onRun;
        this.featureOnCallback = props.onCallback;
    }
};


