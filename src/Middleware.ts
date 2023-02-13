import TypeGuard, { Types } from "./TypeGaurd";
import DispatchItem from "./DispatchItem";
import RenderGuard from "./RenderGaurd";

export default class Middleware<TState = any, TKey = string>{

    private dispatchItem: DispatchItem<TState, TKey>;
    private setStoreState: (key: TKey, value: any) => void;

    getDispatchItem = () => {
        return this.dispatchItem;
    }

    getKey = () => {
        return this.dispatchItem.getKey();
    }

    getNextState = () => {
        return this.dispatchItem.getNextState();
    }

    static doesTypePass = (state: any, type?: Types) => {
        return TypeGuard.isCorrectType(state, type)
    }

    doesRenderPass = (state: any, state2: any, type?: Types) => {
        return RenderGuard.stateCanRender(state, state2, type);
    }

    //runs middleware pipeline
    run = () => {

        const dispatchItem = this.dispatchItem;
        const type = dispatchItem.getType();
        const dispatchedState = dispatchItem.getDispatchedState();
        const currentState = dispatchItem.getCurrentState();
        const isReady = dispatchItem.getIsReadyStatus();
        const features = dispatchItem.getFeatures();
        const setState = this.setStoreState;

        //runs onLoad if this is initial state load
        if (!isReady) {
            features?.onLoad?.(dispatchItem, setState);
            dispatchItem.setIsReadyStatus(true);
        }

        //makes sure type passes
        if (!Middleware.doesTypePass(dispatchedState, type)) {
            dispatchItem.fail('WrongType');
            return
        };
        //makes sure render passes
        if (!this.doesRenderPass(currentState, dispatchedState, type)) {
            dispatchItem.fail('StateDidNotChange');
            return
        }
        //run side effect
        features?.onRun?.(dispatchItem);

        //sees if dispatch passes middleware onCheck
        if (!features?.onCheck || features.onCheck(dispatchItem)) {

            //processes state if onProcess exists
            features?.onProcess ? dispatchItem.setNextState(features.onProcess(dispatchItem)) : null;

            dispatchItem.success();
            return
        }

        dispatchItem.success();
        return
    };

    public constructor(dispatchItem: DispatchItem<TState, TKey>, setState: (key: TKey, value: any) => void) {
        this.dispatchItem = dispatchItem;
        this.setStoreState = setState;
    }
}


