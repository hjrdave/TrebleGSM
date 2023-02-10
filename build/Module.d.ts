import { DispatchItem } from "./Dispatcher";
export interface ModuleItem<TState = any> {
    name: string;
    extendStore?: any[];
    featureKeys?: string[];
    log?: (item: DispatchItem<TState>) => void;
    check?: (item: DispatchItem<TState>) => boolean;
    process?: (item: DispatchItem<TState>) => DispatchItem<TState>;
    callback?: (item: DispatchItem<TState>) => void;
    typeGaurds?: string[][];
    renderGaurd?: string[][];
}
export default class Module<TState = any> {
    private name;
    private extendStore?;
    private featureKeys?;
    private log?;
    private check?;
    private process?;
    private typeGuard?;
    private renderGaurd?;
    getName: () => string;
    getData: () => ModuleItem<TState>;
    constructor(props: ModuleItem<TState>);
}
