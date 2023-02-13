import { Types } from "./TypeGaurd";
import { DispatchItem } from "./Dispatcher";
export default class Middleware<TState = any, TKey = string> {
    private dispatchItem;
    private setStoreState?;
    getDispatchItem: () => DispatchItem<TState, TKey>;
    getKey: () => TKey;
    getNextState: () => TState | undefined;
    doesTypePass: (state: any, type?: Types) => boolean;
    doesRenderPass: (state: any, state2: any, type?: Types) => boolean;
    runPipeline: () => any;
    constructor(dispatchItem: DispatchItem<TState, TKey>, setState?: (key: TKey, value: any) => void);
}
