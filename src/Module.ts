import Parcel from "./Parcel";
import Features, { FeatureOnCallback, FeatureOnLoad, FeatureOnRun, FeatureOnTypeCheck } from "./Features";
import { SetState, TKeys } from "./Store";

export interface ModuleProps<IState, TFeatures extends Features<IState, TFeatures>> {
    name: TKeys<IState>,
    onTypeCheck?: FeatureOnTypeCheck<IState, TFeatures>;
    onLoad?: FeatureOnLoad<IState, TFeatures>;
    onRun?: FeatureOnRun<IState, TFeatures>;
    onCallback?: FeatureOnCallback<IState, TFeatures>;
}

export default class Module<IState, TFeatures extends Features<IState, TFeatures>> {

    private name: TKeys<IState>;
    private featureOnTypeCheck?: FeatureOnTypeCheck<IState, TFeatures>;
    private featureOnLoad?: FeatureOnLoad<IState, TFeatures>;
    private featureOnRun?: FeatureOnRun<IState, TFeatures>;
    private featureOnCallback?: FeatureOnCallback<IState, TFeatures>;

    getName = () => {
        return this.name;
    }
    onTypeCheck = (parcel: Parcel<IState, TFeatures>) => {
        return this.featureOnTypeCheck?.(parcel) ?? true;
    }
    onLoad = (parcel: Parcel<IState, TFeatures>, setState: SetState<IState>) => {
        this.featureOnLoad?.(parcel, setState);
    }
    onRun = (parcel: Parcel<IState, TFeatures>) => {
        this.featureOnRun?.(parcel);
    }
    onCallback = (parcel: Parcel<IState, TFeatures>, setState: SetState<IState>) => {
        this.featureOnCallback?.(parcel, setState);
    }
    public constructor(props: ModuleProps<IState, TFeatures>) {
        this.name = props.name;
        this.featureOnTypeCheck = props.onTypeCheck;
        this.featureOnLoad = props.onLoad;
        this.featureOnRun = props.onRun;
        this.featureOnCallback = props.onCallback;
    }
};


