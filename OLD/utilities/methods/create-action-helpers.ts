/*
    Store Action Type helper.
    Can be used in typescript projects to aid in using actions with Store methods.
*/
import { TrebleGSM } from '../../interfaces';
const createActionHelpers = (store: TrebleGSM.StoreItem[]) => {

    let actions = {};
    store?.map((storeItem) => {
        actions = {
            ...actions,
            [storeItem.action]: storeItem.action
        }
    })
    return actions as typeof actions;

}

export default createActionHelpers;