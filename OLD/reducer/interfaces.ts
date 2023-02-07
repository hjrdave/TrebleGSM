import {TrebleGSM} from '../interfaces';

export declare namespace Reducer{

  
export interface Build{
  (
    store: TrebleGSM.StoreItem[],
    modules: TrebleGSM.ModuleData[]
  ): TrebleReducer
}
export interface DispatchPipeline {
  (
    storeItem: {
      action: string;
      state: {
        [key: string]: any;
      };
    },
    state: any,
    action: TrebleGSM.DispatchPayload,
    store: any,
    modules: any
  ): { [key: string]: any };
}
export interface ReducerActions {
  [key: string]: any | undefined
}
export interface TrebleReducer {
  (
    state: {
      [key: string]: any,
      subscribeID: number
    },
    action: TrebleGSM.DispatchPayload
  ): {
    [key: string]: any
  }
}
}







