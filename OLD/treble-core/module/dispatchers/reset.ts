import { TrebleGSM } from '../../../interfaces';
import { trebleError } from '../../../globals';
import { reducerActionKeys } from '../reducer-actions';
interface IReset {
    (
        dispatch: (payload: TrebleGSM.DispatchPayload) => void,
        action: string,
        options?: {
            disableMiddleware?: boolean
        }

    ): void
}

const reset: IReset = (dispatch, action, options) => {

    try {
        if (typeof action !== 'string') {
            throw TypeError('action prop must be a string');
        }
        dispatch({
            type: action,
            [action]: null,
            reducerAction: reducerActionKeys.reset,
            options: {
                disableMiddleware: true,
                allowPayloadListeners: true,
                ...options
            }
        })
    } catch (error) {
        console.error(`${trebleError} ${error}`);
    }
}

export default reset;