import { TrebleGSM } from '../../../interfaces';
import { trebleError } from '../../../globals';
import { reducerActionKeys } from '../reducer-actions';
interface IResetAll {
    (
        dispatch: (payload: TrebleGSM.DispatchPayload) => void,
        action: string,
        options?: {
            disableMiddleware?: boolean,
            sideEffectOnly: boolean
        }

    ): void
}

const resetAll: IResetAll = (dispatch) => {

    try {
        dispatch({
            type: 'runTrebleCoreMiddleware',
            ['runTrebleCoreMiddleware']: true,
            reducerAction: reducerActionKeys.resetAll,
            options: {
                disableMiddleware: true,
                allowPayloadListeners: true
            }
        })
    } catch (error) {
        console.error(`${trebleError} ${error}`);
    }
}

export default resetAll;