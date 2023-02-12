import TypeGuard, { Types } from "./TypeGaurd";
import { DispatchItem } from "./Dispatcher";
import RenderGuard from "./RenderGaurd";
export default class Middleware<TState = any, TKey = string>{

    private dispatchItem: DispatchItem<TState, TKey>;

    getDispatchItem = () => {
        return this.dispatchItem;
    }

    getKey = () => {
        return this.dispatchItem.key;
    }

    getState = () => {
        return this.dispatchItem.state;
    }

    doesTypePass = (state: any, type?: Types) => {
        return TypeGuard.isCorrectType(state, type)
    }

    doesRenderPass = (state: any, state2: any, type?: Types) => {
        return RenderGuard.stateCanRender(state, state2, type);
    }

    //runs middleware pipeline
    runPipeline = () => {
        const { dispatchState, type, features, currentState, key } = this.dispatchItem;
        const pipelineResult = { doesPass: true, dispatchedItem: this.dispatchItem };

        if (!this.doesTypePass(dispatchState, type)) {
            console.error(`TrebleGSM: State "${key}" must be of type "${type}".`);
            return pipelineResult;
        }

        if (!this.doesRenderPass(currentState, dispatchState, type)) {
            return pipelineResult;
        }

        features?.onLog?.(this.dispatchItem);

        if (!features?.onCheck || features.onCheck(this.dispatchItem)) {
            const newState = features?.onProcess
                ? { ...this.dispatchItem, state: features.onProcess(this.dispatchItem) as any }
                : this.dispatchItem;
            features?.onCallback?.(newState);
            return { doesPass: true, dispatchedItem: newState };
        } else {
            return pipelineResult;
        }
    };


    public constructor(dispatchItem: DispatchItem<TState, TKey>) {
        this.dispatchItem = dispatchItem;
    }
};


