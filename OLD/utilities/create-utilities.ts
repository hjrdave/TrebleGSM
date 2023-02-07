/*
    Utiltites Object that is outputed by useTreble
*/

import { createActionHelpers, getActions, getStateKeys, getCurrentStoreData, createActionReducerHelpers } from './methods';
import { TrebleGSM } from '../interfaces';

const createUtilities = (store: TrebleGSM.StoreItem[], modules: TrebleGSM.ModuleData[]) => {

    const returnedActionArray = getActions(store);
    const returnedStateKeys = getStateKeys(store);
    const returnedStoreData = getCurrentStoreData(store);
    const actionHelpers = { ...createActionHelpers(store) };
    const reducerActionHelpers = { ...createActionReducerHelpers(modules) };



    const utiltiesObject: TrebleGSM.Utilities = {
        actions: actionHelpers,
        stateKeys: returnedActionArray,
        actionKeys: returnedStateKeys,
        reducerActions: reducerActionHelpers,
        storeData: returnedStoreData,
        moduleData: modules
    }

    return utiltiesObject
}

export default createUtilities;