import { default as StoreInstance } from "./TrebleGSM";
import { Types as TTypes } from "./TypeGaurd";
import { DispatchItem as IDispatchItem } from "./Dispatcher";
import { StoreItem as IStoreItem } from "./Store";
import { default as IFeatures, FeatureOnCheck, FeatureOnLog, FeatureOnProcess } from "./Features";
declare namespace TrebleGSM {
    function Store<TKey = string>(): StoreInstance<TKey>;
    interface StoreItem<TState = any, TKey = string> extends IStoreItem<TState, TKey> {
    }
    interface DispatchItem<TState = any, TKey = string> extends IDispatchItem<TState, TKey> {
    }
    interface Features<TState = any, TKey = string> extends IFeatures<TState, TKey> {
    }
    type OnCheck<TState = any, TKey = string> = FeatureOnCheck<TState, TKey>;
    type OnLog<TState = any, TKey = string> = FeatureOnLog<TState, TKey>;
    type OnProcess<TState = any, TKey = string> = FeatureOnProcess<TState, TKey>;
    type StateTypes = TTypes;
}
export default TrebleGSM;
