import TypeGuard, { Types } from "./TypeGuard";
import DispatchItem from "./DispatchItem";
import RenderGuard from "./RenderGuard";

export default class Middleware<TState = any, TKey = string>{

    private dispatchItem: DispatchItem<TState, TKey>;
    private setStoreState: (key: TKey, value: any) => void;

    isThisCorrectType = () => {
        const dispatchItem = this.dispatchItem;
        if (!TypeGuard.isCorrectType(dispatchItem.getNextState(), dispatchItem.getType())) {
            return false;
        };
        return true;
    }

    shouldThisRerender = () => {
        const dispatchItem = this.dispatchItem;
        return RenderGuard.stateCanRender(dispatchItem.getPrevState(), dispatchItem.getNextState(), dispatchItem.getType()) ? true : false;
    }

    //runs onload middleware when state is initially added to store
    onload = () => {
        const dispatchItem = this.dispatchItem;
        const features = dispatchItem.getFeatures();
        const setState = this.setStoreState;
        features?.onLoad?.(dispatchItem, setState);
    }

    // onCheck = () => {
    //     const dispatchItem = this.dispatchItem;
    //     const dispatchedState = dispatchItem.getDispatchedState();
    //     const prevState = dispatchItem.getPrevState();
    //     const features = dispatchItem.getFeatures();
    //     const onCheckItem = {
    //         key: dispatchItem.getKey(),
    //         prevState: prevState,
    //         dispatchedState: dispatchedState,
    //         features: features,
    //         modules: features
    //     };
    //     return (!features?.onCheck || features.onCheck(onCheckItem)) ? true : false
    // }

    onRun = () => {
        const dispatchItem = this.dispatchItem;
        const features = dispatchItem.getFeatures();
        features?.onRun ? features.onRun(dispatchItem) : null;
    }

    onCallback = () => {
        const dispatchItem = this.dispatchItem;
        const features = dispatchItem.getFeatures();
        const setState = this.setStoreState;
        features?.onCallback ? features.onCallback(dispatchItem, setState) : null;
    }

    public constructor(dispatchItem: DispatchItem<TState, TKey>, setState: (key: TKey, value: any) => void) {
        this.dispatchItem = dispatchItem;
        this.setStoreState = setState;
    }
}


