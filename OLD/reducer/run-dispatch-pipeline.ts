/*
    Dispatch Pipeline
    - This is the reducer dispatch value pipeline. 
    - It puts a dispatch value through middleware modules before being sent to reducer action
*/

import { runMiddleware, createMiddlewareData, runReducerActions, runPayloadListeners } from "../middleware";
import { Reducer } from './interfaces';

const runDispatchPipeline: Reducer.DispatchPipeline = (storeItem, state, payload, store, modules) => {
  const stateName = Object.keys(storeItem.state)[0];
  const dispatchValue = payload[storeItem.action];
  const disableMiddleware = payload.options?.disableMiddleware;
  const allowPayloadListeners = payload.options?.allowPayloadListeners;

  //create middleware data object
  const middlewareData = createMiddlewareData(dispatchValue, payload, storeItem, state, store, modules);

  //runs payload listeners (used for dispatchers that have middleware disabled)

  if (allowPayloadListeners) {
    runPayloadListeners(payload, modules);
  }

  if (payload?.reducerAction !== undefined) {
    //run middleware if not disabled
    if (!(disableMiddleware)) {

      const middlewareValue = runMiddleware(middlewareData);

      //makes sure dispatchValue passes check middleware
      if (middlewareValue !== null) {
        return {
          ...state,
          [stateName]: middlewareValue,
        };
      }
      return { ...state };
    }
  }

  //runs reducer actions only
  const reducerActionValue = (payload?.reducerAction !== undefined) ? runReducerActions(middlewareData) : dispatchValue;

  //if middleware is disabled dispatchValue middleware pipeline will be bypassed
  return {
    ...state,
    [stateName]: reducerActionValue
  };
};

export default runDispatchPipeline;
