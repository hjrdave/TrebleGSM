/*
    Check Dispatch Value
    - Runs dispatch value agianst a specified criteria 
    and returns true if the dispatch value meets that criteria or false if it doesnt
*/
import {TrebleGSM} from '../interfaces';

interface ICheckDispatchValue {
    (
        middlewareData: TrebleGSM.MiddlewareData
    ): boolean
}

const checkDispatchValue: ICheckDispatchValue = (middlewareData) => {

    const {dispatchValue, storeModules: modules, features} = middlewareData;
    const checkMiddleware = features?.check;

    if(dispatchValue !== null){

        //run module checks
        const modulePassRateArray = modules.filter((module) => {
            const moduleCheckMiddleware = module?.middleware?.check;
            if(typeof moduleCheckMiddleware === 'function'){
                return moduleCheckMiddleware
            }
        }).map((module) => {
            const moduleCheckMiddleware = module?.middleware?.check;
            if(typeof moduleCheckMiddleware === 'function'){
                return moduleCheckMiddleware(middlewareData);
            }
        });

        const doModuleMiddlewarePass = (modulePassRateArray.includes(!(false)) || modulePassRateArray.length === 0) ? true : false;

        //if a module check fails return false
        if(!doModuleMiddlewarePass){
            return false;
        }

        //run store feature check
        if (typeof checkMiddleware === 'function') {
            const doesFeatureCheckPass = checkMiddleware(middlewareData);
            if(doesFeatureCheckPass === true){
                return true
            }
            return false
        }

        return true
    }

    return true;
}

export default checkDispatchValue;