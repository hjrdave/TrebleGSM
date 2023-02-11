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
        const dispatchItem = this.dispatchItem;
        const dispatchState = dispatchItem.dispatchState;
        const type = dispatchItem.type;
        const features = dispatchItem.features;
        const doesTypePass = this.doesTypePass(dispatchState, type);
        let pipelineItem: { doesPass: boolean, dispatchItem: DispatchItem<TState, TKey> } = { doesPass: true, dispatchItem: dispatchItem };
        //makes sure state is accepted type
        if (doesTypePass) {
            //Makes sure the dispatch state is not the current state
            const doesRenderPass = this.doesRenderPass(dispatchItem.currentState, dispatchItem.dispatchState, type);
            if (doesRenderPass) {
                const log = features?.log;
                //runs log middleware fn
                if (log) {
                    log(dispatchItem);
                }

                const didCheckPass = (features?.check) ? features.check(dispatchItem) : true;
                const process = features?.process;
                const callback = features?.callback;

                //runs check middleware fn
                if (didCheckPass) {
                    //runs process middleware fn
                    if (process) {
                        pipelineItem = {
                            doesPass: true,
                            dispatchItem: {
                                ...dispatchItem,
                                state: process(dispatchItem) as any
                            }
                        }
                    }
                    if (callback) {
                        callback(pipelineItem.dispatchItem)
                    }
                    return { ...pipelineItem, doesPass: true }
                } else {
                    return { ...pipelineItem, doesPass: false }
                }
            } else {
                return pipelineItem;
            }

        } else {
            console.error(`TrebleGSM: State "${dispatchItem.key}" must be of type "${dispatchItem.type}".`);
            return pipelineItem;
        }
    }

    public constructor(dispatchItem: DispatchItem<TState, TKey>) {
        this.dispatchItem = dispatchItem;
    }
};


