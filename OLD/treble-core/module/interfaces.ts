import { TrebleGSM } from '../../interfaces';
import { reducerActionKeys } from './reducer-actions';

export declare namespace ITrebleCore {

    export interface Dispatchers {
        update: (action: string, dispatchValue: any, options?: TrebleGSM.DispatcherOptions) => void,
        reset: (action: string, options?: TrebleGSM.DispatcherOptions) => void,
        toggle: (action: string, dispatchValue?: any, options?: TrebleGSM.DispatcherOptions) => void,
        resetAll: (options?: TrebleGSM.DispatcherOptions) => void,
        run: (action: string, options?: TrebleGSM.DispatcherOptions) => void,
    }

    export type ReducerActions = typeof reducerActionKeys;
}