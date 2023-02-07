/*
    Returns an array of action strings.
*/

import {TrebleGSM} from '../../interfaces';
interface IGetActions{
    (
        store: TrebleGSM.StoreItem[]
    ): string[]
}

const getActions: IGetActions = (store) => {
    const actionArray = store?.map((storeItem: {action: string}) => {
        return storeItem.action
    });
   return actionArray;
   
}

export default getActions;