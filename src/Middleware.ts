import TypeGuard, { Types } from "./TypeGuard";
import Parcel from "./Parcel";
import RenderGuard from "./RenderGuard";
import { SetState } from "./Store";

export default class Middleware<TState = any, TKey = string>{

    private parcel: Parcel<TState, TKey>;
    private setStoreState: (key: TKey, value: any) => void;

    shouldThisRerender = () => {
        const parcel = this.parcel;
        return (RenderGuard.stateCanRender(parcel.getPrevState(), parcel.getNextState(), parcel.getType()));
    }

    onTypeCheck = () => {
        const parcel = this.parcel;
        if (!TypeGuard.isCorrectType(parcel.getNextState(), parcel.getType())) {
            return false;
        };
        return true;
    }

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
        features?.onRun?.(parcel);
        modules?.forEach((module) => {
            module.onRun(parcel);
        });
    }

    onCallback = () => {
        const parcel = this.parcel;
        const modules = this.parcel.getModules();
        const features = parcel.getFeatures();
        const setState = this.setStoreState;
        features?.onCallback?.(parcel, setState);
        modules?.forEach((module) => {
            module.onCallback(parcel, setState);
        });
    }

    public constructor(parcel: Parcel<TState, TKey>, setState: SetState<TState, TKey>) {
        this.parcel = parcel;
        this.setStoreState = setState;
    }
}


