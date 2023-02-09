import { default as StoreInstance } from "./TrebleGSM";
import { Types as TTypes } from "./TypeGaurd";
import { DispatchItem as IDispatchItem } from "./Dispatcher";
import { IModule } from "./Module";
namespace TrebleGSM {

    export function Store() {
        return new StoreInstance();
    }
    export interface DispatchItem extends IDispatchItem { };
    export interface ModuleItem extends IModule { };
    export type Types = TTypes;

}

export default TrebleGSM;