/*
    Treble Provider Container
    Provider component that wraps around components that will consume global state.
*/

import React, { useMemo } from "react";
import Provider from "./provider";
import buildState from "./state";
import buildReducer from "./reducer";
import Context from "./context";
import { TrebleGSM } from "./interfaces";
import TrebleCore from './treble-core';
import { useTreble } from ".";

export interface ITreble {
  children: JSX.Element[] | JSX.Element;
  store: {
    data: TrebleGSM.StoreItem[],
    scope?: React.Context<never[]>,
    modules?: TrebleGSM.ModuleData[],
    options?: TrebleGSM.StoreOptions
  }
}

function Treble({ children, store }: ITreble) {

  //error handling
  try {
    if (typeof store !== "object") {
      throw new TypeError("TrebleGSM: Treble store prop must be an array.");
    }
  } catch (error) {
    throw error;
  }
  //Allows scoped Stores to inherit modules from main Store
  const trebleCoreData =
    (store?.scope) ?
      (store?.options?.inheritModules !== false) ?
        useTreble(Context)[0].trebleCoreData :
        { moduleData: [] } : { moduleData: [] };

  //main context modules
  const inheritedModules = (trebleCoreData?.moduleData) ? [...trebleCoreData.moduleData] : [];

  //current instance of store modules
  const storeModules = (store?.modules) ? [...store?.modules] : [];

  //modules' dependent modules
  const importedModules = () => {
    if (store?.modules) {
      let data: any[] = []
      store?.modules.map((module) => {
        if (module?.importModules) {
          data = [...data, ...module.importModules]
        }
      });
      return data;
    }
    return []
  }



  //makes sure modules are not duplicated (makes sure store modules takes precedence over inherited modules)
  const noDuplicateModules = (inheritedModules: any, storeModules: any) => {
    if (inheritedModules.length > 0) {
      const cleanedModules = inheritedModules?.filter((inheritedModule: any) => {
        storeModules?.map((storeModule: any) => {
          if (storeModule.name !== inheritedModule.name && storeModule.name !== 'treble-core') {
            return inheritedModule;
          }
        })
      })
      return [...cleanedModules, ...storeModules];
    }
    return storeModules
  };

  const
    //passed Store
    Store = useMemo(() => store.data, [store.data]),

    //store modules
    Modules = [TrebleCore, ...noDuplicateModules(importedModules(), noDuplicateModules(inheritedModules, storeModules))],

    //builds reducer from Store
    Reducer = buildReducer([...Store], Modules),

    //builds state from Store
    State = buildState([...Store], Modules),

    //the default context used by TrebleGSM (Should only be used for App global state)
    defaultContext = Context,

    //optional passed scoped context (substitutes default context. Used for scoped Treble Providers)
    scopedContext = store?.scope;

  return (
    <>
      {/**Treble Provider */}
      <Provider
        initialState={State}
        reducer={Reducer}
        store={Store}
        scope={scopedContext !== undefined ? scopedContext : defaultContext}
        modules={Modules}
      >
        <>
          {children}
        </>
      </Provider>
    </>
  );
}

export default Treble;
