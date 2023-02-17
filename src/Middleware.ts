import TypeGuard, { Types } from "./TypeGuard";
import DispatchItem from "./DispatchItem";
import RenderGuard from "./RenderGuard";

export default class Middleware<TState = any, TKey = string>{

    private dispatchItem: DispatchItem<TState, TKey>;
    private setStoreState: (key: TKey, value: any) => void;


    shouldThisRerender = () => {
        const dispatchItem = this.dispatchItem;
        return RenderGuard.stateCanRender(dispatchItem.getPrevState(), dispatchItem.getNextState(), dispatchItem.getType()) ? true : false;
    }

    onTypeCheck = () => {
        const dispatchItem = this.dispatchItem;
        //should have type check module as well
        if (!TypeGuard.isCorrectType(dispatchItem.getNextState(), dispatchItem.getType())) {
            return false;
        };
        return true;
    }

    //runs onload middleware when state is initially added to store
    onload = () => {
        const dispatchItem = this.dispatchItem;
        const modules = this.dispatchItem.getModules();
        const features = dispatchItem.getFeatures();
        const setState = this.setStoreState;
        features?.onLoad?.(dispatchItem, setState);

        //This is what a module iteration should look like
        modules?.forEach((module) => {
            module.runOnLoad(dispatchItem as any, setState as any);
        });
    }

    onRun = () => {
        const dispatchItem = this.dispatchItem;
        const modules = this.dispatchItem.getModules();
        const features = dispatchItem.getFeatures();
        features?.onRun ? features.onRun(dispatchItem) : null;
        //This is what a module iteration should look like
        modules?.forEach((module) => {
            module.runOnRun(dispatchItem as any);
        });
    }

    onCallback = () => {
        const dispatchItem = this.dispatchItem;
        const modules = this.dispatchItem.getModules();
        const features = dispatchItem.getFeatures();
        const setState = this.setStoreState;
        features?.onCallback ? features.onCallback(dispatchItem, setState) : null;
        //This is what a module iteration should look like
        modules?.forEach((module) => {
            module.runOnCallback(dispatchItem as any, setState as any);
        });
    }

    public constructor(dispatchItem: DispatchItem<TState, TKey>, setState: (key: TKey, value: any) => void) {
        this.dispatchItem = dispatchItem;
        this.setStoreState = setState;
    }
}


