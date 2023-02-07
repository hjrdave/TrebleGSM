/*
  buildState
  Consumes the treble store and dynamically builds out the state tree based off of store.state.
*/

import { IBuildState } from "./interfaces";

const buildState: IBuildState = (store, modules) => {

  let state = {};

  //add state from store
  store.map((obj) => {
    state = {
      ...state,
      ...obj.state
    };
  });

  //add module extend state (if exists)
  modules.map((module) => {
    if (module.extendStore) {
      module.extendStore?.data?.map((item) => {
        state = {
          ...state,
          ...item.state
        }
      })
    }
  });

  const initialState = { ...state };

  return initialState;
};

export default buildState;
