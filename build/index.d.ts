import { default as StoreInstance } from "./TrebleGSM";
import { Types as TTypes } from "./TypeGaurd";
import { DispatchItem as IDispatchItem } from "./Dispatcher";
import { Features as IFeatures, StoreItem as IStoreItem } from "./Store";
declare namespace TrebleGSM {
    function Store<TKey = string>(): StoreInstance<TKey>;
    interface StoreItem<TState = any, TKey = string> extends IStoreItem<TState, TKey> {
    }
    interface DispatchItem<TState = any, TKey = string> extends IDispatchItem<TState, TKey> {
    }
    interface Features<TState = any, TKey = string> extends IFeatures<TState, TKey> {
    }
    type StateTypes = TTypes;
}
export default TrebleGSM;
