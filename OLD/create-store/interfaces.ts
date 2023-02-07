/*
    interface for createStore and error-handling
*/
import { TrebleGSM } from '../interfaces';

export interface IErrorHandling {
  (
    storeData: TrebleGSM.StoreItem[],
    options?: TrebleGSM.StoreOptions
  ): void
}

