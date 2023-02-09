import { default as StoreInstance } from "./TrebleGSM";
import { Types as TTypes } from "./TypeGaurd";
import { DispatchItem as IDispatchItem } from "./Dispatcher";
import { IModule } from "./Module";
declare namespace TrebleGSM {
    function Store(): StoreInstance;
    interface DispatchItem extends IDispatchItem {
    }
    interface ModuleItem extends IModule {
    }
    type Types = TTypes;
}
export default TrebleGSM;
