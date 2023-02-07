/*
    Create Dispatchers
    - Creates dispatchers for SubscribeAPI
*/
import { TrebleGSM } from '../interfaces';
import { trebleError } from '../globals';

interface ICreateDispatchers {
    (
        dispatch: any,
        modules: TrebleGSM.ModuleData[]
    ): any
}

const createDispatchers: ICreateDispatchers = (dispatch, modules) => {

    try {
        if (dispatch === undefined) {
            throw Error('Dispatch is undefined. React or TrebleGSM might not be installed.')
        }
    } catch (error) {
        console.error(`${trebleError} ${error}`);
    }

    //dispatcher methods
    let dispatcherMethods: { [key: string]: any } = {

        // pure dispatch method that can be use for extending the SubsribeAPI Dispatchers
        dispatch: (payload: TrebleGSM.DispatchPayload) => dispatch(payload)

    };

    //add module suscribe methods
    modules?.map((module) => {
        const moduleMethods = module?.dispatchers;
        const namespaceString = module?.namespace;
        const namespaceDispatchers = module?.namespaceDispatchers;

        if (moduleMethods !== undefined) {
            const methodArray = Object.entries(moduleMethods);
            methodArray?.map((method) => {
                //will abbreviate dispatcher methods if namepsaceDispatcher prop is set to true (for collision resolution)
                const dispatcherKey = (namespaceDispatchers) ? `${namespaceString}_${method[0]}` : method[0];
                dispatcherMethods = {
                    ...dispatcherMethods,
                    [dispatcherKey]: (...params: any) => method[1](dispatch, ...params)
                }
            })

        }
    });

    return dispatcherMethods
}

export default createDispatchers;