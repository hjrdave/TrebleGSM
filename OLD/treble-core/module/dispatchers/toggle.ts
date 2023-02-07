import { TrebleGSM } from '../../../interfaces';
import { trebleError } from '../../../globals';
import { reducerActionKeys } from '../reducer-actions';
interface IToggle {
    (
        dispatch: (payload: TrebleGSM.DispatchPayload) => void,
        action: string,
        options?: TrebleGSM.DispatcherOptions
    ): void
}
const toggle: IToggle = (dispatch, action, options) => {

    try {
        if (typeof action !== 'string') {
            throw TypeError('action prop must be a string');
        }

        dispatch({
            type: action,
            [action]: false,
            reducerAction: reducerActionKeys.toggle,
            options: {
                ...options,
                disableMiddleware: true
            }
        })

    } catch (error) {
        console.error(`${trebleError} ${error}`);
    }
}

export default toggle;