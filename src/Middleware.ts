import TypeGuard, { Types } from "./TypeGuard";
import Parcel from "./Parcel";
import RenderGuard from "./RenderGuard";

export default class Middleware<TState = any, TKey = string>{

    private parcel: Parcel<TState, TKey>;
    private setStoreState: (key: TKey, value: any) => void;


    shouldThisRerender = () => {
        const parcel = this.parcel;
        return RenderGuard.stateCanRender(parcel.getPrevState(), parcel.getNextState(), parcel.getType()) ? true : false;
    }

    onTypeCheck = () => {
        const parcel = this.parcel;
        //should have type check module as well
        if (!TypeGuard.isCorrectType(parcel.getNextState(), parcel.getType())) {
            return false;
        };
        return true;
    }

    //runs onload middleware when state is initially added to store
    onload = () => {
        const parcel = this.parcel;
        const modules = this.parcel.getModules();
        const features = parcel.getFeatures();
        const setState = this.setStoreState;
        features?.onLoad?.(parcel, setState);
        modules?.forEach((module) => {
            module.onLoad(parcel, setState);
        });
    }

    onRun = () => {
        const parcel = this.parcel;
        const modules = this.parcel.getModules();
        const features = parcel.getFeatures();
        features?.onRun ? features.onRun(parcel) : null;
        modules?.forEach((module) => {
            module.onRun(parcel);
        });
    }

    onCallback = () => {
        const parcel = this.parcel;
        const modules = this.parcel.getModules();
        const features = parcel.getFeatures();
        const setState = this.setStoreState;
        features?.onCallback ? features.onCallback(parcel, setState) : null;
        modules?.forEach((module) => {
            module.onCallback(parcel, setState);
        });
    }

    public constructor(parcel: Parcel<TState, TKey>, setState: (key: TKey, value: any) => void) {
        this.parcel = parcel;
        this.setStoreState = setState;
    }
}


