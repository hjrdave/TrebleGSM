import { DispatchItem } from "./Dispatcher";
export interface IModule {
    name: string;
    extendStore?: any[];
    featureKeys?: string[];
    log?: (item: DispatchItem) => void;
    check?: (item: DispatchItem) => boolean;
    process?: (item: DispatchItem) => DispatchItem;
    callback?: (item: DispatchItem) => void;
    typeGaurds?: string[][];
    renderGaurd?: string[][];
}
export default class Module {
    private name;
    private extendStore?;
    private featureKeys?;
    private log?;
    private check?;
    private process?;
    private typeGuard?;
    private renderGaurd?;
    getName: () => string;
    getData: () => IModule;
    constructor(props: IModule);
}
