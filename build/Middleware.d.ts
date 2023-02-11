import { Types } from "./TypeGaurd";
import { DispatchItem } from "./Dispatcher";
export default class Middleware<TState = any, TKey = string> {
    private dispatchItem;
    getDispatchItem: () => DispatchItem<TState, TKey>;
    getKey: () => TKey;
    getState: () => TState | undefined;
    doesTypePass: (state: any, type?: Types) => boolean;
    doesRenderPass: (state: any, state2: any, type?: Types) => boolean;
    runPipeline: () => {
        doesPass: boolean;
        dispatchItem: DispatchItem<TState, TKey>;
    };
    constructor(dispatchItem: DispatchItem<TState, TKey>);
}
