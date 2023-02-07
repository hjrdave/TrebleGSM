/*
  buildReducer
  Consumes treble store and dynamically builds global state reducer.
*/

import { Reducer } from './interfaces';
import runDispatchPipeline from './run-dispatch-pipeline';
import { trebleError } from '../globals';

const buildReducer: Reducer.Build = (store, modules) => {

  const Reducer: Reducer.TrebleReducer = (state, payload) => {

    let reducerActions: Reducer.ReducerActions = {}

    //adds reducer actions from store
    store.map((storeItem) => {
      reducerActions = {
        ...reducerActions,
        [storeItem.action]: () => runDispatchPipeline(storeItem, state, payload, store, modules)
      }
    });

    //adds reducer actions from module.extendStore (if exists)
    modules.map((module) => {
      module.extendStore?.data.map((storeItem) => {
        reducerActions = {
          ...reducerActions,
          [storeItem.action]: () => runDispatchPipeline(storeItem, state, payload, store, modules)
        }
      })
    });

    //checks to makes sure action key exists and throws error if it doesnt
    try {
      return reducerActions[payload.type]();
    }
    catch (err) {
      throw Error(`${trebleError} Store action key "${payload.type}" does not exist`);
    }

  };

  return Reducer;
}
export default buildReducer;
