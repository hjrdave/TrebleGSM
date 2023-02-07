/*
    Treble Hook
    Gives child components that call it access to store.
*/

import { useContext } from "react";
import defaultContext from "../context";
import { TrebleGSM } from "../interfaces";
import { ITrebleCore } from '../treble-core';


export interface State extends TrebleGSM.State { };
export interface Dispatchers extends TrebleGSM.Dispatchers, ITrebleCore.Dispatchers { };
export interface Actions { [key: string]: string }

function useTreble<S = State, D = Dispatchers, U = TrebleGSM.Utilities<{ [key: string]: string }, ITrebleCore.ReducerActions>>(context?: any) {
  try {
    if (context) {
      if (typeof context !== "object") {
        throw new TypeError("TrebleGSM: useTreble hook must only accept React.Context.");
      }
    }
    //assigns the default context or passed scoped context
    const trebleContext = context !== undefined ? context : defaultContext;

    //would like to figure out how to type trebleContext something other then 'any' without breaking everything
    const storeSubscription: [S, D, U] = useContext(
      trebleContext as any
    );

    //checks to make sure React is installed
    if (storeSubscription === null) {
      throw new Error('TrebleGSM: StoreSubscription is null. Dependency React might be missing.');
    }

    //returns an Array [StoreItems (Global state object), Dispatchers (dispatch methods to interact with Store), Utilities (helpers for subscribing) ]
    return storeSubscription;

  } catch (error) {
    throw new Error(error as any);
  }

};

export default useTreble;


