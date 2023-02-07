import {TrebleGSM} from '../interfaces';

export interface IBuildState {
  (
    store: TrebleGSM.StoreItem[],
    modules: TrebleGSM.ModuleData[]
  ): {
    [key: string]: any
  }
}