import { TrebleGSM } from '../../../interfaces';
import { trebleError } from '../../../globals';
import { reducerActionKeys } from '../reducer-actions';
interface IRun {
    (
        dispatch: (payload: TrebleGSM.DispatchPayload) => void,
        action: string
    ): void
}

const run: IRun = (dispatch, action) => {

    try {
        if (typeof action !== 'string') {
            throw TypeError('action prop must be a string');
        }
        dispatch({
            type: action,
            [action]: false,
            reducerAction: reducerActionKeys.run,
            options: {
                disableMiddleware: false,
                renderGuard: false
            }
        })
    } catch (error) {
        console.error(`${trebleError} ${error}`);
    }
}

export default run;