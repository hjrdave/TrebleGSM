import TypeGuard from "./TypeGaurd";
import { DispatchItem } from "./Dispatcher";

export interface IModule {
    name: string,
    extendStore?: any[],
    featureKeys?: string[],
    log?: (item: DispatchItem) => void;
    check?: (item: DispatchItem) => boolean;
    process?: (item: DispatchItem) => DispatchItem;
    callback?: (item: DispatchItem) => void;
    typeGaurds?: string[][],
    renderGaurd?: string[][]
}

export default class Module {

    private name: string;
    private extendStore?: any[];
    private featureKeys?: string[];
    private log?: any;
    private check?: any;
    private process?: any;
    private typeGuard?: any;
    private renderGaurd?: string[][];

    getName = () => {
        return this.name;
    }
    getData: () => IModule = () => {
        return {
            name: this.name,
            extendStore: this.extendStore,
            featureKeys: this.featureKeys,
            log: this.log,
            check: this.check,
            process: this.process,
            typeGuard: this.typeGuard,
            renderGuard: this.renderGaurd
        }
    }

    public constructor(props: IModule) {
        this.name = props.name;
        this.extendStore = props.extendStore;
        this.featureKeys = props.featureKeys;
        this.log = props.log;
        this.check = props.check;
        this.process = props.process;
        this.typeGuard = props.typeGaurds;
        this.renderGaurd = props.renderGaurd;
    }
};


