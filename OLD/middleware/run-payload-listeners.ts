/*
    Payload Listener
    - This is a middleware side effect assessible by modules only and
    runs despite disableMiddleware flag being set to true. Only returns payload
*/

import { TrebleGSM } from "../interfaces";

const runPayloadListeners = (payload: TrebleGSM.DispatchPayload, modules: TrebleGSM.ModuleData[]) => {

    setTimeout(() => {
        if (payload.dispatchValue !== null) {
            //run module side effects
            modules?.map((module) => {
                const payLoadListener = module.middleware?.payloadListener
                if (payLoadListener) {
                    payLoadListener(payload);
                }
            })

        }
    }, 0);
}

export default runPayloadListeners;
