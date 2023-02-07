/*
    Runs Middleware 
    Note: Middleware functions run before state gets to Reducer.
*/
import checkDispatchValue from './check-dispatch-value';
import runSideEffect from './run-side-effect';
import processDispatchValue from './process-dispatch-value';
import runReducerActions from './run-reducer-actions';
import { TrebleGSM } from '../interfaces';
import createMiddlewareData from './create-middleware-data';

export interface IRunMiddleware {
  (
    middlewareData: TrebleGSM.MiddlewareData
  ): any
}

const runMiddleware: IRunMiddleware = (middlewareData) => {



  //checks state agianst criteria then returns boolean
  const doesDispatchValuePass = checkDispatchValue(middlewareData);

  //runs a non-blocking function as soon as a value is dispatched to Store (failed checks will not cause it to fail)
  runSideEffect(middlewareData, 'log');

  //Makes sure state passes check and then will continue middleware pipeline and then return a value
  if (doesDispatchValuePass) {

    //runs a non-blocking function
    runSideEffect(middlewareData, 'run');

    //run module reducer actions
    const dispatchValue = runReducerActions(middlewareData);

    middlewareData = {
      ...middlewareData,
      dispatchValue: dispatchValue
    }

    //passes dispatchValue through module and feature process middleware
    const processedDispatchValue = processDispatchValue(middlewareData);

    //updates middleware data if data is processed
    if (processDispatchValue !== dispatchValue) {
      middlewareData = {
        ...middlewareData,
        dispatchValue: processedDispatchValue
      }
    }

    //runs callback if it exists with processedValue
    runSideEffect(middlewareData, 'callback');

    return middlewareData.dispatchValue;
  }

  return null
}

export default runMiddleware;