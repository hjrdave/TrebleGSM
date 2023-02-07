import { TrebleGSM } from '../interfaces';

interface IProcessDispatchValue {
    (
        middlewareData: TrebleGSM.MiddlewareData
    ): any
}

const processDispatchValue: IProcessDispatchValue = (middlewareData) => {

    const { storeModules: modules } = middlewareData;
    const processMiddleware = middlewareData?.features?.process;
    let processedMiddlewareData = middlewareData;

    //Run module process middleware
    modules?.map((module) => {
        if(typeof module?.middleware?.process === 'function'){
        const processedDispatchValue = module.middleware.process(processedMiddlewareData);
        processedMiddlewareData = {
                ...processedMiddlewareData,
                dispatchValue: processedDispatchValue
            }
        }
    })

    //Run feature process middleware
    if(typeof processMiddleware === 'function'){
        return processMiddleware(processedMiddlewareData);
    }

    return processedMiddlewareData.dispatchValue;
}

export default processDispatchValue;