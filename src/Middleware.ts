import TypeGuard from "./TypeGuard";
import Parcel from "./Parcel";
import RenderGuard from "./RenderGuard";
import { SetState } from "./Store";

export default class Middleware<TState = any, TKey = string>{

    private parcel: Parcel<TState, TKey>;
    private setState: SetState<TState, TKey>;

    shouldParcelRerender = () => {
        const prevState = this.parcel.getPrevState();
        const nextState = this.parcel.getNextState();
        const type = this.parcel.getType();
        return (RenderGuard.stateCanRender(prevState, nextState, type));
    }

    onTypeCheck = () => {
        const nextState = this.parcel.getNextState();
        const type = this.parcel.getType();
        if (!TypeGuard.isCorrectType(nextState, type)) {
            return false;
        };
        return true;
    }

    onload = () => {
        const parcel = this.parcel;
        const modules = this.parcel.getModules();
        const features = parcel.getFeatures();
        const setState = this.setState;
        modules?.forEach((module) => {
            module?.onLoad?.(parcel, setState);
        });
        features?.onLoad?.(parcel, setState);
    }

    onRun = () => {
        const parcel = this.parcel;
        const modules = this.parcel.getModules();
        const features = parcel.getFeatures();
        modules?.forEach((module) => {
            module?.onRun?.(parcel);
        });
        features?.onRun?.(parcel);
    }

    onCallback = () => {
        const parcel = this.parcel;
        const modules = this.parcel.getModules();
        const features = parcel.getFeatures();
        const setState = this.setState;
        modules?.forEach((module) => {
            module?.onCallback?.(parcel, setState);
        });
        features?.onCallback?.(parcel, setState);
    }

    public constructor(parcel: Parcel<TState, TKey>, setState: SetState<TState, TKey>) {
        this.parcel = parcel;
        this.setState = setState;
    }
}


