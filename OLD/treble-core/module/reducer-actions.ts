/*
    Treble Core Reducer Actions
*/
import { TrebleGSM } from '../../interfaces';

const NS = 'TREBLE_CORE_';

export const reducerActionKeys = {
    update: `${NS}update`,
    toggle: `${NS}toggle`,
    run: `${NS}run`,
    reset: `${NS}reset`,
    resetAll: `${NS}resetAll`
}

//simple dispatcher that returns dispatch value
export const updateState = (data: TrebleGSM.MiddlewareData) => data.dispatchValue;

//resets specified state to initial value
export const resetToInitialState = (data: TrebleGSM.MiddlewareData) => data.initialState;

//resets entire store to initial values
export const resetAllToInitialState = (data: TrebleGSM.MiddlewareData) => {
    data.storeItems.map((item) => {
        data.dispatchers?.reset(item.action);
    });
}

//toggles state from true to false
export const toggleState = (data: TrebleGSM.MiddlewareData) => {
    const { currentState } = data;
    return (currentState) ? false : true;
}

//runs a store side effect (no state is set)
export const runSideEffect = () => null