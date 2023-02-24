import Parcel from "./Parcel";
import Features, { FeatureOnCallback, FeatureOnLoad, FeatureOnRun, FeatureOnTypeCheck } from "./Features";
import { SetState } from "./Store";

export interface ModuleProps<TKeys, TStates, TFeatures extends Features<TKeys, TStates, TFeatures>> {
    name: TKeys,
    onTypeCheck?: FeatureOnTypeCheck<TKeys, TStates, TFeatures>;
    onLoad?: FeatureOnLoad<TKeys, TStates, TFeatures>;
    onRun?: FeatureOnRun<TKeys, TStates, TFeatures>;
    onCallback?: FeatureOnCallback<TKeys, TStates, TFeatures>;
}

export default class Module<TKeys, TStates, TFeatures extends Features<TKeys, TStates, TFeatures>> {

    private name: TKeys;
    private featureOnTypeCheck?: FeatureOnTypeCheck<TKeys, TStates, TFeatures>;
    private featureOnLoad?: FeatureOnLoad<TKeys, TStates, TFeatures>;
    private featureOnRun?: FeatureOnRun<TKeys, TStates, TFeatures>;
    private featureOnCallback?: FeatureOnCallback<TKeys, TStates, TFeatures>;

    getName = () => {
        return this.name;
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
    public constructor(props: ModuleProps<TKeys, TStates, TFeatures>) {
        this.name = props.name;
        this.featureOnTypeCheck = props.onTypeCheck;
        this.featureOnLoad = props.onLoad;
        this.featureOnRun = props.onRun;
        this.featureOnCallback = props.onCallback;
    }
};


