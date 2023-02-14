import TypeGuard from "./TypeGaurd";
import { FeatureOnCallback, FeatureOnCheck, FeatureOnLoad, FeatureOnRun } from "./Features";

export interface ModuleItem<TState = any> {
    name: string,
    extendStore?: any[],
    featureKeys?: string[],
    onLoad: FeatureOnLoad;
    onRun: FeatureOnRun;
    onCheck: FeatureOnCheck;
    onCallback: FeatureOnCallback;
    typeGaurds?: string[][],
    renderGaurd?: string[][]
}

export default class Module<TState = any> {

    private name?: string;
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
    getData = () => {
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

    public constructor(props: ModuleItem<TState>) {
        // this.name = props.name;
        // this.extendStore = props.extendStore;
        // this.featureKeys = props.featureKeys;
        // this.log = props.onlog;
        // this.check = props.check;
        // this.process = props.process;
        // this.typeGuard = props.typeGaurds;
        // this.renderGaurd = props.renderGaurd;
    }
};


