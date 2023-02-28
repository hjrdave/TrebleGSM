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
import { SetState, TKeys } from "./Store";

export default class Middleware<IState, TFeatures extends Features<IState, TFeatures>>{

    private parcel: Parcel<IState, TFeatures>;
    private features?: TFeatures;
    private modules?: Manager<TKeys<IState>, Module<IState, TFeatures>>;
    private setState: SetState<IState>;

    private runModules = (type: 'onLoad' | 'onRun' | 'onCallback') => {
        this.modules?.forEach((module) => {
            (type === 'onRun') ?
                module?.[type]?.(this.parcel) :
                module?.[type]?.(this.parcel, this.setState);
        })
    }
    private runFeatures = (type: 'onLoad' | 'onRun' | 'onCallback') => {
        (type === 'onRun') ?
            this.features?.[type]?.(this.parcel) :
            this.features?.[type]?.(this.parcel, this.setState);
    }

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
        this.runModules('onLoad');
        this.runFeatures('onLoad');
    }

    onRun = () => {
        this.runModules('onRun');
        this.runFeatures('onRun');
    }

    onCallback = () => {
        this.runModules('onCallback');
        this.runFeatures('onCallback');
    }

    public constructor(parcel: Parcel<IState, TFeatures>, setState: SetState<IState>, modules: Manager<TKeys<IState>, Module<IState, TFeatures>>) {
        this.parcel = parcel;
        this.modules = modules;
        this.features = parcel.getFeatures();
        this.setState = setState;
    }
}


