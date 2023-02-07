import {TrebleGSM} from '../interfaces';

export interface IWithTreble {
  (Component: React.ComponentClass | React.FunctionComponent | any,
    options?: {
      store?:
      {
        data: TrebleGSM.StoreItem[],
        scope?: React.Context<never[]>
      }
    }): any
}