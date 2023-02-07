/*
    Render Guard
    - middleware for running shallow comparisons on dispatch values
*/
import { TrebleGSM } from '../../../../interfaces';
import shallowCompare from './shallow-compare';

const renderGuard = (data: TrebleGSM.MiddlewareData) => {
    const { dispatchValue, currentState, dispatchPayload } = data;

    //makes sure renderGuard is not disabled by dispatcher
    if (dispatchPayload.options?.renderGuard !== false) {
        //primitive check
        if (dispatchValue !== currentState) {

            //determines if dispatch value is an object type
            const isObject = (dispatchValue && typeof dispatchValue === 'object' && currentState && typeof currentState === 'object');

            if (isObject) {

                //checks arrays
                if (Array.isArray(dispatchValue)) {

                    //makes sure consecutive empty array dispatch values do not trigger rerenders
                    if (dispatchValue.length === 0 && currentState.length === 0) {
                        return false
                    }
                    return true
                }

                //does a shallow check on objects
                if (!shallowCompare(dispatchValue, currentState)) {
                    return false
                };
                return true
            }
            return true;
        }
        return false;
    }

    return true

}

export default renderGuard;