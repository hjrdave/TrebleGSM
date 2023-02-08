import { Types } from "./TypeGaurd";
import { DispatchItem } from "./Dispatcher";
export default class Middleware {
    private dispatchItem;
    getDispatchItem: () => DispatchItem;
    getKey: () => string;
    getState: () => any;
    doesTypePass: (state: any, type?: Types) => boolean;
    doesRenderPass: (state: any, state2: any, type?: Types) => boolean;
    runPipeline: () => {
        doesPass: boolean;
        dispatchItem: DispatchItem;
    } | {
        doesPass: boolean;
        dispatchItem: {
            processedState: DispatchItem;
            key: string;
            type?: Types | undefined;
            dispatchState?: any;
            currentState?: any;
            state?: any;
            features?: import("./Store").Features | undefined;
            modules?: [any, any][] | undefined;
        };
    };
    constructor(dispatchItem: DispatchItem);
}
