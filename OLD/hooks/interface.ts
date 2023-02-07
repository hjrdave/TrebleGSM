import { TrebleGSM } from '../interfaces';



export declare namespace Hooks {

  export interface UseTreble {
    (
      context?: any
    ): [{ [key: string]: any }, TrebleGSM.Dispatchers, TrebleGSM.Utilities]
  }

}