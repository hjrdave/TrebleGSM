import { TrebleGSM } from '../../../interfaces';
import { trebleError } from '../../../globals';
import { reducerActionKeys } from '../reducer-actions';
interface IUpdate {
    (
        dispatch: (payload: TrebleGSM.DispatchPayload) => void,
        action: string,
        dispatchValue: any,
        options?: {
            disableMiddleware?: boolean
        }
    ): void
}

const update: IUpdate = (dispatch, action, dispatchValue, options) => {

    try {

        if (typeof action !== 'string') {
            throw TypeError('action prop must be a string');
        }
        dispatch({
            type: action,
            [action]: dispatchValue,
            reducerAction: reducerActionKeys.update,
            options: {
                disableMiddleware: (options?.disableMiddleware) ? true : false
            }
        });

    } catch (error) {
        console.error(`${trebleError} ${error}`);
    }

}

export default update;