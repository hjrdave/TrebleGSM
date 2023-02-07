/*
    Store Action Type helper.
    Can be used in typescript projects to aid in using actions with Store methods.
*/
import { TrebleGSM } from '../../interfaces';
const createActionReducerHelpers = (modules: TrebleGSM.ModuleData[]) => {

    let reducerActions = {};

    modules?.map((module) => {
        const reducerActionKeys = (module.reducerActions) ? Object.keys(module.reducerActions) : [];
        reducerActionKeys?.map((key) => {
            reducerActions = {
                ...reducerActions,
                [key]: key
            }
        })
    });

    return reducerActions as typeof reducerActions;

}

export default createActionReducerHelpers;