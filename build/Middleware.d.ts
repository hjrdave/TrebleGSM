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
    } | {
        doesPass: boolean;
        dispatchItem: {
            processedState: DispatchItem<TState, TKey>;
            key: TKey;
            type?: Types | undefined;
            dispatchState?: TState | undefined;
            currentState?: TState | undefined;
            state?: TState | undefined;
            features?: import("./Store").Features<TState, TKey> | undefined;
            modules?: [any, any][] | undefined;
        };
    };
    constructor(dispatchItem: DispatchItem<TState, TKey>);
}
