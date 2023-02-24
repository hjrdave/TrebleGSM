/**
 * Middleware Class
 * This class handles all State manager middleware
 */
import TypeGuard from "./TypeGuard";
import Parcel from "./Parcel";
import Manager from "./Manager";
import Module from "./Module";
import RenderGuard from "./RenderGuard";
import Features from "./Features";
import { SetState } from "./Store";

export default class Middleware<TStates = any, TKeys = string, TFeatures = Features<TStates, TKeys>>{

    private parcel: Parcel<TStates, TKeys, TFeatures>;
    private modules: Manager<Module<TStates, TKeys, TFeatures>, TKeys>;
    private setState: SetState<TStates, TKeys>;

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
        const modules = this.modules;
        const features = parcel.getFeatures();
        const setState = this.setState;
        modules?.forEach((module) => {
            module?.onLoad?.(parcel, setState);
        });
        features?.onLoad?.(parcel, setState);
    }

    onRun = () => {
        const parcel = this.parcel;
        const modules = this.modules;
        const features = parcel.getFeatures();
        modules?.forEach((module) => {
            module?.onRun?.(parcel);
        });
        features?.onRun?.(parcel);
    }

    onCallback = () => {
        const parcel = this.parcel;
        const modules = this.modules;
        const features = parcel.getFeatures();
        const setState = this.setState;
        modules?.forEach((module) => {
            module?.onCallback?.(parcel, setState);
        });
        features?.onCallback?.(parcel, setState);
    }

    public constructor(parcel: Parcel<TStates, TKeys, TFeatures>, setState: SetState<TStates, TKeys>, modules: Manager<Module<TStates, TKeys, TFeatures>, TKeys>) {
        this.parcel = parcel;
        this.modules = modules;
        this.setState = setState;
    }
}


